import { HttpClient, HttpHeaders, HttpEventType, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LOG_SERVICE_URL } from '../reusable-components/common/shared/Constants';


const THROTTLE_CONNECTION = false
const url = LOG_SERVICE_URL + 'api/v2/asset'
const baseurl = LOG_SERVICE_URL + 'api/v2/'



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

    return this.http.get(`${url}/host`, {
      "headers": headers,
      responseType: 'text'
    })
  }



  buildTool(ip_address) {
    return this.http.post(`${url}/host`, {
      value: ip_address
    })
  }




}
