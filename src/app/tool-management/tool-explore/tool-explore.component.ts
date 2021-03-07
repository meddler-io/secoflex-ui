import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, filter, tap } from 'rxjs/operators';
import { DrawerDirection } from 'src/app/drawer/drawer-direction.enum';
import { DrawerService } from 'src/app/drawer/drawer.service';
import { SharedDataService } from '../shared-data-service.service';
import { ToolApiService } from '../tool-api.service';

@Component({
  selector: 'app-tool-explore',
  templateUrl: './tool-explore.component.html',
  styleUrls: ['./tool-explore.component.scss']
})
export class ToolExploreComponent implements OnInit {


  tabs: any[] = []

  @ViewChild('buildCreateTemplate', { static: false }) buildCreateTemplate: TemplateRef<any>;
  @ViewChild('logsTemplate', { static: false }) logTemplate: TemplateRef<any>;


  refrence_id = 'refrence_id'

  builds$




  constructor(
    private toolApiService: ToolApiService,
    private drawerMngr: DrawerService,
    @Inject(DOCUMENT) private document: Document,
    private activatedRoute: ActivatedRoute,
    private sharedDataService: SharedDataService

  ) { }
  ngOnInit(): void {


    this.activatedRoute.params
      .pipe(map(_ => _.id))
      .pipe(filter(_ => _))
      .pipe(tap(id => {
        this.refrence_id = id

        this.sharedDataService.SetToolId(id)


        this.tabs = [

          {
            title: 'Deployments',
            // icon: 'person',
            // route: [{ outlets: { view: `deployments/${id}` } }],
            route: [{ outlets: { view: `deployments` } }],
            responsive: true,

          },
          {
            title: 'Images',
            // icon: 'paper-plane-outline',
            // route: [{ outlets: { view: `images/${id}` } }],
            route: [{ outlets: { view: `images` } }],
            responsive: true,

          },
          {
            title: 'Builds',
            // icon: 'paper-plane-outline',
            // route: [{ outlets: { view: `builds/${id}` } }],
            route: [{ outlets: { view: `builds` } }],
            responsive: true,

          },
          {
            title: 'Jobs',
            // icon: 'paper-plane-outline',
            // route: [{ outlets: { view: `builds/${id}` } }],
            route: [{ outlets: { view: `jobs` } }],
            responsive: true,

          },

        ];


      }))
      .subscribe(id => {

        this.builds$ = this.toolApiService.getBuilds(id)
          // .pipe(delay(THROTTLE_DELAY))
          .pipe(tap((data: []) => {
            if (data.length < 1) {

              this.openDrawer(this.buildCreateTemplate)

            }
          }))




      })


  }



  openDrawer(template, context?: any, direction = DrawerDirection.Left, size = '50', closeOnOutsideClick = true, isRoot = true, parentContainer?: any) {

    if (!context)
      context = {}


    console.log('context', context)
    const zIndex = 1000;
    const cssClass = 'backdrop_color'
    // const cssClass = 'cdk-overlay-2'
    this.document.body.classList.add('cdk-global-scrollblock')



    this.drawerMngr.create({
      direction,
      template,
      size,
      context: context,
      closeOnOutsideClick,
      parentContainer,
      isRoot,
      zIndex,
      cssClass,


    }).onDestroy(() => {

      this.document.body.classList.remove('cdk-global-scrollblock')

    });
  }
  openLogs(template, id: string, direction = DrawerDirection.Left, size = '50%', closeOnOutsideClick = true, isRoot = true, parentContainer?: any) {

    const zIndex = 1000;
    const cssClass = 'backdrop_color'
    // const cssClass = 'cdk-overlay-2'
    this.document.body.classList.add('cdk-global-scrollblock')
    this.drawerMngr.create({
      direction,
      template,
      size,
      closeOnOutsideClick,
      parentContainer,
      isRoot,
      zIndex,
      cssClass,
      context: {
        id: id
      }
    }

    )
      .onDestroy(() => {
        this.document.body.classList.remove('cdk-global-scrollblock')

      });
  }

}
