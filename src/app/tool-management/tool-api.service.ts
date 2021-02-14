import { HttpClient, HttpHeaders, HttpEventType, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';



import { BehaviorSubject, defer, EMPTY, from, Observable, of, Subject, Subscription } from 'rxjs';
import { delay, expand, filter, finalize, flatMap, map, repeat, share, switchMap, takeUntil, takeWhile, tap } from 'rxjs/operators';
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


  getLogs(identifier: string, lines: number, pauseEventSubject$: BehaviorSubject<LOG_STREAM_STATUS>, throttleDelay: number) {

    let count = 5
    let seek: number = 0
    let fileSize: number = -1
    let logStramSubject = new Subject();
    let apiSubscription: Subscription;

    return defer(() => {



      pauseEventSubject$.pipe().subscribe((pause: LOG_STREAM_STATUS) => {



        let apiReq = of(EMPTY).pipe(
          delay(throttleDelay)
          ,
          switchMap(_ => {

            let headers = new HttpHeaders({
              "X-Id": identifier,
              "X-Lines": lines.toString(),
              "X-Seek": seek + '',
            })

            return this.http.get(`${logUrl}/tool/host`, {
              "headers": headers,
              observe: 'response',
              responseType: 'text',
            }).pipe(
              tap(d => {
                let x_file_range = d.headers.get('X-File-Range')
                let x_file_size = d.headers.get('X-File-Size')

                if (x_file_range == null || x_file_size == null) {
                  throw ("Error processing")
                  return

                }

                let offset = x_file_range.split('-')[1]
                seek = parseInt(offset)
                fileSize = parseInt(x_file_size)
                console.log(offset, fileSize,)

              }),
              // map(d => `${count}: ${d.body}`),
              map(d => `${d.body}`),


            )
          }
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

              if (fileSize != -1) {
                if (seek >= fileSize) {
                  console.log('closing')
                  logStramSubject.complete()
                  apiSubscription.unsubscribe()
                  return
                }
              }




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




  runTool(id, data) {
    return this.http.post(`${url}/build/run/${id}`, data)
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

  updateBuildConfig(build_id: string, data) {
    return this.http.put(`${url}/build/config/${build_id}`, data
    )
  }

  getBuildConfig(build_id: string) {
    return this.http.get(`${url}/build/config/${build_id}`)
  }

  getBuilds(refrence_id: string) {
    return this.http.get(`${url}/build/${refrence_id}`)
  }

  getBuildExecoturs(refrence_id: string) {
    return this.http.get(`${url}/build/executors/${refrence_id}`)
  }


}
