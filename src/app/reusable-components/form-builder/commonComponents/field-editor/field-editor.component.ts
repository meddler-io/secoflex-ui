import { Component, OnInit, Input, ComponentFactoryResolver, ViewChild, ViewContainerRef, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { ApiService } from 'src/app/reusable-components/common/services/api.service';
import { tap, filter, map, flatMap, reduce, partition, take } from 'rxjs/operators';
import { FormFieldComponents } from 'src/app/reusable-components/common/abstract/FormFieldComponents';
import { TestComponentComponent } from '../test-component/test-component.component';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { PropertySchema } from 'src/app/reusable-components/common/schemas/PropertySchema';
import { property, pick } from 'lodash-es';
import { Properties } from 'src/app/reusable-components/unittest/MockDataset';

@Component({
  selector: 'app-field-editor',
  templateUrl: './field-editor.component.html',
  styleUrls: ['./field-editor.component.scss']
})
export class FieldEditorComponent implements OnInit {


  private _field_schema_id$ = new BehaviorSubject(undefined);

  private _field_schema_id = this._field_schema_id$.asObservable()

  @ViewChild("componentTemplate", { read: ViewContainerRef, static: true }) componentTemplate: ViewContainerRef

  @Output('getProperties') properties = new BehaviorSubject<PropertySchema[]>([])

  propertyDiff = new Subject<PropertySchema>()


  type: string;
  identifier: string;
  field_schema_data = {}



  @Input('field_id') set setFieldId(value: string) {

    this._field_schema_id$.next(value)
    return


  };

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private apiService: ApiService

  ) { }




  render(field_id: string, savedProperties: PropertySchema[]) {
    const testComponent = this.componentFactoryResolver.resolveComponentFactory(TestComponentComponent);
    const viewContainerRef = this.componentTemplate

    viewContainerRef.clear()
    let testComponent$ = viewContainerRef.createComponent(testComponent);

    let propertyOnChangeSubscription = this
      .propertyDiff
      .asObservable()
      .pipe(tap(property => {
        testComponent$.instance.onPropertyChange(property)
      }))
      .subscribe()
    // testComponent$.instance.dragEventListener$ = this.dragEventListener$.asObservable()
    testComponent$.instance.field_id = field_id


    testComponent$.onDestroy(_ => {
      propertyOnChangeSubscription.unsubscribe()
      this.properties.next([])
    })

    testComponent$.instance.properties$.asObservable()
      .pipe(map(properties => {
        properties.forEach((property, index) => {
          let matchProp = savedProperties.find(prop => (prop.property_identifier == property.property_identifier && prop.property_tyoe == property.property_tyoe))
          if (matchProp) {
            properties[index].property_default_value = matchProp.property_default_value
          }
        })
        return properties

      }))
      .subscribe(data => {
        this.properties.next(data)
      })


    // testComponent$.instance.injectComponent(component)
    testComponent$
      .instance
      .destroy$
      .pipe(map(_ => {
        // return this.apiService.deleteFieldSchemaById(field_id, this.form_schema_id)
      }),
        // flatMap(_ => _),
      )
      .pipe(filter(val => val['deleted'] == true))
      .subscribe(_ => {
        console.log("Destroying permanently")
        testComponent$.destroy()
      })


  }

  ngOnInit(): void {



    this
      ._field_schema_id
      .pipe(
        filter(_ => !!_),
        map(value => {

          return this
            .apiService
            .getFieldSchemaById(value)
            .pipe(
              map(data => {
                this.field_schema_data = data;
                this.type = FormFieldComponents.getComponent(data.component_type).title
                return data.properties
              })
              ,
              map(_ => (_ === undefined || _ === null) ? [] : _),
              tap(_ => {
                console.log('ngAfterViewInit', _)

                this.render(value, _)
              })
            )

        }
        )
        , flatMap(_ => _)
      )
      .subscribe()


  }

  onPropertyChange(newProp: PropertySchema) {


    this
      .properties

      .pipe(
        take(1),
        map(properties => {
          properties.forEach((property, _index) => {
            if (property.property_identifier == newProp.property_identifier) {
              properties[_index] = newProp
            }
          })
          return properties
        }
        )

        ,
        tap(properties => {
          this.properties.next(properties)
          this.propertyDiff.next(newProp)

        })
      )
      .subscribe()


    // this.properties.next
  }


  save(field_id): Observable<any> {
    return this
      .properties
      .asObservable()
      .pipe(
        filter(_ => !!_),
        take(1),
        map(properties => {
          return this.apiService.saveFieldProperties(field_id, properties)
        }),

        flatMap(_ => _),
        tap(properties => {
          console.log('onSave')

          console.debug(properties)

        }))

  }
}
