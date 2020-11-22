import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { BaseFieldComponent } from 'src/app/reusable-components/common/abstract/BaseFormComponent';

@Component({
  selector: 'app-form-url',
  templateUrl: './form-url.component.html',
  styleUrls: ['./form-url.component.scss']
})
export class FormUrlComponent extends BaseFieldComponent  implements OnInit {


  customizations = {
    'multiple': true,
    'required': false,
    'allow_user_to_add': true,
    'strict_validation': true,
  }


  urlPattern = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?|^((http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/
  // urlPattern = /^https?\:\/\/[^\/\s]+(\/.*)?$/


  formGroup: FormGroup = this.fb.group({


    urls: this.fb.array([

      this.fb.group({
        url: new FormControl('', {

          validators: [Validators.pattern(this.urlPattern), Validators.required]
        })
      })
    ]),
  });

  constructor(private fb: FormBuilder) {
    super()
  }

  ngOnInit() {
  }

  get urls(): FormArray {
    return (this.formGroup.get("urls") as FormArray)
  }


  deleteUrl(index) {
    this.urls.removeAt(index)
  }
  addUrl() {
    this.urls.push(this.fb.group({
      url: new FormControl('192.168.2.2', {

        validators: [Validators.pattern(this.urlPattern)]
      })
    }))
  }


}
