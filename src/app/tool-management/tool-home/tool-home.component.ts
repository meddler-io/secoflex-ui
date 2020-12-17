import { Component, OnInit } from '@angular/core';
import { ToolApiService } from '../tool-api.service';

import { ToolStoreService } from '../tool-store.service';
import { basicAnimations } from 'src/app/reusable-components/common/animations/basic-animations';
import { ChangeDetectionStrategy } from '@angular/compiler/src/core';

@Component({
  selector: 'app-tool-home',
  templateUrl: './tool-home.component.html',
  styleUrls: ['./tool-home.component.scss'],
  animations: [...basicAnimations,],


})
export class ToolHomeComponent implements OnInit {

  testLogs = ""

  readOnly = false;
  mode = 'markdown';
  options: any = {
    // lineNumbers: true,
    mode: this.mode,
  };

  toolMenu = this.toolStoreService.getToolMenu

  constructor(
    private toolStoreService: ToolStoreService,

  ) { }

  ngOnInit(): void {



  }

}
