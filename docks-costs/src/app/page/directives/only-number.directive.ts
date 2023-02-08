import { Directive, ElementRef, HostListener } from "@angular/core";

@Directive({
    selector: '[appOnlyNumberDirective]'
})

export class OnlyNumberDirective {
    regex: RegExp = new RegExp(/^\d*\,?\d{0,2}$/g);
    specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight', 'Del', 'Delete'];


    constructor(public elementRef: ElementRef) { }

    @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
      if (this.specialKeys.indexOf(event.key) !== -1) {
        return;
      }
      const current: string = this.elementRef.nativeElement.value;
      const next: string = current.concat(event.key);
      if (next && !String(next).match(this.regex)) {
        event.preventDefault();
      }
    }
}

