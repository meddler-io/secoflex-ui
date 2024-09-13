import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, share, shareReplay, switchMap, tap } from 'rxjs/operators';
import { JobApiService } from '../job-api.service';
import { StateSyncService, StatusPipe, statusTransform } from '../state-sync.service';
import { DrawerService } from 'src/app/drawer/drawer.service';
import { DOCUMENT } from '@angular/common';
import { DrawerDirection } from 'src/app/drawer/drawer-direction.enum';

@Component({
  selector: 'app-job-selector',
  templateUrl: './job-selector.component.html',
  styleUrls: ['./job-selector.component.scss']
})
export class JobSelectorComponent implements OnInit {

  sub_comp_route: string

  tools = this.jobApiService.getTools()

  selectedTool = new FormControl('')

  job_response


  SelectedJob = this.stateSyncService.SelectedJob.pipe(
    shareReplay({ refCount: true, bufferSize: 1 })
  )



  constructor(
    private jobApiService: JobApiService,
    private router: Router,
    private route: ActivatedRoute,
    public stateSyncService: StateSyncService,


    private drawerMngr: DrawerService,
    @Inject(DOCUMENT) private document: Document,

  ) { }

  ngOnInit(): void {


    this.stateSyncService.MainContainerActiveTab.subscribe(_ => {
      this.sub_comp_route = _
    })


    this.route.paramMap.subscribe(params => {
      let tool_id = params.get('tool_id')
      console.log('tool_id', tool_id)
      this.onToolSelectionChange(tool_id)


      this.selectedTool.setValue(tool_id)
      if (tool_id) {

      } else {

      }
    })



    // TODO: Need to unsubscrbe
    this.selectedTool.valueChanges.subscribe(val => {
      this.onToolSelectionChange(val)
    })

    // this.onToolSelectionChange(this.selectedTool.value)



  }

  onToolSelectionChange(event) {

    if (event)
      this.job_response = this.jobApiService.getTaskJobs(event).pipe(map((_: any) => {

        _.jobs =  statusTransform( _.jobs );

        console.log('_.jobs' , _)
        return _;
      }))
    else
      this.job_response = this.jobApiService.getAllJobs().pipe(map((_: any) => {

        console.log('_jobs', _)
         _.jobs =  statusTransform( _.jobs )
        console.log('_.jobs' , _)

        return _;
      }))
    // .pipe(StatusPipe)



  }

  goToToolsSelection() {

    // console.log('route', this.route.root)
    // return
    this.router.navigate([

      {
        outlets: {
          tool_list: ['tools']
        }
      }
    ], { relativeTo: this.route.parent })



  }
  onClick(jobId) {

    // console.log('ekkkk', this.selectedTool.value)
    // console.log('route', this.route.snapshot)
    // return




    this.router.navigate([


      'jobs',
      'job',
      jobId,
      {
        outlets: {

          tool_list: [
            'tool',
            this.selectedTool.value,



          ],

          view: [
            'job',
            {
              outlets: {
                sub_comp: [
                  this.sub_comp_route
                ]
              }
            }
          ]

        }
      }




    ],
      {
        // relativeTo: this.route.parent.parent
      }
    )
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
}
