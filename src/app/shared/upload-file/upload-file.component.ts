import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
})
export class UploadFileComponent implements OnInit {
  files: Array<File>;

  @Input() fontSize: string;
  @Input() boxShadow = true;
  @Output() onFileUpload = new EventEmitter();

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.fontSize = this.fontSize
      ? `font-size: ${this.fontSize};`
      : 'font-size: inherit';
  }

  /**
   * Formats the size
   */
  _formatBytes(bytes: any, decimals = 2) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  /**
   * on files selected
   * @param files list of files
   */
  onFilesAdded(event: any) {
    const files = event.addedFiles;

    files.forEach((file) => {
      // tslint:disable-next-line: no-string-literal
      file['preview'] = this.sanitizer.bypassSecurityTrustResourceUrl(
        encodeURI(URL.createObjectURL(file))
      );
      // tslint:disable-next-line: no-string-literal
      file['formattedSize'] = this._formatBytes(file.size);

      const reader = new FileReader();

      reader.onload = (e: ProgressEvent) => {
        const content = (e.target as FileReader).result;

        // this content string could be used as an image source
        // or be uploaded to a webserver via HTTP.
      };

      // use this for basic text files like .txt or .csv
      // reader.readAsText(file);

      // use this for images
      // reader.readAsDataURL(file);
    });
    this.files = files;
    this.onFileUpload.emit(this.files);
  }

  /**
   * Removes the selected file
   * @param file file obj
   */
  removeFile(file: any) {
    this.files.splice(this.files.indexOf(file), 1);
    this.onFileUpload.emit(this.files);
  }
}
