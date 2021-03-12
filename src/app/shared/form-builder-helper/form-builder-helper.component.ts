import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  ChangeDetectorRef,
  OnDestroy,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  NgForm,
} from '@angular/forms';
import { BehaviorSubject, merge, Subject } from 'rxjs';
import { map, skip, switchMap, take, takeUntil } from 'rxjs/operators';
import {
  FieldModify,
  FormFieldCreatorModel,
} from './form-builder-helper.interface';
import { LoaderService } from 'src/app/core/services/loader.service';
import { formsFeedback } from 'src/app/shared/utils/feedback';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder-helper.component.html',
  styleUrls: ['./form-builder-helper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormBuilderHelperComponent implements OnInit, OnDestroy {
  @Input() formModel: FormFieldCreatorModel[] = [];
  @Input() buttonText = 'Save';
  @Input() set formModify(func: (obj, form) => any | void) {
    this.modifyFunction = func;
    this.modifyApplied = false;
  }
  @Input() fieldModifier: FieldModify[];
  @Input() fixedButton = true;
  @Input() triggerReset = true;
  @Output() onFormSubmit = new EventEmitter<NgForm>();
  @Output() onFormCancel = new EventEmitter();
  modifyFunction: (obj, form) => any | void;
  modifyApplied = false;

  ngUnsubscribe = new Subject();

  formObject: FormGroup;

  dropdownData$ = new BehaviorSubject({});
  dropdownData: any = {};
  constructor(
    private formBuilder: FormBuilder,
    private cdRef: ChangeDetectorRef,
    public loader: LoaderService
  ) {}

  ngOnInit(): void {
    let frmObj = this.createFormObject(this.formModel);

    this.formObject = this.formBuilder.group(frmObj);

    this.dropdownData = this.formModel.reduce((acc, curr) => {
      if (curr.isSelect && curr.selectValues) {
        const seleObs = curr.selectValues();
        seleObs.pipe(take(1)).subscribe((res) => {
          const drpdnData = this.dropdownData$.getValue();
          acc[curr.name] = res;
          this.dropdownData$.next({
            ...drpdnData,
            [curr.name]: res,
          });
        });
      }
      return acc;
    }, {});

    if (this.modifyFunction) {
      this.formObject.valueChanges
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((res) => {
          if (!this.modifyApplied) {
            this.modifyApplied = true;
            const patchValues = this.modifyFunction(this.formModel, res);
            if (patchValues) {
              this.formObject.patchValue(patchValues);
            }
          }
        });
    }

    if (this.fieldModifier) {
      const fieldChangeSubs = this.fieldModifier.map((field) => {
        const isEdit = this.formModel.find(
          (frmFld) => (frmFld.name = field.field)
        ).value;
        const skipIfEdit = !!isEdit ? 1 : 0;
        return this.formObject.controls[field.field].valueChanges.pipe(
          skip(skipIfEdit),
          map((change) => {
            const patchValues = field.modifier(
              this.formModel,
              change,
              this.formObject,
              field.data
            );
            if (patchValues) {
              this.formObject.patchValue(patchValues);
            }
          })
        );
      });
      merge(...fieldChangeSubs)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe();
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next(false);
    this.ngUnsubscribe.complete();
  }

  createFormObject(data: FormFieldCreatorModel[]) {
    return data.reduce(
      (acc, curr) => ({
        ...acc,
        [curr.name]: [curr.value, curr.validators],
      }),
      {}
    );
  }

  submitForm() {
    this.onFormSubmit.emit(this.formObject.value);
  }

  isRequired(fld): boolean {
    if (this.formObject.get(fld).validator) {
      const validator = this.formObject
        .get(fld)
        .validator({} as AbstractControl);
      if (validator && validator.required) {
        return true;
      } else {
        return false;
      }
    }
  }

  getFormFieldErrors(fld) {
    const formFieldObj = this.formObject.get(fld);

    if (formFieldObj && formFieldObj.errors) {
      return formFieldObj.touched;
    } else {
      return false;
    }
  }

  cancelForm() {
    if (this.triggerReset) {
      this.formObject.reset();
    }
    this.onFormCancel.emit();
  }

  onValueChange(event, field) {
    const currValue = this.formObject.get(field).value;
    if (event.value !== currValue) {
      this.formObject.patchValue({
        [field]: event.value,
      });
    }
  }

  saveFieldAddOn(formField: FormFieldCreatorModel) {
    const formValue = formField.fieldAddOn.formValue;
    const endpointData = formField.fieldAddOn.command;

    const payload = formField.fieldAddOn.payload(formValue);
    endpointData(...payload)
      .pipe(
        switchMap((res) => {
          return formField.selectValues();
        }),
        take(1)
      )
      .subscribe((res) => {
        const drpdnData = this.dropdownData$.getValue();
        this.dropdownData$.next({
          ...drpdnData,
          [formField.name]: res,
        });
        this.closeFieldAddOn(formField);
      });
  }

  closeFieldAddOn(formField: FormFieldCreatorModel) {
    setTimeout(() => {
      // hack to not trigger (clickOutside) action of sidebar - a known issue on github
      formField.fieldAddOn.open = false;
      this.cdRef.detectChanges();
    });
  }

  getFormFieldFeedback(fld: string) {
    const formFieldObj = this.formObject.get(fld);
    return formFieldObj.hasError('required')
      ? formsFeedback.required
      : formFieldObj.hasError('pattern')
      ? formsFeedback.pattern
      : formFieldObj.hasError('maxlength')
      ? formsFeedback.maxlength(formFieldObj.errors.maxlength.requiredLength)
      : formFieldObj.hasError('minlength')
      ? formsFeedback.maxlength(formFieldObj.errors.minlength.requiredLength)
      : '';
  }

  onFileUpload(event, formField) {
    this.formObject.patchValue({ [formField]: event });
  }
}
