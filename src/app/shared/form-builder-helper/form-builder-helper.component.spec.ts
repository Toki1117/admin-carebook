import { LoaderService } from './../../core/services/loader.service';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { FormBuilderHelperComponent } from './form-builder-helper.component';
import { FormFieldCreatorModel } from './form-builder-helper.interface';

const selectOptions = [
  {
    value: 1,
    label: 'First',
  },
  {
    value: 2,
    label: 'Second',
  },
];

const fakeModel1 = [
  {
    name: 'formField',
    label: 'field',
    isSelect: true,
    selectValues: () => of(selectOptions),
  },
];

const fakeModel2 = [
  {
    name: 'formField',
    label: 'field',
    selectValues: () => of(selectOptions),
  },
];

const modFunction = function modifyForm(
  formModel: FormFieldCreatorModel[],
  formObj: any
) {
  if (formObj.formField) {
    formModel[0].class = 'col-md-4';
    return {
      formField: 'yes',
    };
  }
};

describe('FormBuilderHelperComponent', () => {
  let component: FormBuilderHelperComponent;
  let fixture: ComponentFixture<FormBuilderHelperComponent>;
  let fb: FormBuilder;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [FormBuilderHelperComponent],
        imports: [FormsModule, ReactiveFormsModule, NgbDropdownModule],
        providers: [LoaderService],
      }).compileComponents();

      fb = TestBed.inject(FormBuilder);
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(FormBuilderHelperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create select options when isSelect and selectValues is included', () => {
    expect(component.dropdownData).toEqual({});

    component.formModel = fakeModel2;
    component.ngOnInit();
    expect(component.dropdownData).toEqual({});

    component.formModel = fakeModel1;
    component.ngOnInit();
    expect(component.dropdownData['formField']).toEqual(selectOptions);
  });

  it('should patch values when form modify is defined', () => {
    component.formModel = fakeModel2;
    component.modifyFunction = modFunction;
    component.ngOnInit();

    component.formObject.patchValue({
      formField: 'works',
    });
    expect(component.formObject.value).toEqual({
      formField: 'yes',
    });
  });
});
