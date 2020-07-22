import { Directive, Input, Renderer2, ElementRef } from '@angular/core';
import { SessionService } from '../services/session.service';

@Directive({
    selector: '[pepperiSvgIcon]',
})
export class SvgIconDirective {
    @Input('pepperiSvgIcon') iconName: string;

    constructor(private renderer: Renderer2, private hostElement: ElementRef, private sessionService: SessionService) { }

    ngOnInit(): void {
        this.renderer.addClass(this.hostElement.nativeElement, 'svg-icon');

        const use = this.renderer.createElement('use');
        this.renderer.setAttribute(use, 'attr.xlink:href', `${this.sessionService.svgIcons}${this.iconName}`);

        this.renderer.appendChild(this.hostElement.nativeElement, use);
    }
}
