import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar-list-item',
  templateUrl: './navbar-list-item.component.html',
  styleUrls: ['./navbar-list-item.component.scss']
})
export class NavbarListItemComponent implements OnInit {

  @Input('selected') selected$ = false;
  @Input('title') title$ = '';

  
  constructor() { }

  ngOnInit(): void {
  }

}
