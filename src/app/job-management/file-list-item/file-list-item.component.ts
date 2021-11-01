import { Component, HostBinding, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-file-list-item',
  templateUrl: './file-list-item.component.html',
  styleUrls: ['./file-list-item.component.scss']
})
export class FileListItemComponent implements OnInit {

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
