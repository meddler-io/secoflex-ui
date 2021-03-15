import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { filter, first, share, tap } from 'rxjs/operators';

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

  public selectedJobId = new BehaviorSubject<string>(undefined)
  public SelectedJobId = this.selectedJobId.pipe(
    // filter(_ => !!_),
  )


  constructor() { }



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
