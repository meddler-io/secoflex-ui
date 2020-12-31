import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[autoFocus]'
})
export class AutofocusDirective {
  constructor(private host: ElementRef) {}

  ngAfterViewInit() {
    this.host.nativeElement.focus();
  }
}