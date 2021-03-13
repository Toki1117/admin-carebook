import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChildren,
  QueryList,
  ChangeDetectionStrategy,
  TemplateRef,
} from '@angular/core';
import {
  ITableColumn,
  ITableAction,
  ITableData,
  ITableEventData,
  ITableHeaderButton,
} from './full-table.interface';
import { FullTableService } from './full-table.service';
import { exportTableToCSV } from 'src/app/shared/utils/download-table-data';
import { NgbdSortableHeaderDirective, SortEvent } from '../directives/sortable.directive';

@Component({
  selector: 'app-full-table',
  templateUrl: 'full-table.component.html',
  styleUrls: ['full-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [FullTableService],
})
export class FullTableComponent implements OnInit {
  @Input() actions: ITableAction[];
  @Input() actionHeader: string = null;
  @Input() borderless = false;
  @Input() buttonClass: string;
  @Input() buttonIcon: string;
  @Input() buttonText: string;
  @Input() columns: ITableColumn[];
  @Input() downloadable = false;
  @Input() headerButtons: ITableHeaderButton[];
  @Input() headerTemplateRef: TemplateRef<any>;
  @Input() noShadow = false;
  @Input() pageSize: number;
  @Input() pagination = true;
  @Input() reverseHeader = false;
  @Input() searchField = 'name';
  @Input() showHeader = true;
  @Input() showRowLimit = false;
  @Input() showSearch = true;
  @Input() set syncData(sync: boolean) {
    if (sync) {
      this.service.triggerSearch();
    }
  }
  @Input() set data(tableData: ITableData<any>) {
    this.service.data = !!tableData ? tableData.data : [];
    this.service.loading = !!tableData ? tableData.loading : false;
    if (tableData && !tableData.loading) {
      this.service.triggerSearch();
    }
    this.downloadData = tableData;
  }
  @Input() tableStyle: { [klass: string]: any };
  @Output() rowClick = new EventEmitter<ITableEventData<any>>();
  @Output() actionCallback = new EventEmitter<any>();
  @Output() buttonCallback = new EventEmitter<any>();
  private downloadData: ITableData<any>;

  @ViewChildren(NgbdSortableHeaderDirective)
  headers: QueryList<NgbdSortableHeaderDirective>;
  headerIndexSet = new Set();

  constructor(public service: FullTableService) {}

  get conditionalField(): ITableColumn | undefined {
    const column = this.columns.filter((colu) =>
      colu.hasOwnProperty('fieldActionCondition')
    )[0];
    if (column) {
      return column;
    } else {
      return undefined;
    }
  }

  ngOnInit() {
    this.service.searchField = this.searchField;
    if (this.pageSize) {
      this.service.pageSize = this.pageSize;
    }
  }

  onHeaderButtonClick(type: string) {
    this.buttonCallback.emit({ type });
  }

  onRowTableClick(field: string, row: any) {
    const rowClick: ITableEventData<any> = {
      type: field,
      data: row,
    };

    this.rowClick.emit(rowClick);
  }

  onActionClick(action: ITableAction, data: any) {
    const actionData: ITableEventData<any> = {
      type: action.label,
      data,
    };

    this.actionCallback.emit(actionData);
  }

  onSort({ column, direction }: SortEvent, sortBy: string) {
    // resetting other headers
    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = !!sortBy ? sortBy : column;
    this.service.sortDirection = direction;
  }

  sortIcon(idx: any): string {
    if (!!this.headers) {
      this.headerIndexSet.add(idx);
      const headerIndexArray = Array.from(this.headerIndexSet.values());
      const indexArray = [...headerIndexArray];
      const sortableHeaderIndex = indexArray.indexOf(idx);
      const direction = this.headers.toArray()[sortableHeaderIndex].direction;
      return direction === 'asc'
        ? 'mdi mdi-chevron-up'
        : direction === 'desc'
        ? 'mdi mdi-chevron-down'
        : 'mdi mdi-minus';
    } else {
      return 'mdi mdi-minus';
    }
  }

  triggerDownload(): void {
    exportTableToCSV(this.columns, this.downloadData, 'download.csv');
  }
}
