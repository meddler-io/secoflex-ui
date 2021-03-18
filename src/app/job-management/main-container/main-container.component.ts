import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StateSyncService } from '../state-sync.service';

@Component({
  selector: 'app-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.scss']
})
export class MainContainerComponent implements OnInit {


  tabs = [

    {
      title: 'Request_',
      route: [{
        outlets: {

          sub_comp: ['logs1']
        }
      }],
      responsive: true,

    }, {
      title: 'Logs',
      route: [{
        outlets: {
          sub_comp: ['logs2'],
        }
      }],
      responsive: true,

    },
    {
      title: 'Result',
      route: [{
        outlets: {
          sub_comp: ['logs3']

        }
      }],
      responsive: true,

    },
    {
      title: 'Settings',
      route: [{
        outlets: {
          sub_comp: ['logs4']

        }
      }],
      responsive: true,

    },
    {
      title: 'Scratchpad',
      route: [{
        outlets: {
          sub_comp: ['logs6']

        }
      }],
      responsive: true,

    },


  ];


  slideState = this.stateSyncService.toolSidePannelState.asObservable()
  SelectedJobId = this.stateSyncService.SelectedJobId
  SelectedJob = this.stateSyncService.SelectedJob



  constructor(
    private stateSyncService: StateSyncService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
  }

  toggleJobSelector() {
    this.stateSyncService.toggle()
  }

  openToToolsSelection(id) {

    let _route = {
    }

    if (id == undefined) {
      _route = {
        outlets: {
          "tool_list": [`tools`]
        }
      }
    } else {
      _route = {
        outlets: {
          "tool_list": [`tool`, id]
        }
      }
    }

    this.router.navigate([

      _route
    ], {
      relativeTo: this.route.parent
    })
  }
}
