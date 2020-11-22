import { Component, OnInit } from '@angular/core';
import { BaseFieldComponent } from 'src/app/reusable-components/common/abstract/BaseFormComponent';

@Component({
  selector: 'app-field-domain',
  templateUrl: './field-domain.component.html',
  styleUrls: ['./field-domain.component.scss']
})
export class FieldDomainComponent extends BaseFieldComponent  implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
