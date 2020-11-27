import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NavbarSharedService {

  activeState$ = new BehaviorSubject(undefined)

  get getState() {
    return this
      .activeState$
      .asObservable()
      .pipe(filter(_ => !!_))
  }

  set setState(state: string) {
    this.activeState$.next(state)
  }

  constructor() { }
}
