import { Component, OnInit } from '@angular/core';
import { BaseFieldComponent } from 'src/app/reusable-components/common/abstract/BaseFormComponent';

@Component({
  selector: 'app-form-enum',
  templateUrl: './form-enum.component.html',
  styleUrls: ['./form-enum.component.scss']
})
export class FormEnumComponent extends BaseFieldComponent  implements OnInit {


  
  ngOnInit() {
  }

}
