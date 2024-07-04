import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit } from '@angular/core';

import { AssetApiService } from 'src/app/asset-management/asset-api.service';

@Component({
  selector: 'app-domain-search',
  templateUrl: './domain-search.component.html',
  styleUrls: ['./domain-search.component.scss']
})
export class DomainSearchComponent implements OnInit {

  constructor(
    private readonly el: ElementRef<HTMLElement>,
    @Inject(DOCUMENT) private document: Document,
    private aseetService: AssetApiService
    // private dsa : BlockScrollStrategy
  ) {



  }


  ngOnInit(): void {

  }

  // addDomain(template, direction = DrawerDirection.Left, size = 50, closeOnOutsideClick = true, isRoot = true, parentContainer?: any) {

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