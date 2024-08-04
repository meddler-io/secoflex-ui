import { Injectable } from '@angular/core';

import { BehaviorSubject, Subject } from 'rxjs';
import { delay, filter, mergeMap, first, shareReplay, tap, distinct, distinctUntilChanged, publishReplay, publish, share, map } from 'rxjs/operators';
import { ToolApiService } from '../tool-management/tool-api.service';
import { JobApiService } from './job-api.service';


export const StatusPipe = map(_data => {

  if (Array.isArray(_data)) {

    _data.forEach((data, index) => {


      let exec_status = data['exec_status']
      let _status = 'basic'
      switch (exec_status) {
        case 'FAILURE':
          _status = 'danger'
          break
        case 'TIMEOUT':
          _status = 'danger'
          break
        case 'SUCCESS':
          _status = 'success'
          break
        case 'COMPLETED':
          _status = 'success'
          break
        case 'ENQUEUED':
          _status = 'primary'
          break
        case 'INITIATED':
          _status = 'primary'
          break
        case 'UNKNOWN':
          _status = 'basic'
          break

      }

      data['_status'] = _status

      _data[index] = data

    })

  } else {


    let exec_status = _data['exec_status']
    let _status = 'basic'
    switch (exec_status) {
      case 'FAILURE':
        _status = 'danger'
        break
      case 'TIMEOUT':
        _status = 'danger'
        break
      case 'SUCCESS':
        _status = 'success'
        break
      case 'COMPLETED':
        _status = 'success'
        break
      case 'ENQUEUED':
        _status = 'primary'
        break
      case 'INITIATED':
        _status = 'primary'
        break
      case 'UNKNOWN':
        _status = 'basic'
        break

    }

    _data['_status'] = _status

  }


  return _data;
})

export enum SidePannelState {
  OPEN = 'opened',
  CLOSED = 'closed'
}

export enum MainContainerTabs {
  REQUEST = "request",
  RESULT = "result",
  LOG = "logs",
  UNDEFINED = "",

}

@Injectable({
  providedIn: 'root'
})
export class StateSyncService {

  // public toolSidePannelState = new BehaviorSubject<SidePannelState>(SidePannelState.OPEN)
  public toolSidePannelState = new BehaviorSubject<boolean>(true)

  public mainContainerActiveTab = new BehaviorSubject<MainContainerTabs>(MainContainerTabs.UNDEFINED)

  public MainContainerActiveTab = this.mainContainerActiveTab.asObservable().pipe(
    filter(_ => _ !== MainContainerTabs.UNDEFINED)
  )


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

    public jobApiService: JobApiService
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

