import { HttpClient, HttpHeaders, HttpEventType, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';


import { BehaviorSubject, defer, EMPTY, from, Observable, of, Subject, Subscription } from 'rxjs';
import { delay, expand, filter, finalize, flatMap, map, repeat, share, switchMap, takeUntil, takeWhile } from 'rxjs/operators';
import { API_SERVICE_URL, LOG_SERVICE_URL } from '../reusable-components/common/shared/Constants';


const THROTTLE_CONNECTION = false
const url = API_SERVICE_URL + 'api/v2'
const logUrl = LOG_SERVICE_URL + 'api/v2/'

export enum LOG_STREAM_STATUS {
  PAUSE,
  RESUME,
  START,
  STOP

}



@Injectable({
  providedIn: 'root'
})
export class ToolApiService {


  constructor(
    private http: HttpClient
  ) {


  }


  getLogs(identifier: string, lines: number, pauseEventSubject$: BehaviorSubject<LOG_STREAM_STATUS>) {

    let count = 5
    let logStramSubject = new Subject();
    let apiSubscription: Subscription;
    // logStramSubject.
    let headers = new HttpHeaders({
      "X-Id": identifier,
      "X-Lines": lines.toString(),
      "X-Seek": 0 + '',
    })




    return defer(() => {

      pauseEventSubject$.pipe().subscribe((pause: LOG_STREAM_STATUS) => {
        let apiReq = of(EMPTY).pipe(
          delay(2000)
          ,
          switchMap(_ =>
            this.http.get(`${logUrl}/tool/host`, {
              "headers": headers,
              responseType: 'text'
            }).pipe(
              map(d => `${count}: ${d}`),

            ),

          )
        )

        if (pause == LOG_STREAM_STATUS.RESUME) {

          if (apiSubscription)
            apiSubscription.unsubscribe()

          apiSubscription = apiReq
            .pipe(
              expand(_ => {
                count++
                return apiReq
              })
            )
            .subscribe(d => {
              logStramSubject.next(d)


            })
        } else if (pause == LOG_STREAM_STATUS.PAUSE) {
          if (apiSubscription) {
            apiSubscription.unsubscribe()
            apiSubscription = undefined

          }


        } else if (pause == LOG_STREAM_STATUS.STOP) {
          console.log('stopped')
          logStramSubject.complete()
        }

      })

      // console.log('sibome subscribed')
      return logStramSubject;
    });
  }


  createTool(alias, name, description) {
    return this.http.post(`${url}/tool`, {
      alias: alias,
      name: name,
      description: description
    })
  }




  runTool(data) {
    return this.http.post(`${url}/tool/run`, data)
  }

  getTool(id: string) {
    return this.http.get(`${url}/tool/${id}`)
  }

  getTools() {
    return this.http.get(`${url}/tool`)
  }

  buildTool(build_type: string, data) {
    return this.http.post(`${url}/build/${build_type}`, data
    )
  }

  getBuilds(refrence_id: string) {
    return this.http.get(`${url}/build/${refrence_id}`)
  }


}
