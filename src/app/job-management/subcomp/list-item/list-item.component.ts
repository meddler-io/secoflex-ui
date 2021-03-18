import { Component, HostBinding, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
  host: {
    // '[style.backgroundColor]': 'test' // 'background-color: nb-theme(color-primary-400);'
  }
})
export class ListItemComponent implements OnInit {

  @HostBinding('class.selected') 
  get selectedItem() {
    return this.selectedId == this.data._id
  }

  test = '#000'

  @Input('data') data
  @Input('selectedId') selectedId



  @Output('click') onClickEvent = new Subject()
  constructor() { }

  ngOnInit(): void {
  }

  onClick() {
    // this.onClickEvent.next()
  }

}
