import { HttpClient, HttpEventType, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { API_SERVICE_URL } from '../reusable-components/common/shared/Constants';


const THROTTLE_CONNECTION = false
const url = API_SERVICE_URL + 'api/v2/asset'
const baseurl = API_SERVICE_URL + 'api/v2/'


@Injectable({
  providedIn: 'root'
})
export class AssetApiService {

  constructor(
    private http: HttpClient
  ) { }


  getHosts() {
    return this.http.get(`${url}/host`)
  }

  addHost(ip_address) {
    return this.http.post(`${url}/host`, {
      value: ip_address
    })
  }



  getWeb() {
    return this.http.get(`${url}/web`)
  }

  addWeb(ip_address) {
    return this.http.post(`${url}/web`, {
      value: ip_address
    })
  }


  getRepository() {
    return this.http.get(`${url}/repository`)
  }

  addRepository(repo) {
    return this.http.post(`${url}/repository`, repo)
  }

  getDocker() {
    return this.http.get(`${url}/docker`)
  }

  addDocker(repo) {
    return this.http.post(`${url}/docker`, repo)
  }



  getDomains() {
    return this.http.get(`${url}/domain`)
  }

  addDomain(domain) {
    return this.http.post(`${url}/domain`, {
      value: domain
    })
  }


  addAndroid(app_name, package_name, file_id) {
    return this.http.post(`${url}/android`, {
      package_name: package_name,
      app_name: app_name,
      value: file_id
    })
  }

  getAndroidApps() {
    return this.http.get(`${url}/android`)
  }

  removeAndroidApps() {
    return this.http.get(`${url}/android`)
  }




  addIosApp(app_name, package_name, file_id) {
    return this.http.post(`${url}/ios`, {
      package_name: package_name,
      app_name: app_name,
      value: file_id
    })
  }

  getIosApps() {
    return this.http.get(`${url}/ios`)
  }

  createFile(filename) {
    return this.http.post(baseurl + 'file/create', {
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

    let req = this.http.post(baseurl + `file/upload?token=${token}`, formData, {
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
