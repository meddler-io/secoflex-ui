import { Directive, ElementRef, HostListener, Input, Renderer2, HostBinding } from '@angular/core';
@Directive({
  selector: '[onFocus]',
})
export class OnFocusDirective {

  @HostBinding('class.focussed') focussed: boolean;


  private el: ElementRef;
  constructor(private _el: ElementRef, public renderer: Renderer2) {
    this.el = this._el;
  }

  @HostListener('focus', ['$event']) onFocus(e) {
    this.focussed = true;

    return;
  }
  @HostListener('blur', ['$event']) onblur(e) {
    this.focussed = false;
    return;
  }


}