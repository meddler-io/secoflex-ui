import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { basicAnimations } from 'src/app/reusable-components/common/animations/basic-animations';




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

  constructor(

    private router: Router

  ) { }

  ngOnInit(): void {

    this.item.path = this.item.link.join('/')
    if (this.item.children)
      this.item.children.forEach((child, index) => {
        this.item.children[index].path = this.item.children[index].link.join('/')


        if (this.item.children[index].path == this.router.url)
          this.expanded$ = true;
      })
    // console.log('this', this.item)

    if (this.item.path == this.router.url)
      this.expanded$ = true;
  }



  collapsed = false;

  toggle() {
    // if (this.item.path != this.router.url)
      this.expanded$ = !this.expanded$;
  }

  expand() {
    this.expanded$ = true;
  }

  collapse() {
    this.expanded$ = false;
  }

}
