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
                  // throw ("Error processing")

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


  createTool(data) {
    return this.http.post(`${url}/tool`, data)
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

  createBuild(build_type: string, data: {}) {
    return this.http.post(`${url}/build/${build_type}`, data
    )
  }

  editBuild(build_id: string, build_type: string, data: {}) {
    return this.http.put(`${url}/build/${build_type}/${build_id}`, data
    )
  }

  updateBuildConfig(build_id: string, data) {
    return this.http.put(`${url}/build/config/${build_id}`, data
    )
  }


  getBuild(tool_id: string, build_id: string) {
    return this.http.get(`${url}/build/${tool_id}/${build_id}`)
  }

  getBuildConfig(build_id: string) {
    return this.http.get(`${url}/build/config/${build_id}`)
  }

  getBuilds(refrence_id: string) {
    return this.http.get(`${url}/builds/${refrence_id}`)
  }

  getBuildExecoturs(refrence_id: string) {
    return this.http.get(`${url}/build/executors/${refrence_id}`)
  }

  getBuildUploadUrl(refrence_id: string, file_name: string) {
    return this.http.post(`${url}/build/upload/init`, {
      id: refrence_id,
      filename: file_name
    })
  }

  getBuildDownloadUrl(data: {}) {
    return this.http.post(`${url}/build/download/init`, data)
  }

  // 

  public uploadWithUrl(file: File, url: string): Observable<{
    status: boolean, progress: number, fileData?: any
  }> {


    // this will be the our resulting map
    let status: Observable<{
      status: boolean, progress: number, fileData?: any
    }>
    // create a new multipart-form for every file
    const formData: FormData = new FormData();
    console.log('file_debug', file.name)
    console.log('file_debug', file.size)
    formData.append('files', file);
    // formData.append('data', 'fileUploading');


    // create a http-post request and pass the form
    // tell it to report the upload progress

    let headers = new HttpHeaders();
    // headers = headers.append('content-type', "multipart/form-data");


    let req = this.http.put(url, file, {
      reportProgress: true,
      observe: 'events',
      headers: headers
    })

    // create a new progress-subject for every file
    const progress = new Subject<{
      status: boolean, progress: number, fileData?: any
    }>()

    // send the http-request and subscribe for progress-updates
    req.pipe(finalize(() => console.log('complete...'))).subscribe(event => {

      if (event.type === HttpEventType.UploadProgress) {
        // calculate the progress percentage
        const percentDone = Math.round(100 * event.loaded / event.total);
        // pass the percentage into the progress-stream
        progress.next({ status: false, progress: percentDone });
      } else if (event instanceof HttpResponse) {
        // Close the progress-stream if we get an answer form the API
        // The upload is complete
        progress.next({ status: true, progress: 100, fileData: event.body })
        progress.complete();
      }

    });

    // Save every progress-observable in a map of all observables
    status = progress.asObservable()

    // return the map of progress.observables
    return status;
  }


}
