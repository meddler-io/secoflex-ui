import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  private toolId: Subject<string> = new BehaviorSubject<string>('dfault');

  public get ToolId(): Observable<string> {
    return this.toolId
      .asObservable()
  
  }

  public SetToolId(id: string) {
    console.log('SetToolId')
    this.toolId.next(id)
  }


  constructor() { }
}
