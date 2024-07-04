import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PropertySchema } from '../schemas/PropertySchema';
import { filter, map } from 'rxjs/operators';
import { BaseFormCommonProperties } from '../abstract/BaseFormComponent';

@Injectable({
  providedIn: 'root'
})
export class ActiveFormFieldService {

  _baseCommonProperties = new BaseFormCommonProperties();

  properties$ = new BehaviorSubject<PropertySchema[]>(undefined)
  selectedField$ = new BehaviorSubject<String>(undefined)

  commonProperties$ = this.properties$.pipe(

    filter(_ => !!_),
    map(properties => {
      return properties.filter(property => property.property_identifier in this._baseCommonProperties);
    })

  )



  constructor() { }

  publishSelectedField(val) {
    console.log('publishSelectedField', val)
    this.properties$.next(undefined)
    this.selectedField$.next(val)
  }


  publishSelectedFieldProperties(val) {
    this.properties$.next(val)
  }
}

