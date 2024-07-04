import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { API_SERVICE_URL } from '../shared/Constants';
import { finalize } from 'rxjs/operators';
const url = API_SERVICE_URL + 'api/v2/'


@Injectable({
  providedIn: 'root'
})
export class UploadService {



  constructor(
    private http: HttpClient,

  ) { }



  renameFile(fileid, filename) {
    return this.http.post(url + 'file/rename', {
      fileid: fileid,
      filename: filename,
    })
  }

  public upload(file: File, token: string): Observable<{
    status: boolean, progress: number, fileData?: any
  }> {
    

    // this will be the our resulting map
    let status: Observable<{
      status: boolean, progress: number, fileData?: any
    }>
    // create a new multipart-form for every file
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    // formData.append('data', 'fileUploading');


    // create a http-post request and pass the form
    // tell it to report the upload progress

    let headers = new HttpHeaders();
    // headers = headers.append('content-type', "multipart/form-data");

    let req = this.http.post(url + `file/upload?token=${token}`, formData, {
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
