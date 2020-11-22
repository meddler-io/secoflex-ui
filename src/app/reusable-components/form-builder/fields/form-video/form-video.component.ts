import { Component, OnInit } from '@angular/core';
import { BaseFieldComponent } from 'src/app/reusable-components/common/abstract/BaseFormComponent';

@Component({
  selector: 'app-form-video',
  templateUrl: './form-video.component.html',
  styleUrls: ['./form-video.component.scss']
})
export class FormVideoComponent extends BaseFieldComponent  implements OnInit {

  

  ngOnInit() {
  }

}
