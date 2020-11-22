import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/reusable-components/common/services/api.service';
import { UploadService } from 'src/app/reusable-components/common/services/upload.service';
import { tap } from 'rxjs/operators';
import { BaseFieldComponent } from 'src/app/reusable-components/common/abstract/BaseFormComponent';

@Component({
  selector: 'app-form-file',
  templateUrl: './form-file.component.html',
  styleUrls: ['./form-file.component.scss']
})
export class FormFileComponent extends BaseFieldComponent implements OnInit {

  @ViewChild('file') file
  public files: Set<File> = new Set()


  files$ = this.apiService.getFiles
  uploadingFiles = []

  constructor(
    private apiService: ApiService,
    private uploadService: UploadService,

  ) {
    super()
    apiService.getFiles.subscribe()

  }

  ngOnInit() {
  }

  addFile() {
    this.file.nativeElement.click();
    // this.apiService.createFile('default_file_name').subscribe()
  }

  onFilesAdded() {
    const files: { [key: string]: File } = this.file.nativeElement.files;
    for (let key in files) {
      if (!isNaN(parseInt(key))) {
        let file = files[key];

        this
          .apiService
          .createFile(file.name)
          .pipe(tap(fileData => {

            this.uploadingFiles.push({ fileData: fileData, file: file })
          }))
          .subscribe()

      }
    }
  }

  onFileDropped(event: FileList) {
    console.log('File Dropped', event)

    for (let i = 0; i < event.length; i++) {

      let file = event.item(i)
      console.log('File Dropped', file)

      this
        .apiService
        .createFile(file.name)
        .pipe(tap(fileData => {

          this.uploadingFiles.push({ fileData: fileData, file: file })
        }))
        .subscribe()
    }

  }
}
