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
  title = 'Meddler';
  router_subscription: Subscription = undefined
  constructor(public router: Router,
    private loadingService: LoadingService
    , private activatedRoute: ActivatedRoute
  ) {


  }
  ngOnDestroy(): void {

    console.log('ngOninit ROOT Destroy')
    

    if (this.router_subscription)
      this.router_subscription.unsubscribe()
  }

  onInitRouterEvents() {

    this.router_subscription = this.router.events.subscribe(event => {

      if (event instanceof NavigationStart) {

        console.info("NavigationStart", event.url)
        this.loadingService.reset()
        this.loadingService.start()

      } else if (event instanceof NavigationEnd) {

        console.info("NavigationEnd", event.url)
        this.loadingService.complete(true)


      }
      else if (event instanceof NavigationCancel) {

        console.info("NavigationCancel")
        this.loadingService.stop()

      }
      else if (event instanceof NavigationError) {

        console.info("NavigationError")
        this.loadingService.stop()


      }
      else if (event instanceof RoutesRecognized) {

        console.info("RoutesRecognized")
        // this.loadingService.complete()

      }
    });


  }

  ngOnInit(): void {
    console.log('ngOninit ROOT Created')
    this.onInitRouterEvents()

  }
}
