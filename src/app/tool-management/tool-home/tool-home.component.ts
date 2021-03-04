import { Component, OnInit, TemplateRef, ChangeDetectionStrategy, Inject } from '@angular/core';
import { ToolApiService } from '../tool-api.service';

import { ToolStoreService } from '../tool-store.service';
import { basicAnimations } from 'src/app/reusable-components/common/animations/basic-animations';

import { NbDialogService } from '@nebular/theme';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import { DrawerDirection } from 'src/app/drawer/drawer-direction.enum';
import { DrawerService } from 'src/app/drawer/drawer.service';

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
    private toolApiService: ToolApiService,
    private drawerMngr: DrawerService,
    @Inject(DOCUMENT) private document: Document,

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


  openDrawer(template, context?: any, direction = DrawerDirection.Left, size = '50%', closeOnOutsideClick = true, isRoot = true, parentContainer?: any) {

    if (!context)
      context = {}


    console.log('context', context)
    const zIndex = 1000;
    const cssClass = 'backdrop_color'
    // const cssClass = 'cdk-overlay-2'
    this.document.body.classList.add('cdk-global-scrollblock')

    this.drawerMngr.create({
      direction,
      template,
      // size,
      context: context,
      closeOnOutsideClick,
      parentContainer,
      isRoot,
      zIndex,
      cssClass,


    }).onDestroy(() => {

      this.document.body.classList.remove('cdk-global-scrollblock')

    });
  }

}
