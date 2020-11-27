import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { basicAnimations } from 'src/app/reusable-components/common/animations/basic-animations';
import { AssetType } from '../asset-store.service';
import { NavbarSharedService } from '../navbar-shared-service.service';




@Component({
  selector: 'app-navbar-list-item',
  templateUrl: './navbar-list-item.component.html',
  styleUrls: ['./navbar-list-item.component.scss'],
  animations: [...basicAnimations,



  ]
})
export class NavbarListItemComponent implements OnInit {



  @Input('selected') selected$ = false;
  @Input('title') title$ = '';
  @Input('item') item

  @Input('routerlink') routerLink;
  @Input('expanded') expanded$ = false;

  navbarStateSubscription

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private navbarSharedService: NavbarSharedService
  ) {

  }

  ngOnInit(): void {

    this.navbarStateSubscription = this.navbarSharedService.getState.subscribe(navbar_state => {
      console.log('navbar_state', navbar_state)
    })

    // this.activatedRoute.parent.url.subscribe((data) =>
    //   console.log('rpiute', this.activatedRoute.snapshot.firstChild.data)); // just always empty {}

    // this.activatedRoute.parent.url.subscribe((urlPath) => {
    //   console.log('rpiute', urlPath)
    // })

    this.item.path = this.item.link.join('/')
    if (this.item.children)
      this.item.children.forEach((child, index) => {
        this.item.children[index].path = this.item.children[index].link.join('/')


        if (this.item.children[index].path == this.router.url) {

          this.expanded$ = true;
          this.selected$ = true
        }

      })
    // console.log('this', this.item)

    if (this.item.path == this.router.url) {

      this.expanded$ = true;
      this.selected$ = true
    }
  }



  collapsed = false;

  toggle() {
    if (this.selected$)
      return
    // if (this.item.path != this.router.url)
    this.expanded$ = !this.expanded$;
  }

  expand() {
    if (this.selected$)
      return
    this.expanded$ = true;
  }

  collapse() {
    if (this.selected$)
      return
    this.expanded$ = false;
  }

}
