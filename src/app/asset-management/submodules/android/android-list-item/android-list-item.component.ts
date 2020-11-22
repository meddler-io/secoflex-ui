import { DOCUMENT } from '@angular/common';
import { ElementRef, Inject, Input, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';

import { AssetApiService } from 'src/app/asset-management/asset-api.service';


export interface AndroidListItem {

  file_id: string | undefined;
  app_name: string;
  package_name: string;
  doc?: Date
  dou?: Date

}

@Component({
  selector: 'app-android-list-item',
  templateUrl: './android-list-item.component.html',
  styleUrls: ['./android-list-item.component.scss']
})
export class AndroidListItemComponent implements OnInit {

  selected_file: File = undefined
  @ViewChild('file') file

  @Input('app') app: AndroidListItem

  @ViewChild('editNewAppTemplate') editNewAppTemplate

  constructor(
    private readonly el: ElementRef<HTMLElement>,
    @Inject(DOCUMENT) private document: Document,
    private assetApiService: AssetApiService,
    // private dsa : BlockScrollStrategy
  ) {


  }


  ngOnInit(): void {
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
    this.assetApiService.upload(this.selected_file, '').subscribe()
  }

  edit() {

  }

  // editNewApp(template, direction = DrawerDirection.Left, size = 50, closeOnOutsideClick = true, isRoot = true, parentContainer?: any) {

  //   const zIndex = 1041;
  //   const cssClass = 'backdrop_color'
  //   this.document.body.classList.add('cdk-global-scrollblock')

  //   this.drawerService.create({
  //     direction,
  //     template,
  //     size,
  //     context: 'Alert Everyone!',
  //     closeOnOutsideClick,
  //     parentContainer,
  //     isRoot,
  //     zIndex,
  //     cssClass,


  //   }).onDestroy(() => {

  //     this.document.body.classList.remove('cdk-global-scrollblock')

  //   });
  // }

}
