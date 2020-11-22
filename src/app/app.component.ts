import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, RoutesRecognized } from '@angular/router';

import { Subscription } from 'rxjs';
import { LoadingService } from './loading/loading.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'frontend';
  router_subscription: Subscription = undefined
  constructor(public router: Router,
    private loadingService: LoadingService
    , private activatedRoute: ActivatedRoute
  ) {


  }
  ngOnDestroy(): void {

    if (this.router_subscription)
      this.router_subscription.unsubscribe()
  }

  onInitRouterEvents() {

    this.router_subscription = this.router.events.subscribe(event => {

      if (event instanceof NavigationStart) {

        console.log("NavigationStart")
        this.loadingService.reset()
        this.loadingService.start()

      } else if (event instanceof NavigationEnd) {

        console.log("NavigationEnd")
        this.loadingService.complete(true)


      }
      else if (event instanceof NavigationCancel) {

        console.log("NavigationCancel")
        this.loadingService.stop()

      }
      else if (event instanceof NavigationError) {

        console.log("NavigationError")
        this.loadingService.stop()


      }
      else if (event instanceof RoutesRecognized) {

        console.log("RoutesRecognized")
        // this.loadingService.complete()

      }
    });


  }

  ngOnInit(): void {
    this.onInitRouterEvents()

  }
}
