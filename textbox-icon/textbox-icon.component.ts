import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { SessionService } from '@pepperi/lib';

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'pepperi-textbox-icon',
    templateUrl: './textbox-icon.component.html',
    styleUrls: ['./textbox-icon.component.scss'],
})
export class PepperiTextboxIconComponent implements OnInit {
    @Input() value: string;
    @Input() label: string;
    @Input() type?: string;
    @Input() disabled: boolean;

    test: boolean = true;
    @Output() iconClicked: EventEmitter<void> = new EventEmitter<void>();

    constructor(public sessionService: SessionService) { }

    ngOnInit() { }

    iconButtonClicked() {
        const currentValue = this.value;
        if (currentValue.toString().trim().length > 0) {
            switch (this.type) {
                case 'email':
                    window.open('mailto:' + currentValue, 'email');
                    break;
                case 'phone':
                    window.open('tel:' + currentValue, 'tel');
                    break;
                case 'link':
                    window.open(currentValue);
                    break;
                default:
                    break;
            }
        }

        this.iconClicked.emit();
    }
}
