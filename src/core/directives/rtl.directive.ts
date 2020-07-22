import {Directive, Renderer2, ElementRef, OnInit} from '@angular/core';

@Directive({
    selector: '[pepperiRtlClass]',
})
export class RtlClassDirective implements OnInit {
    constructor(private renderer: Renderer2, private hostElement: ElementRef) {}

    ngOnInit(): void {
        // TODO: userService.isRTLlang
        const isRtl = false;

        if (isRtl) {
            this.renderer.addClass(this.hostElement.nativeElement, 'rtl');
        }
    }
}

@Directive({
    selector: '[pepperiRtlDirection]',
})
export class RtlDirectionDirective implements OnInit {
    constructor(private renderer: Renderer2, private hostElement: ElementRef) {}

    ngOnInit(): void {
        // TODO: userService.isRTLlang
        const isRtl = false;

        this.renderer.setAttribute(this.hostElement.nativeElement, 'dir', isRtl ? 'rtl' : 'ltr');
    }
}
