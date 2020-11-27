import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, throttleTime } from 'rxjs/operators';

@Directive({
  selector: '[appDebounceClick]'
})
export class DebounceClickDirective {

  @Input() debounceTime = 500;


  @Output() debounceMouseOver = new EventEmitter();
  private mouseOver = new Subject();
  private subscriptionMl: Subscription;


  @Output() debounceMouseLeave = new EventEmitter();
  private mouseLeave = new Subject();
  private subscriptionMo: Subscription;


  @Output() debounceClick = new EventEmitter();
  private clicks = new Subject();
  private subscription: Subscription;

  constructor() { }

  ngOnInit() {
    this.subscription = this.clicks
      .pipe(throttleTime(this.debounceTime))
      .subscribe(e => this.debounceClick.emit(e));

    this.subscriptionMo = this.mouseOver
      .pipe(throttleTime(this.debounceTime))
      .subscribe(e => this.debounceMouseOver.emit(e));

    this.subscriptionMl = this.mouseLeave
      .pipe(throttleTime(this.debounceTime))
      .subscribe(e => this.debounceMouseLeave.emit(e));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subscriptionMl.unsubscribe();
    this.subscriptionMo.unsubscribe();
  }

  @HostListener('click', ['$event'])
  clickEvent(event) {
    event.preventDefault();
    event.stopPropagation();
    this.clicks.next(event);
  }


  @HostListener('mouseleave', ['$event'])
  mouseleaveEvent(event) {
    event.preventDefault();
    event.stopPropagation();
    this.mouseLeave.next(event);
  }


  @HostListener('mouseover', ['$event'])
  mouseoverEvent(event) {
    event.preventDefault();
    event.stopPropagation();
    this.mouseOver.next(event);
  }

}
