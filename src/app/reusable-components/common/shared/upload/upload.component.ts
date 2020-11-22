import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { of, Observable, Subscriber, Subscription } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';
import { UploadService } from '../../services/upload.service';
import { API_SERVICE_URL } from '../Constants';
import { ApiService } from '../../services/api.service';
import { BaseFieldComponent } from '../../abstract/BaseFormComponent';



@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent extends BaseFieldComponent implements OnInit {

  @ViewChild('filename') filenameInput: ElementRef;
  @Input('fileData')
  fileData

  fileUrl = API_SERVICE_URL

  @Input('file')
  file: File

  uploadObservable: Subscription

  uploading = false;
  editMode = false;
  uploadProgress = 0;

  chaningFileName = false;
  deleteInProgress = false;
  createInProgress = true;

  toggleEditMode($event: Event, force = false) {

    if (force == true)
      return $event.stopPropagation()

    if ($event) {

      if (this.editMode == true)
        return $event.stopPropagation()

    }

    this.editMode = !this.editMode;
    if (this.editMode)
      setTimeout(() => {
        this.filenameInput.nativeElement.focus();
        let beforeExtension = this.filenameInput.nativeElement.value.lastIndexOf('.');
        if (beforeExtension < 0)
          beforeExtension = this.filenameInput.nativeElement.value.length;
        this.filenameInput.nativeElement.setSelectionRange(0, beforeExtension)
      }, 0);

  }

  constructor(private uploadService: UploadService, private apiService: ApiService) {
    super()
  }

  ngOnInit(): void {

    
    if (this.file) {
      this.uploadObservable = this.uploadService
        .upload(this.file, this.fileData['token'])
        .pipe(tap(_ => {
          this.createInProgress = false;
          this.uploading = true;
        }))
        .subscribe(uploadStatus => {
          if (uploadStatus.status == true) {
            this.uploading = false;
            this.uploadProgress = uploadStatus.progress


          } else {
            this.uploading = true;
            this.uploadProgress = uploadStatus.progress
          }
          console.log('uploadStatus', uploadStatus)
        })
      console.log('file aailable for upload')
    } else{
      this.createInProgress = false
    }
  }


  clearSelection() {
    if (window.getSelection) { window.getSelection().removeAllRanges(); }

  }

  setFilename(fileName: string) {


    if (this.chaningFileName == true)
      return

    this.clearSelection()

    this.chaningFileName = true;


    this.uploadService
      .renameFile(this.fileData.fileid, fileName)
      .subscribe(_ => {
        this.chaningFileName = false;
        this.toggleEditMode(undefined)

      })
  }


  onFilenameFocus(focus) {
    console.log("onFilenameFocus", focus)

    if (focus == true) {

    } else {

    }
  }

  downloadFile() {
    if (this.fileData)
      if (this.fileData.state == "UPLOADED")
        window.open(this.fileUrl + 'api/v2/file/download/' + this.fileData.fileid, '_blank');
  }

  deleteFile() {
    if (this.fileData)
      if (this.fileData.fileid) {
        this.deleteInProgress = true
        this.apiService.deleteFile(this.fileData.fileid).subscribe(_=>{
          this.deleteInProgress = false;
        })
        if (this.uploadObservable)
          this.uploadObservable.unsubscribe()


      }
  }
}
