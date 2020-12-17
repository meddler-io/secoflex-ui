import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tool-build-variants',
  templateUrl: './tool-build-variants.component.html',
  styleUrls: ['./tool-build-variants.component.scss']
})
export class ToolBuildVariantsComponent implements OnInit {

  loop = [
    1,1,1,1,11,1,1,1,2,312,3,213,12,312
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
