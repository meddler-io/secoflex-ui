
import { Directive, ElementRef, Renderer2 } from '@angular/core';
@Directive({
  selector: '[appBorder]'
})
export class BorderDirective {

  constructor(el: ElementRef, renderer: Renderer2) {
    // Use renderer to render the element with styles
    renderer.setStyle(el.nativeElement, 'border', '1px solid #3b4457');
    renderer.setStyle(el.nativeElement, 'border-radius', '2px');
    renderer.setStyle(el.nativeElement, 'padding', '10px');
    renderer.setStyle(el.nativeElement, 'margin', '2px');
    }


}
