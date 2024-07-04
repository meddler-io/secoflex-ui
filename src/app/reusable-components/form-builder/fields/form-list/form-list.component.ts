import { Component, OnInit } from '@angular/core';
import { BaseFieldComponent } from 'src/app/reusable-components/common/abstract/BaseFormComponent';

@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.component.html',
  styleUrls: ['./form-list.component.scss']
})
export class FormListComponent extends BaseFieldComponent  implements OnInit {

  

  ngOnInit() {
  }

}
