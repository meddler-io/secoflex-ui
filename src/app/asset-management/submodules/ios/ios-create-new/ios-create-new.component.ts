import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { map, flatMap, tap, filter } from 'rxjs/operators';
import { AssetApiService } from 'src/app/asset-management/asset-api.service';
import { basicAnimations } from 'src/app/reusable-components/common/animations/basic-animations';
import { IosListItem } from '../ios-list-item/ios-list-item.component';


interface ProgressStatus {
  progress: number;
  completed: boolean;
  started: boolean;
}



@Component({
  selector: 'app-ios-create-new',
  templateUrl: './ios-create-new.component.html',
  styleUrls: ['./ios-create-new.component.scss'],
  animations: [...basicAnimations]

})
export class IosCreateNewComponent implements OnInit {

  selected_file: File = undefined

  @Input('app') app: IosListItem

  ios_data_form = new FormGroup({
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

        return this.assetApiService.addIosApp(this.ios_data_form.value.app_name, this.ios_data_form.value.package_name, data.fileData.fileid)
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
