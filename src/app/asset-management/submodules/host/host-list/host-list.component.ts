import { BlockScrollStrategy } from '@angular/cdk/overlay';
import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';

import { AssetApiService } from 'src/app/asset-management/asset-api.service';
import { basicAnimations } from 'src/app/reusable-components/common/animations/basic-animations';


interface HostListItem {
  host: string;
  health: 'up' | 'down';
  group: string | undefined;
  type: string;
  tags: string[];
  last_health_check: Date;
  dou?: Date

}

@Component({
  selector: 'app-host-list',
  templateUrl: './host-list.component.html',
  styleUrls: ['./host-list.component.scss'],
  animations: [...basicAnimations]
})
export class HostListComponent implements OnInit {







  selected_host_list_item = -1;
  @ViewChild('template', { static: false }) template: TemplateRef<any>;


  hosts: HostListItem[] = [
    {
      host: '192.168.12.21',
      health: 'up',
      group: undefined,
      type: 's',
      tags: [],
      last_health_check: new Date()
    },
    {
      host: '192.168.12.21',
      health: 'down',
      group: undefined,
      type: 's',
      tags: [],
      last_health_check: new Date()
    },
    {
      host: '192.168.12.21',
      health: 'down',
      group: undefined,
      type: 's',
      tags: [],
      last_health_check: new Date()
    }
  ]

  constructor(
    private readonly el: ElementRef<HTMLElement>,
    @Inject(DOCUMENT) private document: Document,
    private aseetService: AssetApiService
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

    this.aseetService.getHosts().subscribe((hosts: []) => {
      hosts.forEach(host => {

        this.hosts.push(host)

      })


    })

  }

}
