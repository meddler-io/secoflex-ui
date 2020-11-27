import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { NavbarState } from './navbar-list-item/navbar-list-item.component';

@Injectable({
  providedIn: 'root'
})
export class NavbarSharedService {

  activeState$ = new BehaviorSubject<NavbarState>(undefined)

  get getState() {
    return this
      .activeState$
      .asObservable()
      .pipe(filter(_ => !!_))
  }

  set setState(state: NavbarState) {
    this.activeState$.next(state)
  }

  constructor() { }
}
