import { Injectable, PipeTransform } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { DecimalPipe } from '@angular/common';
import {
  debounceTime,
  delay,
  switchMap,
  tap,
  distinctUntilChanged,
  take,
} from 'rxjs/operators';
import { customFormatCurrencyRevert } from 'src/app/shared/utils/custom-format-currency';
import { SortDirection } from '../directives/sortable.directive';

interface SearchResult<T = any> {
  products: T[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: string;
  sortDirection: SortDirection;
  startIndex: number;
  endIndex: number;
  totalRecords: number;
}

export function compare(v1: any, v2: any) {
  return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
}

function sort(products: any[], column: string, direction: string): any[] {
  if (direction === '') {
    return products;
  } else {
    return [...products].sort((a, b) => {
      let res: any;
      if (typeof a[column] === 'object' && a[column] !== null) {
        res = compare(
          a[column].text.toUpperCase(),
          b[column].text.toUpperCase()
        );
      } else {
        let newA =
          a[column] === null
            ? ''
            : customFormatCurrencyRevert(a[column].toUpperCase());
        let newB =
          b[column] === null
            ? ''
            : customFormatCurrencyRevert(b[column].toUpperCase());
        res = compare(newA, newB);
      }
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(
  product: any,
  term: string,
  pipe: PipeTransform,
  field: string | { fieldName: string } | (string | { fieldName: string })[]
) {
  let result = false;
  if (Array.isArray(field)) {
    result = field.some((f) => matches(product, term, pipe, f));
  } else {
    if (typeof field === 'object') {
      result = product[field.fieldName].text
        .toLowerCase()
        .includes(term.toLocaleLowerCase());
    } else {
      result = product[field].toLowerCase().includes(term.toLowerCase());
    }
  }
  return result;
}

@Injectable()
export class FullTableService {
  // tslint:disable-next-line: variable-name
  private _data: any[] = [];
  // tslint:disable-next-line: variable-name
  private _loading$ = new BehaviorSubject<boolean>(true);
  // tslint:disable-next-line: variable-name
  private _search$ = new Subject<void>();
  // tslint:disable-next-line: variable-name
  private _data$ = new BehaviorSubject<any[]>([]);
  // tslint:disable-next-line: variable-name
  private _total$ = new BehaviorSubject<number>(0);

  // tslint:disable-next-line: variable-name
  private _state: State = {
    page: 1,
    pageSize: 10,
    searchTerm: '',
    sortColumn: '',
    sortDirection: '',
    startIndex: 1,
    endIndex: 5,
    totalRecords: 0,
  };

  searchField:
    | string
    | { fieldName: string }
    | (string | { fieldName: string })[];

  constructor(private pipe: DecimalPipe) {}

  get data$() {
    return this._data$.asObservable().pipe(take(1));
  }
  get total$() {
    return this._total$.asObservable();
  }
  get loading$() {
    return this._loading$.asObservable();
  }
  get page() {
    return this._state.page;
  }
  get pageSize() {
    return this._state.pageSize;
  }
  get searchTerm() {
    return this._state.searchTerm;
  }
  get startIndex() {
    return this._state.startIndex;
  }
  get endIndex() {
    return this._state.endIndex;
  }
  get collectionSize() {
    return this._state.totalRecords;
  }

  get totalRecords() {
    return this._data ? this._data.length : 0;
  }

  // tslint:disable-next-line: adjacent-overload-signatures
  set loading(isLoading: boolean) {
    this._loading$.next(isLoading);
  }
  // tslint:disable-next-line: adjacent-overload-signatures
  set data(data: any[]) {
    this._data = data;
  }
  // tslint:disable-next-line: adjacent-overload-signatures
  set page(page: number) {
    this._set({ page });
  }
  // tslint:disable-next-line: adjacent-overload-signatures
  set pageSize(pageSize: number) {
    this._set({ pageSize });
  }
  // tslint:disable-next-line: adjacent-overload-signatures
  set searchTerm(searchTerm: string) {
    this._state.page = 1;
    this._set({ searchTerm });
  }

  // tslint:disable-next-line: adjacent-overload-signatures
  set startIndex(startIndex: number) {
    this._set({ startIndex });
  }
  // tslint:disable-next-line: adjacent-overload-signatures
  set endIndex(endIndex: number) {
    this._set({ endIndex });
  }
  // tslint:disable-next-line: adjacent-overload-signatures
  set totalRecords(totalRecords: number) {
    this._set({ totalRecords });
  }

  set sortColumn(sortColumn: string) {
    this._set({ sortColumn });
  }
  set sortDirection(sortDirection: SortDirection) {
    this._set({ sortDirection });
  }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this.triggerSearch();
  }

  triggerSearch() {
    this._search$
      .pipe(
        tap(() => this._loading$.next(true)),
        debounceTime(200),
        distinctUntilChanged(),
        switchMap(() => this._search().pipe(take(1))),
        delay(200),
        tap(() => this._loading$.next(false))
      )
      .subscribe((result) => {
        this._data$.next(result.products);
        this._total$.next(result.total);
      });

    this._search$.next();
  }

  private _search(): Observable<SearchResult> {
    const {
      sortColumn,
      sortDirection,
      pageSize,
      page,
      searchTerm,
    } = this._state;

    // 1. sort
    let products = sort(this._data, sortColumn, sortDirection);

    // 2. filter
    products = products.filter((country) =>
      matches(country, searchTerm, this.pipe, this.searchField)
    );
    const total = products.length;

    // 3. paginate
    this._state.totalRecords = products.length;
    this._state.startIndex = (page - 1) * this.pageSize;
    this._state.endIndex = (page - 1) * this.pageSize + this.pageSize;

    if (this._state.endIndex > this._state.totalRecords) {
      this._state.endIndex = this._state.totalRecords;
    }

    products = products.slice(
      (page - 1) * pageSize,
      (page - 1) * pageSize + pageSize
    );
    return of({ products, total });
  }
}
