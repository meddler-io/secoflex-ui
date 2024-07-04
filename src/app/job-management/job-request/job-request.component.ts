import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnDestroy, OnInit } from '@angular/core';
import { share, shareReplay } from 'rxjs/operators';
import { DrawerDirection } from 'src/app/drawer/drawer-direction.enum';
import { DrawerService } from 'src/app/drawer/drawer.service';
import { MainContainerTabs, StateSyncService } from '../state-sync.service';

@Component({
  selector: 'app-job-request',
  templateUrl: './job-request.component.html',
  styleUrls: ['./job-request.component.scss']
})
export class JobRequestComponent implements OnInit, OnDestroy {


  SelectedJob = this.stateSyncService.SelectedJob.pipe(shareReplay())

  constructor(
    private stateSyncService: StateSyncService,
    @Inject(DOCUMENT) private document: Document,
    private drawerService: DrawerService,
    private readonly el: ElementRef<HTMLElement>


  ) { }

  ngOnDestroy(): void {
    this.stateSyncService.mainContainerActiveTab.next(
      MainContainerTabs.UNDEFINED
    )
  }

  ngOnInit(): void {

    this.stateSyncService.mainContainerActiveTab.next(
      MainContainerTabs.REQUEST
    )
  }

  open(template) {
    this.addIp(template)
  }

  addIp(template, direction = DrawerDirection.Left, size = 50, closeOnOutsideClick = true, isRoot = true, parentContainer?: any) {

    const zIndex = 1041;
    const cssClass = 'backdrop_color'
    this.document.body.classList.add('cdk-global-scrollblock')


    this.drawerService.create({
      direction,
      template: template,
      context: 'Alert Everyone!',
      closeOnOutsideClick: true,
      parentContainer: this.el.nativeElement,
      isRoot: false,
      cssClass: cssClass,
      zIndex: zIndex
    }).onDestroy(() => {

      this.document.body.classList.remove('cdk-global-scrollblock')

    });
  }

}
