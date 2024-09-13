import { trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbRouteTabsetComponent } from '@nebular/theme';
import { share, tap } from 'rxjs/operators';
import { DrawerDirection } from 'src/app/drawer/drawer-direction.enum';
import { DRAWER_ANIMATION } from 'src/app/drawer/drawer.animation';
import { basicAnimations } from 'src/app/reusable-components/common/animations/basic-animations';
import { StateSyncService } from '../state-sync.service';

@Component({
  selector: 'app-job-home',
  templateUrl: './job-home.component.html',
  styleUrls: ['./job-home.component.scss'],


  animations: [
    ...basicAnimations,
  ]


})
export class JobHomeComponent implements OnInit {

  @Input() direction: DrawerDirection = DrawerDirection.Left;


  slideState = this.stateSyncService.toolSidePannelState.asObservable()

  SelectedJobId = this.stateSyncService.SelectedJobId //.pipe(share())

  constructor(
    private stateSyncService: StateSyncService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    let dsa: NbRouteTabsetComponent

  }

  ngOnInit(): void {


    this.SelectedJobId.subscribe(_ => {
      console.log('loffer', _)

      if (!!!_)
        this.stateSyncService.toolSidePannelState.next(true)
      else
        this.stateSyncService.toolSidePannelState.next(false)
    })



    this.route.paramMap.subscribe(_ => {

      if (_.has('jobid')) {

        let jobid = _.get('jobid')
        console.log('selectedJobs_push', jobid)
        this.stateSyncService.selectedJobId.next(jobid)

      } else {
        console.log('selectedJobs_push')
        this.stateSyncService.selectedJobId.next(undefined)

      }



    })
  }
  toggle() {
    this.stateSyncService.toggle()
  }

  tabs = [

    {
      title: 'Jobs',
      route: [
  
        


          '/jobs',
          'job',
             

   
          
        
      ],
      // responsive: true,
    },

    {
      title: 'Pipelines',
      route: [
        '/jobs',
        'pipeline',
    ],
      // responsive: true,
    },
    {
      title: 'Tasks',
      route: [
        '/jobs',
        'result',
      
      ],
      // responsive: true,
    }


  ]


  goToToolsSelection() {

    console.log('route', this.route)
    // return
    this.router.navigate([

      {
        outlets: {
          tool_list: ['tools']
        }
      }
    ]
      , { relativeTo: this.route }
    )
  }

}
