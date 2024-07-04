import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BaseFieldComponent } from 'src/app/reusable-components/common/abstract/BaseFormComponent';

@Component({
  selector: 'app-form-text',
  templateUrl: './form-text.component.html',
  styleUrls: ['./form-text.component.scss']
})
export class FormTextComponent extends BaseFieldComponent  implements OnInit {


  placeholder = ''
  


  constructor(private fb: FormBuilder) { 
    super()

  }

  ngOnInit() {
  }

}
