import { DOCUMENT } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, Input, OnInit } from '@angular/core';
import { DrawerDirection } from 'src/app/drawer/drawer-direction.enum';
import { DrawerService } from 'src/app/drawer/drawer.service';
import { ToolApiService } from '../tool-api.service';

@Component({
  selector: 'app-built-image-list',
  templateUrl: './built-image-list.component.html',
  styleUrls: ['./built-image-list.component.scss']
})
export class BuiltImageListComponent implements OnInit {

  @Input('tool_id') tool_id
  images = []

  constructor(
    private toolApiService: ToolApiService,
    private cdr: ChangeDetectorRef,
    private drawerMngr: DrawerService,
    @Inject(DOCUMENT) private document: Document,


  ) { }

  ngOnInit(): void {
    this.toolApiService.getToolImageTags(this.tool_id).subscribe((_: []) => {
      this.images = _
      this.cdr.markForCheck()
    })
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

  deploy(id: string) {

    const data = {
      TraceId: id,
      fprocess: 'echo hello world'
    }
    this.toolApiService.createDeployment(id).subscribe(_ => {
      console.log(_)

    })
  }

}
