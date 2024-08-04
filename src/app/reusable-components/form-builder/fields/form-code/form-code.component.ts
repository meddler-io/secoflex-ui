import { Component, OnInit } from '@angular/core';
import { FieldSchema } from 'src/app/reusable-components/common/abstract/BaseFieldSchema';
import { BaseFieldComponent } from 'src/app/reusable-components/common/abstract/BaseFormComponent';
import { PropertySchema, PropertyType } from 'src/app/reusable-components/common/schemas/PropertySchema';
import { FormBuilder } from '@angular/forms';
import { ActiveFormFieldService } from 'src/app/reusable-components/common/services/active-form-field.service';
import { map, tap } from 'rxjs/operators';


@Component({
  selector: 'app-form-code',
  templateUrl: './form-code.component.html',
  styleUrls: ['./form-code.component.scss']
})
export class FormCodeComponent extends BaseFieldComponent implements OnInit {
 
 
  autocompleteTokens= [
    'a',
    'console'
  ]
  _properties = {
    ...this._properties,
    ...{
      editable: true,

      code: `
  import { Component, OnInit } from '@angular/core';
  import { FieldSchema } from 'src/app/reusable-components/common/abstract/BaseFieldSchema';
  import { BaseFieldComponent } from 'src/app/reusable-components/common/abstract/BaseFormComponent';
  
  @Component({
    selector: 'app-form-code',
    templateUrl: './form-code.component.html',
    styleUrls: ['./form-code.component.scss']
  })
  export class FormCodeComponent extends BaseFieldComponent  implements OnInit , FieldSchema {
  
    highlight = ''
    
    isValid(): boolean {
      throw new Error("Method not implemented.");
    }
  
    ngOnInit() {
    }
  
  }
  `

    }
  }

  isValid(): boolean {
    throw new Error("Method not implemented.");
  }


  constructor(

    private fb: FormBuilder,
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



    let editableProperty: PropertySchema = {
      property_identifier: 'editable',
      property_name: 'Editable',
      property_tyoe: PropertyType.TOGGLE_SWITCH,
      property_default_value: this._properties.editable
    }

    let codeProperty: PropertySchema = {
      property_identifier: 'code',
      property_name: 'code',
      property_tyoe: PropertyType.INPUT_TEXTAREA,
      property_default_value: this._properties.code
    }


    let customProperties: { [identifier: string]: PropertySchema } = {

      editable: editableProperty,
      code: codeProperty,

    }


    return { ...super.propertyTransfoermer(), ...customProperties };
  }


  nodes: any[] = [
    { label: 'Node 1' },
    {
        label: 'Node 2',
        expandable: true,
        expanded: true,
        children: [
          { label: 'Node 1' },
          { label: 'Node 2' },
          {
            label: 'Node 3',
            expanded: false,
            expandable: true,
            children: [
              { label: 'Node 1' },
              { label: 'Node 2' },
              { label: 'Node 3' },
              { label: 'Node 4' }
            ]
          },
          {
            label: 'Node 4',
            expandable: true,
            expanded: true,
            children: [
              { label: 'Node 1' },
              { label: 'Node 2' },
              { label: 'Node 3' },
              { label: 'Node 4' }
            ]
          }
        ]
    },
    { label: 'Node 3' },
    {
      label: 'Node 4',
      children: [
        { label: 'Node 1' },
        { label: 'Node 2' },
        { label: 'Node 3' },
        { label: 'Node 4' }
      ],
      expandable: true
    }
  ];
}
