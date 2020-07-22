import { Component, OnInit, Input } from '@angular/core';
import { SessionService } from '@pepperi/lib';

@Component({
    selector: 'pepperi-field-title',
    templateUrl: './field-title.component.html',
    styleUrls: ['./field-title.component.scss'],
})
export class PepperiFieldTitleComponent implements OnInit {
    @Input() label: string = '';
    @Input() required: boolean = false;
    @Input() disabled: boolean = false;
    @Input() maxFieldCharacters: number = 0;
    @Input() xAlignment: string = '0';

    @Input() showTitle: boolean = true;
    @Input() inputLength: number = 0;

    constructor(
        public sessionService: SessionService
        ) { }

    ngOnInit() { }
}
