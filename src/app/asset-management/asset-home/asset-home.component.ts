import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RoutesRecognized } from '@angular/router';

import { Subscription } from 'rxjs';
import { basicAnimations } from 'src/app/reusable-components/common/animations/basic-animations';
import { AssetApiService } from '../asset-api.service';
import { AssetStoreService } from '../asset-store.service'

@Component({
  selector: 'app-asset-home',
  templateUrl: './asset-home.component.html',
  styleUrls: ['./asset-home.component.scss'],
  animations: [...basicAnimations,]

})
export class AssetHomeComponent implements OnInit, OnDestroy {

  @ViewChild('settingsTemplate', { static: false }) template: TemplateRef<any>;

  selected_type = ''


  assetTypes = this.assetStoreService.getAssetTypes
  loading = true;

  constructor(private assetStoreService: AssetStoreService, public router: Router,
    // private loadingService: LoadingService
    private activatedRoute: ActivatedRoute,

    // private readonly drawerService: DrawerService,
    private readonly el: ElementRef<HTMLElement>,
    @Inject(DOCUMENT) private document: Document,
    private aseetService: AssetApiService
  ) {


  }




  subscriptions: Subscription[] = []


  onInitActivatedRouterEvent() {

    const subscription = this.activatedRoute.data.subscribe(params => {

    })

    this.subscriptions.push(subscription)

  }
  onInitRouterEvents() {

    const subscription = this.router.events.subscribe(event => {
      // console.log('event',event)
      if (event instanceof NavigationStart) {
        this.loading = true;
        console.log("NavigationStart")
        // this.loadingService.reset()

      } else if (event instanceof NavigationEnd) {
        this.loading = false;
        console.log("NavigationEnd")
        // this.loadingService.complete()

      }
      else if (event instanceof NavigationCancel) {
        this.loading = false;
        console.log("NavigationCancel")
        // this.loadingService.complete()

      }
      else if (event instanceof NavigationError) {
        this.loading = false;
        console.log("NavigationError")
        // this.loadingService.complete()

      }
      else if (event instanceof RoutesRecognized) {
        this.loading = false;
        console.log("RoutesRecognized")
        // this.loadingService.complete()

      }
    });

    this.subscriptions.push(subscription)
  }

  ngOnInit(): void {

    console.log('reloading')
    // this.openSettings(this.template)
    this.activatedRoute.url.subscribe((data) =>
      console.log('rpiute2' , data, this.activatedRoute.snapshot.firstChild.data) ); // just always empty {}

  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(_s => {
      _s.unsubscribe()
    })
  }



  // openSettings(template, direction = DrawerDirection.Left, size = 50, closeOnOutsideClick = true, isRoot = true, parentContainer?: any) {

  //   const zIndex = 1041;
  //   const cssClass = 'backdrop_color'
  //   this.document.body.classList.add('cdk-global-scrollblock')

  //   this.drawerService.create({
  //     direction,
  //     template,
  //     size,
  //     context: 'Alert Everyone!',
  //     closeOnOutsideClick,
  //     parentContainer,
  //     isRoot,
  //     zIndex,
  //     cssClass,


  //   }).onDestroy(() => {

  //     this.document.body.classList.remove('cdk-global-scrollblock')

  //   });
  // }

}
