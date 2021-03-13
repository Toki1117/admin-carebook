import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Select2Module } from 'ng-select2-component';
import { FormBuilderHelperComponent } from './form-builder-helper.component';
import { UploadFileModule } from '../upload-file/upload-file.module';
import { DirectivesModule } from '../directives/directives.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Select2Module,
    DirectivesModule,
    UploadFileModule,
  ],
  exports: [FormBuilderHelperComponent],
  declarations: [FormBuilderHelperComponent],
})
export class FormBuilderHelperModule {}
