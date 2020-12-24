import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { DrawerDirection } from 'src/app/drawer/drawer-direction.enum';
import { DrawerService } from 'src/app/drawer/drawer.service';
import { ToolApiService } from '../tool-api.service';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { filter, map, tap } from 'rxjs/operators';
import { basicAnimations } from 'src/app/reusable-components/common/animations/basic-animations';

@Component({
  selector: 'app-build-list',
  templateUrl: './build-list.component.html',
  styleUrls: ['./build-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [...basicAnimations]
})
export class BuildListComponent implements OnInit {

  refrence_id

  builds$

  constructor(
    private toolApiService: ToolApiService,
    private drawerMngr: DrawerService,
    @Inject(DOCUMENT) private document: Document,
    private activatedRoute: ActivatedRoute

  ) { }
  ngOnInit(): void {

    this.activatedRoute.params
      .pipe(map(_ => _.id))
      .pipe(filter(_ => _))
      .pipe(tap(id => {
        this.refrence_id = id
      }))
      .subscribe(id => {

        this.builds$ = this.toolApiService.getBuilds(id)

      })


  }





  openDrawer(template, direction = DrawerDirection.Left, size = '50%', closeOnOutsideClick = true, isRoot = true, parentContainer?: any) {

    const zIndex = 1000;
    const cssClass = 'backdrop_color'
    // const cssClass = 'cdk-overlay-2'
    this.document.body.classList.add('cdk-global-scrollblock')

    this.drawerMngr.create({
      direction,
      template,
      // size,
      context: 'Alert Everyone!',
      closeOnOutsideClick,
      parentContainer,
      isRoot,
      zIndex,
      cssClass,


    }).onDestroy(() => {

      this.document.body.classList.remove('cdk-global-scrollblock')

    });
  }
  openLogs(template, direction = DrawerDirection.Left, size = '50%', closeOnOutsideClick = false, isRoot = true, parentContainer?: any) {

    const zIndex = 1000;
    const cssClass = 'backdrop_color'
    // const cssClass = 'cdk-overlay-2'
    this.document.body.classList.add('cdk-global-scrollblock')
    this.drawerMngr.create({
      direction,
      template,
      size,
      context: 'Alert Everyone!',
      closeOnOutsideClick,
      parentContainer,
      isRoot,
      zIndex,
      cssClass,
    }

    )
      .onDestroy(() => {
        this.document.body.classList.remove('cdk-global-scrollblock')

      });
  }
}
