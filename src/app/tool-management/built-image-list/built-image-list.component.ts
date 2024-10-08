import { DOCUMENT } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { tap, map, filter } from 'rxjs/operators';
import { DrawerDirection } from 'src/app/drawer/drawer-direction.enum';
import { DrawerService } from 'src/app/drawer/drawer.service';
import { SharedDataService } from '../shared-data-service.service';
import { ToolApiService } from '../tool-api.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-built-image-list',
  templateUrl: './built-image-list.component.html',
  styleUrls: ['./built-image-list.component.scss']
})
export class BuiltImageListComponent implements OnInit, OnDestroy {

  @Input('tool_id') tool_id
  images = []

  scale_formcontrol = new FormControl(1 , [Validators.required
,
Validators.min(0),


   ])
  memory_formcontrol = new FormControl(255 , [Validators.required,

    Validators.min(255),

   ])

   validateNo(e): boolean {
    const charCode = e.which ? e.which : e.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false
    }
    return true
}

  constructor(
    private toolApiService: ToolApiService,
    private cdr: ChangeDetectorRef,
    private drawerMngr: DrawerService,
    @Inject(DOCUMENT) private document: Document,
    private activatedRoute: ActivatedRoute,
    private sharedDataService: SharedDataService,




  ) { }

  runRebuildTask(id , tag){
    this.toolApiService.runRebuild(id , tag, {}).subscribe()
  }


  sharedServiceSubscription$ = Subscription.EMPTY

  ngOnDestroy(): void {

    this.sharedServiceSubscription$.unsubscribe()
  }



  ngOnInit(): void {

    this.sharedServiceSubscription$ = this.sharedDataService.ToolId
      .pipe(tap(id => {
        this.tool_id = id
      }))
      .subscribe(() => { this.loadData() })



  }

  loadData() {


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
    this.toolApiService.createDeployment(id , this.scale_formcontrol.value , this.memory_formcontrol.value ).subscribe(_ => {
      console.log(_)

    })
  }

}
