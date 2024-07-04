import { HostListener } from '@angular/core';
import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { Datastore } from 'src/app/reusable-components/common/services/datastore';

@Directive({
  selector: '[appLeftBorder]'
})
export class LeftBorderDirective {

  @Input('appLeftBorder') color: string = Datastore.getRandmColor // Datastore.getRandmColor()// randomColor({ seed: 0 }) //"#fff";

  @Input('animate') animate = false;
  @Input('width') borderWith = 4;
  @Input('widthDiff') borderWithDiff = 2;

  constructor(private el: ElementRef, private renderer: Renderer2) {


  }

  ngOnInit(): any {

    console.log('animate', this.animate)

    console.log('appLeftBorder', this.color)
    // Use renderer to render the element with styles
    this.renderer.setStyle(this.el.nativeElement, 'border-left', `${this.borderWith}px solid ${this.color}`);
    this.renderer.setStyle(this.el.nativeElement, 'margin-bottom', `1px`);
    this.renderer.setStyle(this.el.nativeElement, 'padding', '10px')
    this.renderer.setStyle(this.el.nativeElement, 'color', '#fff')


      // renderer.setStyle(el.nativeElement, 'border-top', `1px solid transparent`);
      // renderer.setStyle(el.nativeElement, 'border-top-right-radius', '2rem');
      // renderer.setStyle(el.nativeElement, 'border-bottom-right-radius', '2rem');
      ;
    // renderer.setStyle(el.nativeElement, 'margin-top', '2px');
    // renderer.setStyle(el.nativeElement, 'margin-bottom', '2px');
  }


  @HostListener('mouseover') onMouseOver() {
    if (this.animate)
      this.renderer.setStyle(this.el.nativeElement, 'border-left', `${this.borderWith + this.borderWithDiff}px solid ${this.color}`);
    // this.renderer.setStyle(this.el.nativeElement, 'color', '#3366ff')


  }

  @HostListener('mouseleave') onMouseOut() {
    this.renderer.setStyle(this.el.nativeElement, 'border-left', `${this.borderWith}px solid ${this.color}`);
    this.renderer.setStyle(this.el.nativeElement, 'margin-bottom', `1px`);
    this.renderer.setStyle(this.el.nativeElement, 'padding', '10px')
    // this.renderer.setStyle(this.el.nativeElement, 'color', '#fff')


  }


}
