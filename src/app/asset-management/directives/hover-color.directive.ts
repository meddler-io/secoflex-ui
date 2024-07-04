import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';
import { Datastore } from 'src/app/reusable-components/common/services/datastore';

@Directive({
  selector: '[appHoverColor]'
})
export class HoverColorDirective {


  @Input('hovercolor') color: string = '#3366ff' // Datastore.getRandmColor()// randomColor({ seed: 0 }) //"#fff";



  constructor(private el: ElementRef, private renderer: Renderer2) {


  }

  ngOnInit(): any {


    this.renderer.setStyle(this.el.nativeElement, 'background', 'none')
    this.renderer.setStyle(this.el.nativeElement, 'font-weight', '100')
    // this.renderer.setStyle(this.el.nativeElement, 'border-radius',  '9px')


  }


  @HostListener('mouseover') onMouseOver() {

    this.renderer.setStyle(this.el.nativeElement, 'background', this.color)
    // this.renderer.setStyle(this.el.nativeElement, 'color', '#fff !important')
    this.renderer.setStyle(this.el.nativeElement, 'font-weight', '650 !important')

    // this.renderer.setStyle(this.el.nativeElement, 'color', '#3366ff')


  }

  @HostListener('mouseleave') onMouseOut() {

    this.renderer.setStyle(this.el.nativeElement, 'background', 'none')
    this.renderer.setStyle(this.el.nativeElement, 'font-weight', '100')

    // this.renderer.setStyle(this.el.nativeElement, 'color', '#fff')


  }


}
