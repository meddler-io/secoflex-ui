import {
  Directive,
  ElementRef,
  Inject,
  PLATFORM_ID,
  AfterViewInit,
  HostListener,
  Renderer2
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appEllipsis]'
})
export class EllipsisDirective {



  constructor(
    private readonly el: ElementRef,
    private readonly renderer: Renderer2,
    @Inject(PLATFORM_ID) private readonly platformId
  ) {


    // this.renderer.setStyle(this.el.nativeElement, 'white-space', 'nowrap')
    // this.renderer.setStyle(this.el.nativeElement, 'overflow', 'hidden')
    // this.renderer.setStyle(this.el.nativeElement, 'text-overflow', 'ellipsis')



    // this.renderer.setStyle(this.el.nativeElement, 'display', '-webkit-box')
    // this.renderer.setStyle(this.el.nativeElement, '-webkit-line-clamp', '1')
    // this.renderer.setStyle(this.el.nativeElement, '-webkit-box-orient', 'vertical')


  }


}