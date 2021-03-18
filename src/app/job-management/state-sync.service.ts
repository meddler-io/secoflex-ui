import { Injectable } from '@angular/core';

import { BehaviorSubject, Subject } from 'rxjs';
import { delay, filter, mergeMap, first, shareReplay, tap, distinct, distinctUntilChanged, publishReplay, publish, share } from 'rxjs/operators';
import { ToolApiService } from '../tool-management/tool-api.service';
import { JobApiService } from './job-api.service';

export enum SidePannelState {
  OPEN = 'opened',
  CLOSED = 'closed'
}

@Injectable({
  providedIn: 'root'
})
export class StateSyncService {

  // public toolSidePannelState = new BehaviorSubject<SidePannelState>(SidePannelState.OPEN)
  public toolSidePannelState = new BehaviorSubject<boolean>(true)


  // 

  public selectedJob = new BehaviorSubject<any>(undefined)

  public selectedJobId = new BehaviorSubject<string>(undefined)
  public SelectedJobId = this.selectedJobId.pipe(

    // filter(_ => !!_),
    tap(_ => {

      console.log('selectedJobs', _)
      if (_ != undefined)
        this.selectedJob.next(
          this.jobApiService.getJob(_)
        )
    }),

    // delay(1000)
    distinctUntilChanged(),

    shareReplay()
  )



  public SelectedJob = this.selectedJob.asObservable().pipe(


    filter(_ => !!_),

    mergeMap(_ => _)
    ,

    // share(),

  )




  constructor(

    private jobApiService: JobApiService
  ) {

    console.log('constructir', 'dadsa')
    // this.SelectedJobId.subscribe()

  }



  toggle() {



    this.toolSidePannelState.pipe(
      first(),
      tap(
        (_: boolean) => {
          this.toolSidePannelState.next(!_)
        }
      )
    )
      .subscribe().unsubscribe()
  }
}

