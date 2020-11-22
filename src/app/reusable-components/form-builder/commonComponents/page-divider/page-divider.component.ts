import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-page-divider',
  templateUrl: './page-divider.component.html',
  styleUrls: ['./page-divider.component.scss']
})
export class PageDividerComponent implements OnInit {

  @Input('caption') caption
  constructor() { }

  ngOnInit(): void {
  }

}
