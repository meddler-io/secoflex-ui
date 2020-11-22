import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';

import { AssetApiService } from 'src/app/asset-management/asset-api.service';

import { DomainApiService } from '../domain-api.service';



interface DomainListItem {
  domain: string;
  health: 'up' | 'down';
  group: string | undefined;
  type: string;
  tags: string[];
  last_health_check: Date;
  dou?: Date

}


@Component({
  selector: 'app-domain-list',
  templateUrl: './domain-list.component.html',
  styleUrls: ['./domain-list.component.scss']
})
export class DomainListComponent implements OnInit {


  selected_host_list_item = -1;
  @ViewChild('template', { static: false }) template: TemplateRef<any>;


  domains: DomainListItem[] = [

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

    this.assetApiService.getDomains().subscribe((domains: []) => {


      domains.forEach((domain) => {
        console.log('domain', domain)
        this.domains.push(domain)

      })

    })
  }


}
