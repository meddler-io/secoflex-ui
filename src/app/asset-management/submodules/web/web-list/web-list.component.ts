import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';



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
    {
      url: 'http://google.com',
      health: 'up',
      group: undefined,
      type: 's',
      tags: [],
      last_health_check: new Date()
    },
    {
      url: 'htps://facebook.com',
      health: 'down',
      group: undefined,
      type: 's',
      tags: [],
      last_health_check: new Date()
    },
    {
      url: 'https://www.linkedin.com',
      health: 'down',
      group: undefined,
      type: 's',
      tags: [],
      last_health_check: new Date()
    }
  ]

  constructor(
    private readonly el: ElementRef<HTMLElement>,
    @Inject(DOCUMENT) private document: Document
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


  }

}
