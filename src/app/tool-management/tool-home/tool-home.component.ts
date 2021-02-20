import { Component, OnInit, TemplateRef, ChangeDetectionStrategy } from '@angular/core';
import { ToolApiService } from '../tool-api.service';

import { ToolStoreService } from '../tool-store.service';
import { basicAnimations } from 'src/app/reusable-components/common/animations/basic-animations';

import { NbDialogService } from '@nebular/theme';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tool-home',
  templateUrl: './tool-home.component.html',
  styleUrls: ['./tool-home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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


  tools$ = this.toolApiService.getTools()

  constructor(
    private toolStoreService: ToolStoreService,
    private dialogService: NbDialogService,
    private toolApiService: ToolApiService

  ) { }

  ngOnInit(): void {
  }



  open(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog, {

      dialogClass: 'test',
      // backdropClass: 'test2',
      closeOnBackdropClick: false, context: 'this is some additional data passed to dialog'
    });
  }


}
