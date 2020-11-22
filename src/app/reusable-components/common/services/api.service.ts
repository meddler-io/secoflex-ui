import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_SERVICE_URL } from '../shared/Constants';
import { tap, delay, mergeMap, delayWhen, filter } from 'rxjs/operators';
import { Subject, BehaviorSubject, iif, interval, of } from 'rxjs';
import { Datastore } from './datastore';
import { FieldSchema } from '../abstract/BaseFieldSchema';
import { FieldType } from '../schemas/FieldSchema';
import { PropertySchema } from '../schemas/PropertySchema';


const THROTTLE_CONNECTION = false
const url = API_SERVICE_URL + 'api/v2/'


@Injectable({
  providedIn: 'root'
})
export class ApiService {







  constructor(
    private http: HttpClient,


  ) {


    this.initData()
  }

  initData() {
    this.fetchFiles()
    this.fetchFormSchema()
  }

  createFile(filename) {
    return this.http.post(url + 'file/create', {
      filename: filename,
    })
  }

  deleteFile(fileid) {
    return this.http.delete(url + `file/${fileid}`)
      .pipe(tap(_ => {
        this.fetchFiles()
      }))
  }


  get getFiles() {
    return Datastore.Files.asObservable()
  }


  get getFormSchemas() {
    return Datastore.FormSchema.asObservable()
  }

  fetchFiles() {
    this.http.get<{ files: any[] }>(url + 'file')
      .pipe(tap(response => {
        let files = response.files
        Datastore.Files.next(files)
      }))
      .subscribe()
  }



  createFormSchema(form_name) {
    return this.http.post(url + 'form/schema', {
      form_name: form_name,
    })
      .pipe(tap(response => {
        this.fetchFormSchema()
      }))

  }

  fetchFormSchemaById(form_is: string) {
    return this.http.get(url + `form/schema/${form_is}`)
  }

  fetchFormSchema() {
    return this.http.get<{ form_schemas: [] }>(url + 'form/schema', {

    })
      .pipe(tap(response => {
        let form_schemas = response.form_schemas
        Datastore.FormSchema.next(form_schemas)
      }))
      .subscribe()

  }

  createFieldSchema(form_id, component_type) {
    return this.http.post(url + `form/${form_id}/field/schema`, {
      form_id: form_id,
      component_type: component_type
    })

  }

  getFieldSchemaById(field_id) {
    return this.http.get<{ component_type: FieldType, title?: string, subtitle?: string, placeholder?: string, keywords?: string[] , properties: PropertySchema[] }>(url + `field/schema/${field_id}`)

  }


  deleteFieldSchemaById(field_id, form_id) {
    return this
      .http
      .delete(url + `form/${form_id}/field/${field_id}`)
      .pipe(filter(val => !!val['updated']))

  }

  updateFieldSchemaById(field_id, updated_data: { title?: string, subtitle?: string, placeholder?: string, keywords?: string[], published?: boolean, identifier?: string }) {
    return this.http.put(url + `field/schema/${field_id}`, updated_data)

  }
  saveFieldProperties(field_id, updated_data: PropertySchema[]) {
    return this.http.post(url + `field/schema/properties/${field_id}`, updated_data)

  }
}
