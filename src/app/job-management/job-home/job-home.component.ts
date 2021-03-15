import { trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbRouteTabsetComponent } from '@nebular/theme';
import { tap } from 'rxjs/operators';
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



  constructor(
    private stateSyncService: StateSyncService,
    private activatedRoute: ActivatedRoute
  ) {
    let dsa: NbRouteTabsetComponent

  }

  ngOnInit(): void {


    this.stateSyncService.SelectedJobId.subscribe(_ => {
      console.log('loffer', _)

      if (!!!_)
        this.stateSyncService.toolSidePannelState.next(true)
      else
        this.stateSyncService.toolSidePannelState.next(false)
    })



    this.activatedRoute.paramMap.subscribe(_ => {

      if (_.has('jobid')) {

        let jobid = _.get('jobid')
        this.stateSyncService.selectedJobId.next(jobid)

      } else {
        this.stateSyncService.selectedJobId.next(undefined)

      }



    })
  }
  toggle() {
    this.stateSyncService.toggle()
  }

  tabs = [

    {
      title: 'Logs',
      route: [{
        outlets: {
          view: ['logs']


        }
      }],
      // responsive: true,
    },

    {
      title: 'Result',
      route: [{
        outlets: {


          view: ['result']

        }
      }],
      // responsive: true,
    },
    {
      title: 'Settings',
      route: [{
        outlets: {
          view: ['settings']
        }
      }],
      // responsive: true,
    }


  ]



}
