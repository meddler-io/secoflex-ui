import { Component, OnInit } from '@angular/core';
import { JobApiService } from '../job-api.service';
import { StateSyncService } from '../state-sync.service';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss']
})
export class JobListComponent implements OnInit {

  jobs ;

  constructor(

    private jobApiService: JobApiService,
  ) { }

  ngOnInit(): void {
    this.getJobs()


    // this.stateSyncService.SelectedJobId

  }

  getJobs() {

    this
      .jobApiService
      .getJobs('6040b3b797db9259f9ca741e')
      .subscribe(((jobs: []) => {

        this.jobs = jobs
      }))
  }

}