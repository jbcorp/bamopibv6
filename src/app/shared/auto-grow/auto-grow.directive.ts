import { Directive, ElementRef, Renderer } from '@angular/core';

@Directive({
  selector: '[autoGrow]',
  host: {
    '(focus)': 'onFocus()',
    '(blur)': 'onBlur()'
  }
})
export class AutoGrowDirective {

  constructor(private el: ElementRef, private renderer: Renderer) { }

  onFocus() {
    //console.log('onFocus');
    this.renderer.setElementStyle(this.el.nativeElement, "width", '300px');
    this.renderer.setElementStyle(this.el.nativeElement, 'background-color', 'white');
    this.renderer.setElementStyle(this.el.nativeElement, 'color', '#6d4f8f');
    this.renderer.setElementAttribute(this.el.nativeElement, 'placeholder', '');
    //console.log(this.el.nativeElement);
  }

  onBlur() {
  //  console.log('onBlur');
    this.renderer.setElementStyle(this.el.nativeElement, 'width', 'auto');
    this.renderer.setElementStyle(this.el.nativeElement, 'background-color', '#6d4f8f');
    this.renderer.setElementAttribute(this.el.nativeElement, 'placeholder', 'Search Orders');
    this.renderer.setElementProperty(this.el.nativeElement, 'value', '');
    // console.log(this.el.nativeElement);
  }

  //TODO use input output for styles. and old styles.
}
