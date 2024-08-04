import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, share, shareReplay, tap } from 'rxjs/operators';
import { JobApiService } from '../job-api.service';
import { StateSyncService, StatusPipe } from '../state-sync.service';

@Component({
  selector: 'app-job-selector',
  templateUrl: './job-selector.component.html',
  styleUrls: ['./job-selector.component.scss']
})
export class JobSelectorComponent implements OnInit {

  sub_comp_route: string

  tools = this.jobApiService.getTools()

  selectedTool = new FormControl('')

  jobs


  SelectedJob = this.stateSyncService.SelectedJob.pipe(
    shareReplay({refCount: true , bufferSize: 1 })
  )



  constructor(
    private jobApiService: JobApiService,
    private router: Router,
    private route: ActivatedRoute,
    public stateSyncService: StateSyncService

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
      this.jobs = this.jobApiService.getJobs(event).pipe(
        StatusPipe)
    else
      this.jobs = this.jobApiService.getAllJobs().pipe(StatusPipe)



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

}
