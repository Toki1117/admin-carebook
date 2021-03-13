import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgxDropzoneLabelDirective } from 'ngx-dropzone/lib/ngx-dropzone-label.directive';

import { UploadFileComponent } from './upload-file.component';

describe('UploadFileComponent', () => {
  let component: UploadFileComponent;
  let fixture: ComponentFixture<UploadFileComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [UploadFileComponent],
        imports: [NgxDropzoneModule],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
