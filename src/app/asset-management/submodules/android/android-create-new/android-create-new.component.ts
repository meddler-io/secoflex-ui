import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


import { map, flatMap, tap, finalize, filter } from 'rxjs/operators';
import { AssetApiService } from 'src/app/asset-management/asset-api.service';
import { basicAnimations } from 'src/app/reusable-components/common/animations/basic-animations';
import { AndroidListItem } from '../android-list-item/android-list-item.component';


interface ProgressStatus {
  progress: number;
  completed: boolean;
  started: boolean;
}

@Component({
  selector: 'app-android-create-new',
  templateUrl: './android-create-new.component.html',
  styleUrls: ['./android-create-new.component.scss'],
  animations: [...basicAnimations]
})
export class AndroidCreateNewComponent implements OnInit {
  selected_file: File = undefined

  @Input('app') app: AndroidListItem

  android_data_form = new FormGroup({
    app_name: new FormControl(''),
    package_name: new FormControl(''),
  });

  @ViewChild('file') file

  progressStatus: ProgressStatus = {
    progress: 0,
    completed: true,
    started: false
  }
  constructor(private assetApiService: AssetApiService) { }

  ngOnInit(): void {
    console.log('edit', this.app)

  }


  onFilesAdded() {
    this.selected_file = this.file.nativeElement.files[0];
    console.log(this.selected_file)
  }
  selectFile() {
    this.file.nativeElement.click();

  }

  removeFile() {
    this.file.nativeElement.value = ''
    this.selected_file = undefined
  }

  upload() {
    this.progressStatus.started = true


    this.assetApiService.createFile(this.selected_file.name).pipe(

      map((_: any) => {
        return this.assetApiService.upload(this.selected_file, _.token)
      }),
      flatMap(_ => _),
      tap(upload_progress => {


        this.progressStatus.completed = upload_progress.status
        this.progressStatus.progress = upload_progress.progress
      }),
      filter(d => {
        return d.status
      }),
      map(data => {

        return this.assetApiService.addAndroid(this.android_data_form.value.app_name, this.android_data_form.value.package_name, data.fileData.fileid)
      })
      ,
      flatMap(_ => _),


    ).subscribe(data => {

      console.log('got value ', data)
    })

    // .subscribe({
    //   next: x => console.log('got value ' + x),
    //   error: err => console.error('something wrong occurred: ' + err),
    //   complete: () => console.log('done'),

    // })


  }

}
