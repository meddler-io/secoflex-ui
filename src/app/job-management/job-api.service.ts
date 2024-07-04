import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Subscription, interval, defer, of, EMPTY } from 'rxjs';
import { delayWhen, switchMap, tap, map, expand } from 'rxjs/operators';
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

export enum LogSource {
  IMAGE_BUILDER = 'image_builder',
  JOB = 'job'
}


@Injectable({
  providedIn: 'root'
})
export class JobApiService {

  constructor(
    private http: HttpClient
  ) { }

  // 
  getJobStatus(id: string) {
    return this.http.get(`${url}/job/status/${id}`)

  }
  getJob(id: string) {
    return this.http.get(`${url}/job/${id}`)

  }

  getJobs(id: string) {
    return this.http.get(`${url}/jobs/${id}`)

  }

  getAllJobs() {
    return this.http.get(`${url}/jobs`)

  }

  getBuildExecutorStatus(refrence_id: string) {
    return this.http.get(`${url}/build/executors/status/${refrence_id}`)
  }


  getLogs(identifier: string, lines: number, pauseEventSubject$: BehaviorSubject<LOG_STREAM_STATUS>, throttleDelay: number) {


    let count = 5
    let seek: number = 0
    let fileSize: number = -1
    let logStramSubject = new Subject();
    let apiSubscription: Subscription;

    let ThrottleDelay = 0


    let getDelay = () => {
      // console.log('getDelay', ThrottleDelay)

      let delatFunc = interval(ThrottleDelay)

      ThrottleDelay = throttleDelay
      return delatFunc

    }


    return defer(() => {

      pauseEventSubject$.pipe().subscribe((pause: LOG_STREAM_STATUS) => {



        let apiReq = of(EMPTY).pipe(
          delayWhen(() => {
            return getDelay()

          }),


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
            })


              .pipe(
                tap(d => {
                  let x_file_range = d.headers.get('X-File-Range')
                  let x_file_size = d.headers.get('X-File-Size')

                  if (x_file_range == null || x_file_size == null) {
                    // throw ("Error processing")

                    return

                  }

                  let offset = x_file_range.split('-')[1]
                  seek = parseInt(offset)
                  fileSize = parseInt(x_file_size)
                  // console.log(offset, fileSize,)

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
                  // console.log('closing')
                  // logStramSubject.complete()
                  // apiSubscription.unsubscribe()
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
          apiSubscription.unsubscribe()
          // logStramSubject.complete()
          return
        }

      })

      // console.log('sibome subscribed')
      return logStramSubject;
    });
  }

  getTool(tool_id) {
    return this.http.get(`${url}/tool/${tool_id}`)
  }

  getTools() {
    return this.http.get(`${url}/tool`)
  }

}

