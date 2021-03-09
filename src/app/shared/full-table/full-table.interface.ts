import { Observable } from 'rxjs';

export interface ITableColumn {
  header: string;
  field: string | ICustomField<any>;
  isUser?: boolean;
  notSortable?: boolean;
  hasIcon?: boolean;
  iconReverse?: boolean;
  isHighlighted?: boolean;
  entryStyle?: boolean;
  fieldActionCondition?: string;
  isEntryDropdown?: boolean;
  isBadge?: boolean;
  badgeClass?: string;
  clickable?: boolean;
  icon?: string;
  sortBy?: string;
  ngClass?: string | string[] | Set<string> | { [klass: string]: any };
  ngStyle?: { [klass: string]: any };
  ngStyleHeader?: { [klass: string]: any };
  isUrl?: boolean;
  isRoute?: boolean;
  isBold?: boolean;
  isRating?: boolean;
}

export interface ICustomField<T> {
  text: string;
  details: T;
}

export interface ITableAction {
  label: string;
  icon?: string;
  sidebarAction?: boolean;
  command?: (args, newData?) => Observable<any>;
  payloadCreator?: (data, newData?: any) => [any, any?];
}
export interface ITableEventData<T> {
  type: string;
  data?: T;
}

export interface ITableData<T> {
  data: T[];
  loading: boolean;
}

export interface ITableBadge {
  badgeClass: string;
  icon?: string;
}

export interface ITableHeaderButton {
  text: string;
  icon?: string;
  ngClass?: string | string[] | Set<string> | { [klass: string]: any };
}
