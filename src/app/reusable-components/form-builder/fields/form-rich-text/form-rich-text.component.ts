import { Component, OnInit, ViewChild, AfterContentChecked, ChangeDetectorRef } from '@angular/core';
import { BASIC_PROPERTIES } from 'src/app/reusable-components/common/shared/Configuration';
import { BaseFieldComponent } from 'src/app/reusable-components/common/abstract/BaseFormComponent';
import { PropertySchema, PropertyType } from 'src/app/reusable-components/common/schemas/PropertySchema';
import { basicAnimations } from 'src/app/reusable-components/common/animations/basic-animations';
import { EditorComponent } from '@tinymce/tinymce-angular';
import { ActiveFormFieldService } from 'src/app/reusable-components/common/services/active-form-field.service';
import { tap, filter } from 'rxjs/operators';








@Component({
  selector: 'app-form-rich-text',
  templateUrl: './form-rich-text.component.html',
  styleUrls: ['./form-rich-text.component.scss']
})
export class FormRichTextComponent extends BaseFieldComponent implements OnInit, AfterContentChecked {



  @ViewChild('editorComponent') editorComponent: EditorComponent;


  editorLoading = true;

  editorHeight = 500

  loadComponent = false;


  _properties = {
    ...this._properties,
    ...{
      value: 'This is the value',
      editable: true,
      toolbar: true,
      report: true,
      required: true,
    }

  }


  config = {
    height: this.editorHeight,
    menubar: false,
    icons: 'thin',
    skin: 'snow',
    resize: false,
    placeholder: 'Ask a question or post an update...',
    plugins: [
      'advlist autolink lists link image charmap print codesample',
      'preview anchor searchreplace visualblocks code',
      'fullscreen insertdatetime media table paste',
      'help wordcount'
    ],
    toolbar:
      'undo redo | formatselect | bold italic | \
      alignleft aligncenter alignright alignjustify | \
      bullist numlist outdent indent | codesample',


    content_style: `
@import url('https://fonts.googleapis.com/css2?family=Warnes&family=Roboto:wght@300&display=swap');

body {
    // background-color: #2f3742;
    // color: #dfe0e4;
}

p {
    // font-family: 'Roboto', sans-serif;
}

h2 {
    // font-size: 32px;
    // text-align: center;
    // font-family: 'Warnes', cursive;
    // color: #fff;
    // text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #0073e6, 0 0 20px #0073e6, 0 0 25px #0073e6, 0 0 30px #0073e6, 0 0 35px #0073e6;
}
  `,


  }

  constructor(
    private cd: ChangeDetectorRef,
    private activeFormFieldService: ActiveFormFieldService


  ) {
    super();



  }
  ngAfterContentChecked(): void {
    this.cd.detectChanges();

  }






  ngOnInit() {
    this
      .activeFormFieldService
      .properties$
      .pipe(
        filter(_=>!!_),
        tap(properties => {
        console.debug('onPropertyChange', properties)
        properties.forEach(prop => {
          this.onPropertyChange(prop)

        })
      }))
      .subscribe()

  }

  onInitEditor() {
    this.editorLoading = false;

    // this.editorComponent.setDisabledState(!this._properties.editable)
  }


  propertyTransfoermer(): { [identifier: string]: PropertySchema } {




    let reportProperty: PropertySchema = {
      property_identifier: 'report',
      property_name: 'Include in report',
      property_tyoe: PropertyType.TOGGLE_SWITCH,
      property_default_value: this._properties.report
    }

    let editableProperty: PropertySchema = {
      property_identifier: 'editable',
      property_name: 'Editable',
      property_tyoe: PropertyType.TOGGLE_SWITCH,
      property_default_value: this._properties.editable
    }

    let requiredProperty: PropertySchema = {
      property_identifier: 'required',
      property_name: 'Required',
      property_tyoe: PropertyType.TOGGLE_SWITCH,
      property_default_value: this._properties.required
    }


    let customProperties: { [identifier: string]: PropertySchema } = {


      editable: editableProperty,

      required: requiredProperty,
      report: reportProperty,

    }

    return { ...super.propertyTransfoermer(), ...customProperties };
  }


  // propertyReducer( properties: PropertySchema[] ){
  // return []
  // }


  getProperties() {
    return Object.values(this.propertyTransfoermer())
  }





}
