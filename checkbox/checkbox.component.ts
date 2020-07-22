import { Component, OnInit, OnChanges, Input, Output, EventEmitter, ChangeDetectionStrategy, OnDestroy, Renderer2, ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { SessionService, CustomizationService, LAYOUT_TYPE } from '@pepperi/lib';

@Component({
    selector: 'pepperi-checkbox',
    templateUrl: './checkbox.component.html',
    styleUrls: ['./checkbox.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PepperiCheckboxComponent implements OnChanges, OnInit, OnDestroy {
    @Input() key: string = '';
    @Input() value: string = '';
    @Input() label: string = '';
    @Input() type: string = 'checkbox'; // || 'booleanText'
    @Input() required: boolean = false;
    @Input() disabled: boolean = false;
    @Input() readonly: boolean = false;
    @Input() xAlignment: string = '0';
    @Input() rowSpan: number = 1;
    @Input() additionalValue: any;

    controlType = 'checkbox';

    @Input() form: FormGroup = null;
    @Input() isActive: boolean = false;
    @Input() showTitle: boolean = true;
    @Input() layoutType: LAYOUT_TYPE = LAYOUT_TYPE.PepperiForm;

    @Output() valueChanged: EventEmitter<any> = new EventEmitter<any>();

    LAYOUT_TYPE = LAYOUT_TYPE;
    standAlone = false;

    additionalValueObject: any;
    public jsonLib = JSON;

    constructor(
        private renderer: Renderer2,
        private customizationService: CustomizationService,
        public sessionService: SessionService,
        public translate: TranslateService,
        public hostElement: ElementRef
    ) { }

    ngOnInit() {
        if (this.form === null) {
            this.standAlone = true;
            this.form = this.customizationService.getDefaultFromGroup(this.key, this.value, this.required, this.readonly, this.disabled, 0, '', true);

            this.renderer.addClass(this.hostElement.nativeElement, CustomizationService.STAND_ALONE_FIELD_CLASS_NAME);
        }

        if (this.type === 'booleanText') {
            try {
                if (typeof this.additionalValue === 'string') {
                    this.additionalValueObject = JSON.parse(this.additionalValue);
                } else {
                    this.additionalValueObject = this.additionalValue;
                }
            } catch {
                this.additionalValueObject = { CheckedText: this.translate.instant('True'), UncheckedText: this.translate.instant('False') };
            }
        }
    }

    ngOnChanges(changes: any) { }

    ngOnDestroy() {
        if (this.valueChanged) {
            this.valueChanged.unsubscribe();
        }
    }

    onMaterialChange(e: any) {
        this.changeValue(e.checked);
    }

    toggleChecked(event: any) {
        if (!this.disabled) {
            const isChecked: boolean = this.value === 'true' || this.value === '1' ? true : false;
            this.changeValue(!isChecked);
        }
    }

    changeValue(value: any) {
        this.customizationService.updateFormFieldValue(this.form, this.key, value);
        this.valueChanged.emit({ apiName: this.key, value: value });
    }
}
