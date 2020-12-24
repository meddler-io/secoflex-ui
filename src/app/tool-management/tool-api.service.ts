import { HttpClient, HttpHeaders, HttpEventType, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { API_SERVICE_URL, LOG_SERVICE_URL } from '../reusable-components/common/shared/Constants';


const THROTTLE_CONNECTION = false
const url = API_SERVICE_URL + 'api/v2'
const logUrl = LOG_SERVICE_URL + 'api/v2/'



@Injectable({
  providedIn: 'root'
})
export class ToolApiService {


  constructor(
    private http: HttpClient
  ) {


  }


  getLogs(identifier: string, lines: number, x_seek: number = 0) {


    let logSubject

    let headers = new HttpHeaders({
      "X-Id": identifier,
      "X-Lines": lines.toString(),
      "X-Seek": 0 + '',
    })

    return this.http.get(`${logUrl}/tool/host`, {
      "headers": headers,
      responseType: 'text'
    })
  }


  createTool(alias, name, description) {
    return this.http.post(`${url}/tool`, {
      alias: alias,
      name: name,
      description: description
    })
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
