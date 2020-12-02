import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AssetApiService } from 'src/app/asset-management/asset-api.service';



interface WebListItem {
  url: string;
  health: 'up' | 'down';
  group: string | undefined;
  type: string;
  tags: string[];
  last_health_check: Date;
  dou?: Date

}


@Component({
  selector: 'app-web-list',
  templateUrl: './web-list.component.html',
  styleUrls: ['./web-list.component.scss']
})
export class WebListComponent implements OnInit {


  selected_host_list_item = -1;
  @ViewChild('template', { static: false }) template: TemplateRef<any>;


  web_apps: WebListItem[] = [

  ]

  constructor(
    private readonly el: ElementRef<HTMLElement>,
    @Inject(DOCUMENT) private document: Document,
    private assetApiService: AssetApiService
    // private dsa : BlockScrollStrategy
  ) {



  }

  // detailedView(index, direction = DrawerDirection.Left, size = 50, closeOnOutsideClick = true, template = this.template, isRoot = true, parentContainer?: any) {

  //   const zIndex = 1041;
  //   const cssClass = 'backdrop_color'
  //   this.selected_host_list_item = index;
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
  //     this.selected_host_list_item = -1;
  //     this.document.body.classList.remove('cdk-global-scrollblock')

  //   });
  // }

  ngOnInit(): void {

    this.assetApiService.getWeb().subscribe((data: WebListItem[]) => {
      this.web_apps = data
    })

  }

}
