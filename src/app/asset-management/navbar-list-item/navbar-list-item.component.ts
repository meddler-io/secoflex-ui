import { Component, Input, OnInit } from '@angular/core';
import { basicAnimations } from 'src/app/reusable-components/common/animations/basic-animations';

@Component({
  selector: 'app-navbar-list-item',
  templateUrl: './navbar-list-item.component.html',
  styleUrls: ['./navbar-list-item.component.scss'],
  animations: [...basicAnimations]
})
export class NavbarListItemComponent implements OnInit {

  @Input('selected') selected$ = false;
  @Input('title') title$ = '';

  @Input('routerlink') routerLink;
  @Input('expanded') expanded$ = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleExpand(){
    // return
    if(this.selected$){
      // this.expanded$ = true;
      // this.selected$ = true;

    } else{
      this.expanded$ = !this.expanded$
      // this.selected$ = !this.selected$!
    }
  }

}
