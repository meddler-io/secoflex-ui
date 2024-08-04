import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormGroup, FormControl, ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';
import { FormRichTextComponent } from '../fields/form-rich-text/form-rich-text.component';
import { BaseFieldComponent } from '../../common/abstract/BaseFormComponent';
import { PropertyType, PropertySchema } from '../../common/schemas/PropertySchema';
import { ActiveFormFieldService } from '../../common/services/active-form-field.service';
import { filter, tap, map } from 'rxjs/operators';

@Component({
  selector: 'app-form-ipaddress',
  templateUrl: './form-ipaddress.component.html',
  styleUrls: ['./form-ipaddress.component.scss']
})
export class FormIpaddressComponent extends BaseFieldComponent implements OnInit {



  ipPattern = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/




  formGroup: FormGroup = this.fb.group({


    ipaddresses: this.fb.array([

      this.fb.group({
        ip_address: new FormControl('', {

          validators: [Validators.pattern(this.ipPattern)]
        })
      })
    ]),
  },
    {
      validators: [this.uniqueIpAddressValidator()]
    }

  );






  constructor(private fb: FormBuilder,
    private activeFormFieldService: ActiveFormFieldService
  ) {

    super()


    this._properties = {
      ...this._properties,
      ...{
        required: false,
        allow_user_to_add: true,
        size: 'small',
        placeholder: '127.0.0.1'
      }

    }

  }



  get ipaddresses(): FormArray {
    return (this.formGroup.get("ipaddresses") as FormArray)
  }


  deleteIpAddress(index) {
    this.ipaddresses.removeAt(index)
  }



  addIpAddress() {
    this.ipaddresses.push(this.fb.group({
      ip_address: new FormControl('', {

        validators: [Validators.pattern(this.ipPattern), Validators.required]
      })
    }))
  }



  clearControlUniqueIpError(control: AbstractControl): void {
    const err = control.errors;
    if (err) {
      delete err['notUnique'];
      if (!Object.keys(err).length) {
        control.setErrors(null);
      } else {
        control.setErrors(err);
      }
    }
  }




  public uniqueIpAddressValidator(): ValidatorFn {
    return (group: FormGroup): ValidationErrors => {

      let ip_addresses = group.get('ipaddresses') as FormArray;


      for (let i = 0; i < ip_addresses.controls.length; i++) {

        if (ip_addresses.controls[i].get('ip_address').valid || (ip_addresses.controls[i].get('ip_address').invalid && ip_addresses.controls[i].get('ip_address').getError('notUnique')))

          for (let j = i + 1; j < ip_addresses.controls.length; j++) {

            if (ip_addresses.controls[j].get('ip_address').valid || (ip_addresses.controls[i].get('ip_address').invalid && ip_addresses.controls[j].get('ip_address').getError('notUnique')))

              if (ip_addresses.controls[i].get('ip_address').value == ip_addresses.controls[j].get('ip_address').value) {

                ip_addresses.controls[i].setErrors({ notUnique: true });
                ip_addresses.controls[j].setErrors({ notUnique: true });

              } else {


                this.clearControlUniqueIpError(ip_addresses.controls[i])
                this.clearControlUniqueIpError(ip_addresses.controls[j])
              } else {


              this.clearControlUniqueIpError(ip_addresses.controls[i])
              this.clearControlUniqueIpError(ip_addresses.controls[j])
            }
          }
      }





      return;
    };
  }

  updateValidators() {
    let validators = [
      Validators.pattern(this.ipPattern)
    ]

    if (this._properties.required == true)
      validators.push(Validators.required)

    this.ipaddresses.at(0).get('ip_address').setValidators(validators)
    this.ipaddresses.at(0).get('ip_address').updateValueAndValidity()
    // this.formGroup.get('ip_address')

  }

  propertyTransfoermer(): { [identifier: string]: PropertySchema } {



    let placeholderProperty: PropertySchema = {
      property_identifier: 'placeholder',
      property_name: 'Placeholder',
      property_tyoe: PropertyType.INPUT_TEXT,
      property_default_value: this._properties.placeholder
    }

    let editableProperty: PropertySchema = {
      property_identifier: 'required',
      property_name: 'Required (Alteast one)',
      property_tyoe: PropertyType.TOGGLE_SWITCH,
      property_default_value: this._properties.required
    }

    let requiredProperty: PropertySchema = {
      property_identifier: 'allow_user_to_add',
      property_name: 'Allow user to add more',
      property_tyoe: PropertyType.TOGGLE_SWITCH,
      property_default_value: this._properties.allow_user_to_add
    }



    let customProperties: { [identifier: string]: PropertySchema } = {

      editable: editableProperty,
      required: requiredProperty,
      placeholder: placeholderProperty

    }

    return { ...super.propertyTransfoermer(), ...customProperties };
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

        ),


        tap(_ => {
          this.updateValidators()
        })




      )

      .subscribe()

  }

}
