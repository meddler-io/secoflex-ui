import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, share, tap } from 'rxjs/operators';
import { JobApiService } from '../job-api.service';
import { StateSyncService } from '../state-sync.service';

@Component({
  selector: 'app-job-selector',
  templateUrl: './job-selector.component.html',
  styleUrls: ['./job-selector.component.scss']
})
export class JobSelectorComponent implements OnInit {

  tools = this.jobApiService.getTools()

  selectedTool = new FormControl('')

  jobs


  SelectedJobId = this.stateSyncService.SelectedJobId

  constructor(
    private jobApiService: JobApiService,
    private router: Router,
    public stateSyncService: StateSyncService

  ) { }

  ngOnInit(): void {

    // TODO: Need to unsubscrbe
    this.selectedTool.valueChanges.subscribe(val => {
      this.onToolSelectionChange(val)
    })

    this.onToolSelectionChange(this.selectedTool.value)



  }

  onToolSelectionChange(event) {

    if (event)
      this.jobs = this.jobApiService.getJobs(event)
    else
      this.jobs = this.jobApiService.getAllJobs()



  }

  onClick(jobId) {

    this.router.navigate([

      '/jobs',
      'job',
      jobId,
    ])



  }

}
