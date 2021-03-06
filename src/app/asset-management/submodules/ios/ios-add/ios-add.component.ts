import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';

import { AssetApiService } from 'src/app/asset-management/asset-api.service';

@Component({
  selector: 'app-ios-add',
  templateUrl: './ios-add.component.html',
  styleUrls: ['./ios-add.component.scss']
})
export class IosAddComponent implements OnInit {


  @ViewChild('createNewAppTemplate') createNewAppTemplate

  constructor(
    private readonly el: ElementRef<HTMLElement>,
    @Inject(DOCUMENT) private document: Document,
    private aseetService: AssetApiService,
    // private dsa : BlockScrollStrategy
  ) {



  }
  ngAfterViewInit(): void {
    // this.createNewApp(this.createNewAppTemplate)
  }


  ngOnInit(): void {

  }


  // createNewApp(template, direction = DrawerDirection.Left, size = 50, closeOnOutsideClick = true, isRoot = true, parentContainer?: any) {

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
