import { Component, OnDestroy, OnInit } from '@angular/core';
import { MainContainerTabs, StateSyncService } from '../state-sync.service';

@Component({
  selector: 'app-job-result',
  templateUrl: './job-result.component.html',
  styleUrls: ['./job-result.component.scss']
})
export class JobResultComponent implements OnInit, OnDestroy {


  SelectedJob = this.stateSyncService.SelectedJob

  constructor(
    private stateSyncService: StateSyncService
  ) { }
  
  ngOnDestroy(): void {
    this.stateSyncService.mainContainerActiveTab.next(
      MainContainerTabs.UNDEFINED
    )
  }

  ngOnInit(): void {

    this.stateSyncService.mainContainerActiveTab.next(
      MainContainerTabs.RESULT
    )
  }

}
