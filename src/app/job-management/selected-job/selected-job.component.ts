import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { StateSyncService, StatusPipe } from '../state-sync.service';

@Component({
  selector: 'app-selected-job',
  templateUrl: './selected-job.component.html',
  styleUrls: ['./selected-job.component.scss']
})
export class SelectedJobComponent implements OnInit {


  SelectedJob = this.stateSyncService.SelectedJob.pipe(
    StatusPipe
  )

  constructor(
    private stateSyncService: StateSyncService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
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

    this.stateSyncService.toggle()

  }
}


