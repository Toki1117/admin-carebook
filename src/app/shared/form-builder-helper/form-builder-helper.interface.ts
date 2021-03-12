import { FormGroup, ValidatorFn } from '@angular/forms';
import { Select2Data } from 'ng-select2-component';
import { Observable } from 'rxjs';

export interface FormFieldCreatorModel {
  name: string;
  fieldAddOn?: FieldAddOnMeta;
  isSelect?: boolean;
  multiSelect?: boolean;
  class?: string;
  selectValues?: () => Observable<Select2Data>;
  validators?: ValidatorFn[];
  label: string;
  value?: string | number | number[] | boolean;
  isRadio?: boolean;
  radio1?: any;
  radio2?: any;
  isCheckbox?: boolean;
  isTextarea?: boolean;
  isNumber?: boolean;
  isToggle?: boolean;
  toggleOn?: string;
  toggleOff?: string;
  noMaxLimit?: boolean;
  isUpload?: boolean;
  min?: number;
  max?: number;
}

export interface FieldAddOnMeta {
  label: string;
  command: (data, obj?) => Observable<any>;
  payload: (form, data?) => [any, any?];
  open?: boolean;
  formValue?: {
    name: string;
    description: string;
  };
}

export interface FieldModify {
  field: string;
  modifier: (
    form: FormFieldCreatorModel[],
    change: any,
    formObject: FormGroup,
    data?
  ) => any;
  data?: any;
}
