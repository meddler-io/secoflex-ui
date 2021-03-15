import { Component, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {

  @Input('data') data
  @Input('selectedId') selectedId
  

  
  @Output('click') onClickEvent = new Subject()
  constructor() { }

  ngOnInit(): void {
  }

  onClick(){
    // this.onClickEvent.next()
  }

}
