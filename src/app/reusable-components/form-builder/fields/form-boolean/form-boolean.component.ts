import { Component, OnInit } from '@angular/core';
import { BaseFormComponent, BaseFieldComponent } from 'src/app/reusable-components/common/abstract/BaseFormComponent';
import { PropertySchema, PropertyType } from 'src/app/reusable-components/common/schemas/PropertySchema';
import { ActiveFormFieldService } from 'src/app/reusable-components/common/services/active-form-field.service';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-form-boolean',
  templateUrl: './form-boolean.component.html',
  styleUrls: ['./form-boolean.component.scss']
})
export class FormBooleanComponent extends BaseFieldComponent implements OnInit {


  _properties = {
    ...this._properties,
    ...{

      label: 'Click here to toggle?',
      default_value: false,
    }
  }


  constructor(
    private activeFormFieldService: ActiveFormFieldService
  ) {

    super()

  }


  ngOnInit() {

    this
      .activeFormFieldService
      .properties$
      .pipe(

        map(_ => (_ === undefined || _ === null) ? [] : _),


        tap(properties => {
          console.debug('onPropertyChange', properties)
          properties.forEach(prop => {
            this.onPropertyChange(prop)

          })
        }

        )



      )

      .subscribe()

  }

  propertyTransfoermer(): { [identifier: string]: PropertySchema } {



    let labelProperty: PropertySchema = {
      property_identifier: 'label',
      property_name: 'Label',
      property_tyoe: PropertyType.INPUT_TEXT,
      property_default_value: this._properties.label
    }

    let defaultvalueProperty: PropertySchema = {
      property_identifier: 'default_value',
      property_name: 'default_value',
      property_tyoe: PropertyType.INPUT_CHECKBOX,
      property_default_value: this._properties.default_value
    }


    let customProperties: { [identifier: string]: PropertySchema } = {

      label: labelProperty,
      default_value: defaultvalueProperty,

    }


    return { ...super.propertyTransfoermer(), ...customProperties };
  }

}
