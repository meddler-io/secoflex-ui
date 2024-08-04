import { DOCUMENT } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, Inject, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EMPTY, of, Subscription } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs';
import { DrawerDirection } from 'src/app/drawer/drawer-direction.enum';
import { DrawerService } from 'src/app/drawer/drawer.service';
import { SharedDataService } from '../../shared-data-service.service';
import { ToolApiService } from '../../tool-api.service';


@Component({
  selector: 'app-scanners-ui',
  templateUrl: './scanners.component.html',
  styleUrls: ['./scanners.component.scss']
})
export class ScannersUiComponent implements OnInit, OnDestroy, AfterViewInit {


  @ViewChild('jobConfigTemplate') jobConfigTemplate;

  @Input('tool_id') tool_id

  deployments

  loadData() {
    this.deployments = this.sharedDataService.ToolId
      .pipe(
        map(
          (id => {
            return id;
          }
          )
        )
      ).pipe(

        switchMap(tool_id => {

          return this
            .toolApiService
            .getTaskForTools(tool_id)
            .pipe(map((scanners: []) => {

              console.log("scanners", scanners)
              return scanners;







            }))


        })


      )
  }


  constructor(
    private toolApiService: ToolApiService,
    private drawerMngr: DrawerService,
    @Inject(DOCUMENT) private document: Document,
    private activatedRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private sharedDataService: SharedDataService,



  ) { }
  ngAfterViewInit(): void {

    return;
    this.openDrawer(this.jobConfigTemplate,
      {
        'config': {},
        'id': '669961ed8b2955d7f6f94172:66a0e05dc1756beee40d4736'
      }

    )
  }

  sharedServiceSubscription$ = Subscription.EMPTY

  ngOnDestroy(): void {

    this.sharedServiceSubscription$.unsubscribe()
  }


  ngOnInit(): void {


    this.loadData()

  }



  deployJob(id: string) {



    this.toolApiService.createDeployment(id).subscribe(_ => {
      console.log(_)

    })
  }

  stopJob(job_id) {
    this
      .toolApiService
      .stopDeployment(job_id)
      .subscribe()
  }

  purge() {
    this
      .toolApiService
      .purgeDeployment()
      .subscribe()

  }


  runJob(job_id) {


    console.log('runJob', job_id)
    return

    this
      .toolApiService
      .runDeployment(job_id)
      .subscribe()
  }

  execJob(id) {

    this
      .toolApiService
      .execJob(id, {})
      .subscribe()
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

  deleteScanner(id) {
    this.toolApiService.deleteJob(id).subscribe(_ => {
      console.log(_);
    this.loadData()


    })
  }

}
