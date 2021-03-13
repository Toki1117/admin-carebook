import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxDropzoneModule } from 'ngx-dropzone';

import { UploadFileComponent } from './upload-file.component';

@NgModule({
  imports: [CommonModule, NgxDropzoneModule],
  exports: [UploadFileComponent],
  declarations: [UploadFileComponent],
  providers: [],
})
export class UploadFileModule {}
