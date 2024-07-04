import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { BaseFieldComponent } from 'src/app/reusable-components/common/abstract/BaseFormComponent';
import { PropertySchema, PropertyType } from 'src/app/reusable-components/common/schemas/PropertySchema';
import { SuperCall } from 'typescript';

@Component({
  selector: 'app-form-select',
  templateUrl: './form-select.component.html',
  styleUrls: ['./form-select.component.scss']
})
export class FormSelectComponent extends BaseFieldComponent implements OnInit {




  _properties = {
    ...super._properties,
    ...{
      value: 'This is the value',
      editable: true,
      toolbar: true,
      report: true,
      required: true,
    }

  }


  possibleOptions: { name: string, value: string }[] = [
    { name: 'Sample Input', value: 'value' }
  ]




  ngOnInit() {
  }

  add(key, value) {
    this.possibleOptions.push({ name: key.value, value: value.value })
  }

  propertyTransfoermer(): { [identifier: string]: PropertySchema } {



    let possibleOptionProperties: PropertySchema = {
      property_identifier: 'options',
      property_name: 'Possible Options',
      property_tyoe: PropertyType.CHIPS,
      property_default_value: this._properties.report
    }




    return { ...super.propertyTransfoermer(), possibleOptionProperties };
  }
  getProperties() {
    return Object.values(this.propertyTransfoermer())
  }


}
