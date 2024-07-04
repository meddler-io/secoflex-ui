import { Component, OnInit } from '@angular/core';
import { BaseFieldComponent } from 'src/app/reusable-components/common/abstract/BaseFormComponent';

@Component({
  selector: 'app-field-host',
  templateUrl: './field-host.component.html',
  styleUrls: ['./field-host.component.scss']
})
export class FieldHostComponent extends BaseFieldComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
