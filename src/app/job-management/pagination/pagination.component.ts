import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';


export interface Paginator {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;

}


@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent {



  // TODO: 
  ngOnChanges(changes: SimpleChanges): void {

    if (changes.paginator_data) {
      let paginator_data: Paginator = changes.paginator_data.currentValue;
      if (!!!paginator_data)
        return;
      console.log('paginator_data', paginator_data);
      this.page_number = paginator_data.currentPage;
      this.page_count = paginator_data.totalPages;
      this.page_size = paginator_data.pageSize;
      this.page_current = paginator_data.currentPage;
    }
  }


  @Input('paginator') paginator_data: Paginator;


  @Output('onchange') onchange = new EventEmitter<number>();

  @Input('page_number') page_number = 1;
  @Input('page_count') page_count;
  @Input('page_size') page_size;

  @Input('loading') loading = false;

  @Input('page_current') page_current = 0;


  goto(page) {

    this.onchange.emit(page);


  }


  next() {
    this.onchange.emit(this.page_current + 1);

  }

  prev() {
    this.onchange.emit(this.page_current - 1);
  }



}
