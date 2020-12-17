import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tool-screen',
  templateUrl: './tool-screen.component.html',
  styleUrls: ['./tool-screen.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,

})
export class ToolScreenComponent implements OnInit {

  direction = 'horizontal'
  constructor() { }

  ngOnInit(): void {
  }

}
