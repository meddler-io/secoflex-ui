import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { basicAnimations } from 'src/app/reusable-components/common/animations/basic-animations';
import { AssetType, NavbarItem } from '../asset-store.service';
import { NavbarSharedService } from '../navbar-shared-service.service';

export interface NavbarState  {
  item_id: string;
   subitem_id: string;
}



@Component({
  selector: 'app-navbar-list-item',
  templateUrl: './navbar-list-item.component.html',
  styleUrls: ['./navbar-list-item.component.scss'],
  animations: [...basicAnimations,
  ]
})
export class NavbarListItemComponent implements OnInit {

  activeState : NavbarState = {
    item_id: 'host',
    subitem_id: 'host_create'
  }


  @Input('selected') selected$ = false;
  @Input('title') title$ = '';
  @Input('item') item : NavbarItem
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

    this.navbarStateSubscription = this
    .navbarSharedService
    .getState
    .pipe(map(( state: NavbarState )=>{
      if(this.item.id == state.item_id){
        console.log('navbar_state', state)
        this.activeState  = state
        this.expand()
      } else{
        this.activeState  = state
        this.collapse()


      }
    })
    )
    .subscribe(navbar_state => {
      // console.log('navbar_state', navbar_state)
    })



    // this.item.path = this.item.link.join('/')
    // if (this.item.children)
    //   this.item.children.forEach((child, index) => {
    //     this.item.children[index].path = this.item.children[index].link.join('/')


    //     if (this.item.children[index].path == this.router.url) {

    //       this.expanded$ = true;
    //       this.selected$ = true
    //     }

    //   })
    // console.log('this', this.item)

    // if (this.item.path == this.router.url) {

    //   this.expanded$ = true;
    //   this.selected$ = true
    // }
  }



  collapsed = false;

  toggle() {
    if (this.selected$)
      return
    // if (this.item.path != this.router.url)
    this.expanded$ = !this.expanded$;
  }

  expand() {
    console.log('exapnd')
    this.expanded$ = true;
  }

  collapse() {

    this.expanded$ = false;
  }


  onItemClick( item: NavbarItem ,  subitem :  NavbarItem ){
    this.navbarSharedService.setState =  { item_id: item.id , subitem_id: subitem.id } 
    // console.log('onItemClick', data)
  }
}
