import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

export enum LAYOUT_TYPE {
    PepperiForm,
    PepperiCard,
    PepperiTable,
    // PepperiCampaign,
    Editmodal,
}

export enum STYLE_TYPE {
    Weak = 'weak',
    Regular = 'regular',
    Strong = 'strong',
}

export class PepperiOption {
    Key: string;
    Value: string;
}

export class PepperiFieldBase {
    value: any;
    formattedValue: any;
    additionalValue: string;
    notificationInfo: any = {};
    key: string;
    label: string;
    accessory: string;
    required: boolean;
    readonly: boolean;
    disabled: boolean;
    order: number;
    type: string;
    controlType: string;
    placeholder: string;
    hidden: boolean;
    row: number;
    rowSpan: number;
    col: number;
    colSpan: number;
    xAlignment: number;
    yAlignment: number;
    groupFields: PepperiFieldBase[];
    maxFieldCharacters: number;
    minValue: number;
    maxValue: number;
    textColor: string;
    updatedDataCount: number;
    lastFocusField: any;
    options: PepperiOption[];

    constructor(
        options: {
            value?: any;
            formattedValue?: any;
            additionalValue?: string;
            notificationInfo?: any;
            key?: string;
            label?: string;
            accessory?: string;
            required?: boolean;
            readonly?: boolean;
            disabled?: boolean;
            order?: number;
            controlType?: string;
            type?: string;
            placeholder?: string;
            hidden?: string;
            row?: number;
            rowSpan?: number;
            col?: number;
            colSpan?: number;
            xAlignment?: number;
            yAlignment?: number;
            maxFieldCharacters?: number;
            minValue?: number;
            maxValue?: number;
            textColor?: string;
            lastFocusField?: any;
        } = {}
    ) {
        this.value = options.value;
        this.formattedValue = options.formattedValue;
        this.additionalValue = options.additionalValue;
        this.notificationInfo = options.notificationInfo;
        this.key = options.key || '';
        this.label = options.label || '';
        this.accessory = options.accessory || '';
        this.required = !!options.required;
        this.readonly = !!options.readonly;
        this.disabled = !!options.disabled;
        this.order = options.order === undefined ? 1 : options.order;
        this.controlType = options.controlType || '';
        this.type = options.type || '';
        this.placeholder = options.placeholder || '';
        this.hidden = !!options.hidden;

        this.row = options.row === undefined ? 1 : options.row;
        this.rowSpan = options.rowSpan === undefined ? 1 : options.rowSpan;
        this.col = options.col === undefined ? 1 : options.col;
        this.colSpan = options.colSpan === undefined ? 1 : options.colSpan;

        this.xAlignment = options.xAlignment === undefined ? 1 : options.xAlignment;
        this.yAlignment = options.yAlignment === undefined ? 1 : options.yAlignment;

        this.maxFieldCharacters = options.maxFieldCharacters === undefined ? 0 : options.maxFieldCharacters;
        this.minValue = options.minValue === undefined ? 0 : options.minValue;
        this.maxValue = options.maxValue === undefined ? 0 : options.maxValue;

        this.textColor = options.textColor || '';
        this.lastFocusField = options.lastFocusField || null;

        this.updatedDataCount = 0;
    }

    public updateField(updatedField: any, canEditObject: boolean, lastFocusField: any = null): void {
        this.disabled = !updatedField.Enabled || !canEditObject;
        this.readonly = !updatedField.Enabled || !canEditObject;
        this.value = updatedField.Value;
        this.additionalValue = updatedField.AdditionalValue;
        this.formattedValue = updatedField.FormattedValue;
        this.notificationInfo = updatedField.NotificationInfo;
        this.textColor = updatedField.TextColor;
        this.lastFocusField = lastFocusField;

        if (this.controlType === 'qs') {
            this.updatedDataCount += 1;
        }
        if (this.type === 'link') {
            // DI-11292 - add changes for link field for the "Read Only display value" prop
            this.formattedValue = this.disabled && this.formattedValue !== null && this.value !== null ? this.formattedValue : this.value;
        }
    }
}

export class PepperiPlaceholderField extends PepperiFieldBase {
    controlType = 'placeholder';

    constructor(options: {} = {}) {
        super(options);
    }
}

export class PepperiSeparatorField extends PepperiFieldBase {
    controlType = 'separator';

    constructor(options: {} = {}) {
        super(options);
    }
}

export class PepperiButtonField extends PepperiFieldBase {
    controlType = 'button';
    referenceObjectType;
    referenceObjectSubType = '';
    referenceObjectInternalType = '';

    constructor(options: {} = {}) {
        super(options);

        this.referenceObjectType = options['referenceObjectType'] || null;
        this.referenceObjectSubType = options['referenceObjectSubType'] || null;
        this.referenceObjectInternalType = options['referenceObjectInternalType'] || null;
    }
}

export class PepperiAttachmentField extends PepperiFieldBase {
    controlType = 'attachment';

    constructor(options: {} = {}) {
        super(options);
    }
}

export class PepperiIndicatorsField extends PepperiFieldBase {
    controlType = 'indicators';

    constructor(options: {} = {}) {
        super(options);
    }
}

export class PepperiTextboxField extends PepperiFieldBase {
    controlType = 'textbox';

    constructor(options: {} = {}) {
        super(options);
    }
}

export class PepperiTextareaField extends PepperiFieldBase {
    controlType = 'textarea';

    constructor(options: {} = {}) {
        super(options);
        this.type = 'textarea';
    }
}

export class PepperiRichHtmlTextareaField extends PepperiFieldBase {
    controlType = 'richhtmltextarea';

    constructor(options: {} = {}) {
        super(options);
        this.type = 'richhtmltextarea';
    }
}

export class PepperiSignatureField extends PepperiFieldBase {
    controlType = 'signature';
    options: PepperiOption[] = [];

    constructor(options: {} = {}) {
        super(options);
        this.options = options['options'] || [];
    }
}

export class PepperiImageField extends PepperiFieldBase {
    controlType = 'image';
    indicatorsField = null;
    menuField = null;
    hasCampaignField = null;
    options: PepperiOption[] = [];

    constructor(options: {} = {}) {
        super(options);
        this.options = options['options'] || [];
        this.indicatorsField = options['indicatorsField'];
        this.menuField = options['menuField'];
        this.hasCampaignField = options['hasCampaignField'];
    }
}

export class PepperiImagesField extends PepperiFieldBase {
    controlType = 'images';
    options: PepperiOption[] = [];

    constructor(options: {} = {}) {
        super(options);
        this.options = options['options'] || [];
    }
}

export class PepperiQuantitySelectorField extends PepperiFieldBase {
    controlType = 'qs';
    alowDecimal: boolean;

    constructor(options: {} = {}) {
        super(options);
        this.alowDecimal = options['alowDecimal'] || false;
    }
}

export class PepperiDateField extends PepperiFieldBase {
    controlType = 'date';

    constructor(options: {} = {}) {
        super(options);
    }
}

export class PepperiCheckboxField extends PepperiFieldBase {
    controlType = 'checkbox';

    constructor(options: {} = {}) {
        super(options);
    }
}

export class PepperiSelectField extends PepperiFieldBase {
    controlType = 'select';
    options: PepperiOption[] = [];

    constructor(options: {} = {}) {
        super(options);
        this.options = options['options'] || [];
    }

    public updateField(updatedField: any, canEditObject: boolean): void {
        super.updateField(updatedField, canEditObject);

        this.options = updatedField.OptionalValues;
    }
}

export class PepperiAddressField extends PepperiFieldBase {
    controlType = 'address';
    groupFields: PepperiFieldBase[];

    constructor(options: {} = {}) {
        super(options);
        this.groupFields = options['groupFields'] || null;
    }
}

export class PepperiInternalPageField extends PepperiFieldBase {
    controlType = 'internalPage';
    objectId = '';
    parentId = '';
    searchCode = '';

    constructor(options: {} = {}) {
        super(options);
        this.objectId = options['objectId'] || null;
        this.parentId = options['parentId'] || null;
        this.searchCode = options['searchCode'] || null;
    }
}

export class PepperiMenuField extends PepperiFieldBase {
    controlType = 'menu';
    options: PepperiOption[] = [];
    // hasSubMenu: boolean = false;

    constructor(options: {} = {}) {
        super(options);
        this.options = options['options'] || [];
        // this.hasSubMenu = options['hasSubMenu'];
    }
}

@Injectable({
    providedIn: 'root',
})
export class CustomizationService {
    static STAND_ALONE_FIELD_CLASS_NAME = 'pepperi-field';

    static REM_STRING = 'rem';
    static PX_STRING = 'px';
    static USER_THEME = 'user_theme';
    static USER_COLOR = 'user_color';
    static USER_THEME_VARIABLES = 'user_theme_variables';

    // Header height
    static HEADER_HEIGHT_KEY = '--pep-header-height';

    // Footer height
    static FOOTER_HEIGHT_KEY = '--pep-footer-bar-height';

    // Main container height
    static MAIN_HEIGHT_KEY = '--pep-main-height';

    // Colors variables keys
    static COLOR_USER_PRIMARY_KEY = '--pep-color-user-primary';
    static COLOR_USER_SECONDARY_KEY = '--pep-color-user-secondary';
    static COLOR_SYSTEM_PRIMARY_INVERT_KEY = '--pep-color-system-primary-invert';
    static COLOR_SYSTEM_PRIMARY_KEY = '--pep-color-system-primary';
    static COLOR_TEXT_LINK_KEY = '--pep-color-text-link';
    static COLOR_SYSTEM_CAUTION_KEY = '--pep-color-system-caution';
    static COLOR_SYSTEM_SUCCESS_KEY = '--pep-color-system-success';
    static COLOR_STRONG_KEY = '--pep-color-strong';
    static COLOR_REGULAR_KEY = '--pep-color-regular';
    static COLOR_WEAK_KEY = '--pep-color-weak';

    // Top header variables keys
    static COLOR_TOP_HEADER_KEY = '--pep-color-top-header';
    static STYLE_TOP_HEADER_KEY = '--pep-style-top-header';

    // QS variables keys
    static COLOR_QS_KEY = '--pep-color-qs';
    static STYLE_QS_KEY = '--pep-style-qs';

    // Fonts variables keys
    static FONT_FAMILY_TITLE_KEY = '--pep-font-family-title';
    static FONT_FAMILY_BODY_KEY = '--pep-font-family-body';

    // Border radius variables keys
    static BORDER_RADIUS_KEY = '--pep-border-radius';
    static BORDER_RADIUS_SM_KEY = CustomizationService.BORDER_RADIUS_KEY + '-sm';
    static BORDER_RADIUS_MD_KEY = CustomizationService.BORDER_RADIUS_KEY + '-md';
    static BORDER_RADIUS_LG_KEY = CustomizationService.BORDER_RADIUS_KEY + '-lg';

    // Fonts variables keys
    static FONT_SIZE_2XS_KEY = '--pep-font-size-2xs';
    static FONT_SIZE_XS_KEY = '--pep-font-size-xs';
    static FONT_SIZE_SM_KEY = '--pep-font-size-sm';
    static FONT_SIZE_MD_KEY = '--pep-font-size-md';
    static FONT_SIZE_LG_KEY = '--pep-font-size-lg';
    static FONT_SIZE_XL_KEY = '--pep-font-size-xl';
    static FONT_SIZE_2XL_KEY = '--pep-font-size-2xl';

    // Line height variables keys
    static LINE_HEIGHT_2XS_KEY = '--pep-line-height-2xs';
    static LINE_HEIGHT_XS_KEY = '--pep-line-height-xs';
    static LINE_HEIGHT_SM_KEY = '--pep-line-height-sm';
    static LINE_HEIGHT_MD_KEY = '--pep-line-height-md';
    static LINE_HEIGHT_LG_KEY = '--pep-line-height-lg';
    static LINE_HEIGHT_XL_KEY = '--pep-line-height-xl';
    static LINE_HEIGHT_2XL_KEY = '--pep-line-height-2xl';

    // Shadows offset variables keys
    static SHADOW_NONE_OFFSET_KEY = '--pep-shadow-none-offset';
    static SHADOW_XS_OFFSET_KEY = '--pep-shadow-xs-offset';
    static SHADOW_SM_OFFSET_KEY = '--pep-shadow-sm-offset';
    static SHADOW_MD_OFFSET_KEY = '--pep-shadow-md-offset';
    static SHADOW_LG_OFFSET_KEY = '--pep-shadow-lg-offset';
    static SHADOW_XL_OFFSET_KEY = '--pep-shadow-xl-offset';

    // Spacing variables keys
    static SPACING_SIZE_2XS_KEY = '--pep-spacing-2xs';
    static SPACING_SIZE_XS_KEY = '--pep-spacing-xs';
    static SPACING_SIZE_SM_KEY = '--pep-spacing-sm';
    static SPACING_SIZE_MD_KEY = '--pep-spacing-md';
    static SPACING_SIZE_LG_KEY = '--pep-spacing-lg';
    static SPACING_SIZE_XL_KEY = '--pep-spacing-xl';
    static SPACING_SIZE_2XL_KEY = '--pep-spacing-2xl';

    // Side bar variables keys
    static SIDE_BAR_WIDTH_KEY = '--pep-side-bar-width';

    // Top bar variables keys
    static TOP_BAR_SPACING_TOP_KEY = '--pep-top-bar-spacing-top';
    static TOP_BAR_SPACING_BOTTOM_KEY = '--pep-top-bar-spacing-bottom';
    static TOP_BAR_FIELD_HEIGHT_KEY = '--pep-top-bar-field-height';

    // Footer variables keys
    static FOOTER_BAR_SPACING_TOP_KEY = '--pep-footer-bar-spacing-top';
    static FOOTER_BAR_SPACING_BOTTOM_KEY = '--pep-footer-bar-spacing-bottom';

    // Form variables keys
    static FORM_FIELD_HEIGHT_KEY = '--pep-form-field-height';
    static FORM_FIELD_TITLE_HEIGHT_KEY = '--pep-form-field-title-height';
    static FORM_FIELD_SPACEING_KEY = '--pep-form-field-spacing';
    static FORM_SPACEING_KEY = '--pep-form-spacing';

    // Card variables keys
    static CARD_FIELD_HEIGHT_KEY = '--pep-card-field-height';
    static CARD_SPACEING_KEY = '--pep-card-spacing';
    static CARD_SHADOW_OFFSET_KEY = '--pep-shadow-card-offset';
    static CARD_BORDER_RADIUS_KEY = '--pep-card-border-radius';

    // Table variables keys
    static TABLE_FIELD_HEIGHT_KEY = '--pep-table-field-height';
    static TABLE_SPACEING_KEY = '--pep-table-spacing';
    static TABLE_BORDER_RADIUS_KEY = '--pep-table-border-radius';

    static DEFAULT_HEADER_HEIGHT = 64; // Default

    static DEFAULT_SPINNER_COLOR = '#78aa00';
    static DEFAULT_BRANDING_COLOR = '#fff';

    public hasCustomHomepage: Boolean = null;
    public hasCustomHeader: Boolean = null;
    public customHeaderHeight = CustomizationService.DEFAULT_HEADER_HEIGHT;
    public mainContHeight = 0;
    public footerHeight = new BehaviorSubject<number>(0);

    constructor(public fb: FormBuilder) { }

    getValidatorsForField(required: boolean, readonly: boolean, disabled: boolean, maxFieldCharacters: number, type: string, isCheckbox = false) {
        const validators = [];

        if (required && !readonly && !disabled) {
            if (isCheckbox) {
                validators.push(Validators.requiredTrue);
            } else {
                validators.push(Validators.required);
            }
        } else {
            validators.push(Validators.nullValidator);
        }

        if (maxFieldCharacters > 0) {
            validators.push(Validators.maxLength(maxFieldCharacters));
        }

        if (type === 'email') {
            validators.push(
                Validators.pattern(
                    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                )
            );
        } else if (type === 'phone') {
            validators.push(Validators.pattern(/^[\d\.\-\+\(\)\*\#]+$/));
        } else if (type === 'int' || type === 'real') {
            validators.push(Validators.pattern(/^[\.,\-\+\d]+$/));
        }

        return validators;
    }

    getDefaultFromGroup(
        key: string,
        value: string,
        required: boolean,
        readonly: boolean,
        disabled: boolean,
        maxFieldCharacters: number = 0,
        type: string = '',
        isCheckbox = false,
        withValidators = true
    ) {
        const validators = withValidators ? this.getValidatorsForField(required, readonly, disabled, maxFieldCharacters, type, isCheckbox) : [];
        let group = {};
        group[key] = [{ value: value, disabled: disabled }, validators];
        return this.fb.group(group);
    }

    private getFormControl(form, fieldKey, parentField = null) {
        let formControl = null;

        if (form && form.controls) {
            if (parentField === null) {
                formControl = form.controls[fieldKey];
            } else {
                formControl = form.controls[parentField.key].get(fieldKey);
            }
        }

        return formControl;
    }

    updateFormFieldValue(form, fieldKey, value = '', parentField = null) {
        const formControl = this.getFormControl(form, fieldKey, parentField);
        if (formControl) {
            formControl.setValue(value);
        }
    }

    calculateFormFieldHeight(withTitle = true, rowSpan = 1, standAlone = false) {
        const themeVars = this.getThemeVariables();
        const rowFieldHeight = this.getNumberThemeVariable(themeVars, CustomizationService.FORM_FIELD_HEIGHT_KEY);
        const rowFieldTitleHeight = this.getNumberThemeVariable(themeVars, CustomizationService.FORM_FIELD_TITLE_HEIGHT_KEY);
        const rowFieldSpacingBottom = this.getNumberThemeVariable(themeVars, CustomizationService.FORM_SPACEING_KEY);

        let fieldHeight = 0;
        if (rowSpan === 1) {
            fieldHeight = (withTitle ? rowFieldTitleHeight : 0) + rowFieldHeight;
        } else {
            const rowSpanCalc = withTitle ? rowSpan : rowSpan - 1;
            fieldHeight = rowSpan * rowFieldHeight + rowSpanCalc * rowFieldTitleHeight + (standAlone ? 0 : rowSpanCalc * rowFieldSpacingBottom);
        }

        return fieldHeight;
    }

    calculateCardRowsHeight(rowsCount = 1, withSpacing = true) {
        const themeVars = this.getThemeVariables();
        const cardFieldHeight = this.getNumberThemeVariable(themeVars, CustomizationService.CARD_FIELD_HEIGHT_KEY);
        const cardFieldSpacing = this.getNumberThemeVariable(themeVars, CustomizationService.CARD_SPACEING_KEY);

        const fieldHeight = rowsCount * cardFieldHeight + (rowsCount - 1) * (withSpacing ? cardFieldSpacing : 0);
        return fieldHeight;
    }

    calculateTableRowsHeight(rowsCount = 1, withSpacing = true) {
        const themeVars = this.getThemeVariables();
        const tableFieldHeight = this.getNumberThemeVariable(themeVars, CustomizationService.TABLE_FIELD_HEIGHT_KEY);
        const tableFieldSpacing = this.getNumberThemeVariable(themeVars, CustomizationService.TABLE_SPACEING_KEY);

        const fieldHeight = rowsCount * (tableFieldHeight + (withSpacing ? tableFieldSpacing * 2 : 0));
        return fieldHeight;
    }

    calculateFieldHeight(layoutType = LAYOUT_TYPE.PepperiForm, rowSpan, standAlone) {
        let fieldHeight = 'inherit'; // Default for card (with no title)
        if (layoutType === LAYOUT_TYPE.PepperiTable) {
            fieldHeight = this.getThemeVariable(CustomizationService.TABLE_FIELD_HEIGHT_KEY);
        } else if (layoutType === LAYOUT_TYPE.PepperiCard) {
            fieldHeight = this.calculateCardRowsHeight(rowSpan, !standAlone) + CustomizationService.REM_STRING;
        } else {
            // PepperiForm
            fieldHeight = this.calculateFormFieldHeight(false, rowSpan, standAlone) + CustomizationService.REM_STRING;
        }

        return fieldHeight;
    }

    getBrandingTheme() {
        const themeObj = JSON.parse(sessionStorage.getItem(CustomizationService.USER_THEME));
        return (themeObj && themeObj.Theme) || 'default-theme'; //'light-theme';
    }

    getDefaultThemeLayoutVariables(themeVars: any) {
        // Declare default screen sizes.
        themeVars['--pep-screen-max-size-2xs'] = '460' + CustomizationService.PX_STRING;
        themeVars['--pep-screen-max-size-xs'] = '767' + CustomizationService.PX_STRING;
        themeVars['--pep-screen-max-size-sm'] = '991' + CustomizationService.PX_STRING;
        themeVars['--pep-screen-max-size-md'] = '1199' + CustomizationService.PX_STRING;
        themeVars['--pep-screen-max-size-lg'] = '1366' + CustomizationService.PX_STRING;
        themeVars['--pep-screen-max-size-xl'] = '1920' + CustomizationService.PX_STRING;

        // Declare default top bar.
        themeVars[CustomizationService.SIDE_BAR_WIDTH_KEY] = '16' + CustomizationService.REM_STRING;

        // Declare default top bar.
        themeVars[CustomizationService.TOP_BAR_SPACING_TOP_KEY] = '1.5' + CustomizationService.REM_STRING;
        themeVars[CustomizationService.TOP_BAR_SPACING_BOTTOM_KEY] = '0.5' + CustomizationService.REM_STRING;
        themeVars[CustomizationService.TOP_BAR_FIELD_HEIGHT_KEY] = '2.5' + CustomizationService.REM_STRING;

        // Declare default footer.
        themeVars[CustomizationService.FOOTER_BAR_SPACING_TOP_KEY] = '0.75' + CustomizationService.REM_STRING;
        themeVars[CustomizationService.FOOTER_BAR_SPACING_BOTTOM_KEY] = '1.25' + CustomizationService.REM_STRING;
    }

    getDefaultThemeBorderRadiusVariables(themeVars: any) {
        themeVars[CustomizationService.BORDER_RADIUS_SM_KEY] = '0.125' + CustomizationService.REM_STRING;
        themeVars[CustomizationService.BORDER_RADIUS_MD_KEY] = '0.25' + CustomizationService.REM_STRING;
        themeVars[CustomizationService.BORDER_RADIUS_LG_KEY] = '0.5' + CustomizationService.REM_STRING;
    }

    getDefaultThemeSpacingVariables(themeVars: any) {
        themeVars[CustomizationService.SPACING_SIZE_2XS_KEY] = '0.125' + CustomizationService.REM_STRING;
        themeVars[CustomizationService.SPACING_SIZE_XS_KEY] = '0.25' + CustomizationService.REM_STRING;
        themeVars[CustomizationService.SPACING_SIZE_SM_KEY] = '0.5' + CustomizationService.REM_STRING;
        themeVars[CustomizationService.SPACING_SIZE_MD_KEY] = '0.75' + CustomizationService.REM_STRING;
        themeVars[CustomizationService.SPACING_SIZE_LG_KEY] = '1' + CustomizationService.REM_STRING;
        themeVars[CustomizationService.SPACING_SIZE_XL_KEY] = '1.5' + CustomizationService.REM_STRING;
        themeVars[CustomizationService.SPACING_SIZE_2XL_KEY] = '2' + CustomizationService.REM_STRING;
    }

    getDefaultThemeFontsVariables(themeVars: any) {
        // Title font family
        themeVars[CustomizationService.FONT_FAMILY_TITLE_KEY] = 'Nexa';

        // Body font family
        themeVars[CustomizationService.FONT_FAMILY_BODY_KEY] = 'Inter';

        // Font sizes
        themeVars[CustomizationService.FONT_SIZE_2XS_KEY] = '0.625' + CustomizationService.REM_STRING;
        themeVars[CustomizationService.FONT_SIZE_XS_KEY] = '0.75' + CustomizationService.REM_STRING;
        themeVars[CustomizationService.FONT_SIZE_SM_KEY] = '0.875' + CustomizationService.REM_STRING;
        themeVars[CustomizationService.FONT_SIZE_MD_KEY] = '1' + CustomizationService.REM_STRING;
        themeVars[CustomizationService.FONT_SIZE_LG_KEY] = '1.125' + CustomizationService.REM_STRING;
        themeVars[CustomizationService.FONT_SIZE_XL_KEY] = '1.25' + CustomizationService.REM_STRING;
        themeVars[CustomizationService.FONT_SIZE_2XL_KEY] = '1.5' + CustomizationService.REM_STRING;

        // Line height
        themeVars[CustomizationService.LINE_HEIGHT_2XS_KEY] = '0.75' + CustomizationService.REM_STRING;
        themeVars[CustomizationService.LINE_HEIGHT_XS_KEY] = '1' + CustomizationService.REM_STRING;
        themeVars[CustomizationService.LINE_HEIGHT_SM_KEY] = '1.25' + CustomizationService.REM_STRING;
        themeVars[CustomizationService.LINE_HEIGHT_MD_KEY] = '1.5' + CustomizationService.REM_STRING;
        themeVars[CustomizationService.LINE_HEIGHT_LG_KEY] = '1.75' + CustomizationService.REM_STRING;
        themeVars[CustomizationService.LINE_HEIGHT_XL_KEY] = '2' + CustomizationService.REM_STRING;
        themeVars[CustomizationService.LINE_HEIGHT_2XL_KEY] = '2.25' + CustomizationService.REM_STRING;

        // Font weight
        themeVars['--pep-font-weight-normal'] = 400;
        themeVars['--pep-font-weight-bold'] = 600;
        themeVars['--pep-font-weight-bolder'] = 800;
    }

    getDefaultThemeButtonsVariables(themeVars: any) {
        themeVars['--pep-button-2xs-horizontal-spacing'] = '0.25' + CustomizationService.REM_STRING;
        themeVars['--pep-button-2xs-min-width'] = '1' + CustomizationService.REM_STRING;
        themeVars['--pep-button-2xs-height'] = '1' + CustomizationService.REM_STRING;
        themeVars['--pep-button-2xs-font-size'] = 'var(' + CustomizationService.FONT_SIZE_2XS_KEY + ')';
        // themeVars['--pep-button-2xs-icon-horizontal-spacing'] = '0.125' + CustomizationService.REM_STRING;

        themeVars['--pep-button-xs-horizontal-spacing'] = '0.5' + CustomizationService.REM_STRING;
        themeVars['--pep-button-xs-min-width'] = '2' + CustomizationService.REM_STRING;
        themeVars['--pep-button-xs-height'] = '1.5' + CustomizationService.REM_STRING;
        themeVars['--pep-button-xs-font-size'] = 'var(' + CustomizationService.FONT_SIZE_XS_KEY + ')';
        // themeVars['--pep-button-xs-icon-horizontal-spacing'] = '0.25' + CustomizationService.REM_STRING;

        themeVars['--pep-button-sm-horizontal-spacing'] = '0.75' + CustomizationService.REM_STRING;
        themeVars['--pep-button-sm-min-width'] = '2' + CustomizationService.REM_STRING;
        themeVars['--pep-button-sm-height'] = '2' + CustomizationService.REM_STRING;
        themeVars['--pep-button-sm-font-size'] = 'var(' + CustomizationService.FONT_SIZE_SM_KEY + ')';
        // themeVars['--pep-button-sm-icon-horizontal-spacing'] = '0.5' + CustomizationService.REM_STRING;

        themeVars['--pep-button-md-horizontal-spacing'] = '1' + CustomizationService.REM_STRING;
        themeVars['--pep-button-md-min-width'] = '2.5' + CustomizationService.REM_STRING;
        themeVars['--pep-button-md-height'] = '2.5' + CustomizationService.REM_STRING;
        themeVars['--pep-button-md-font-size'] = 'var(' + CustomizationService.FONT_SIZE_MD_KEY + ')';
        // themeVars['--pep-button-md-icon-horizontal-spacing'] = '0.5' + CustomizationService.REM_STRING;

        themeVars['--pep-button-lg-horizontal-spacing'] = '1' + CustomizationService.REM_STRING;
        themeVars['--pep-button-lg-min-width'] = '3' + CustomizationService.REM_STRING;
        themeVars['--pep-button-lg-height'] = '3' + CustomizationService.REM_STRING;
        themeVars['--pep-button-lg-font-size'] = 'var(' + CustomizationService.FONT_SIZE_LG_KEY + ')';
        // themeVars['--pep-button-lg-icon-horizontal-spacing'] = '0.75' + CustomizationService.REM_STRING;

        themeVars['--pep-button-xl-horizontal-spacing'] = '1.5' + CustomizationService.REM_STRING;
        themeVars['--pep-button-xl-min-width'] = '5' + CustomizationService.REM_STRING;
        themeVars['--pep-button-xl-height'] = '4' + CustomizationService.REM_STRING;
        themeVars['--pep-button-xl-font-size'] = 'var(' + CustomizationService.FONT_SIZE_XL_KEY + ')';
        // themeVars['--pep-button-xl-icon-horizontal-spacing'] = '1' + CustomizationService.REM_STRING;
    }

    getSystemPrimaryInvertColorsVariables(themeVars: any) {
        themeVars[CustomizationService.COLOR_SYSTEM_PRIMARY_INVERT_KEY + '-h'] = '255';
        themeVars[CustomizationService.COLOR_SYSTEM_PRIMARY_INVERT_KEY + '-s'] = '100%';
        themeVars[CustomizationService.COLOR_SYSTEM_PRIMARY_INVERT_KEY + '-l'] = '100%';
    }

    getSystemPrimaryColorsVariables(themeVars: any) {
        themeVars[CustomizationService.COLOR_SYSTEM_PRIMARY_KEY + '-h'] = '0';
        themeVars[CustomizationService.COLOR_SYSTEM_PRIMARY_KEY + '-s'] = '0%';
        themeVars[CustomizationService.COLOR_SYSTEM_PRIMARY_KEY + '-l'] = '10%';
    }

    getSystemSuccessColorsVariables(themeVars: any) {
        themeVars[CustomizationService.COLOR_SYSTEM_SUCCESS_KEY + '-h'] = '100';
        themeVars[CustomizationService.COLOR_SYSTEM_SUCCESS_KEY + '-s'] = '100%';
        themeVars[CustomizationService.COLOR_SYSTEM_SUCCESS_KEY + '-l'] = '25%';
    }

    getSystemCautionColorsVariables(themeVars: any) {
        themeVars[CustomizationService.COLOR_SYSTEM_CAUTION_KEY + '-h'] = '360';
        themeVars[CustomizationService.COLOR_SYSTEM_CAUTION_KEY + '-s'] = '100%';
        themeVars[CustomizationService.COLOR_SYSTEM_CAUTION_KEY + '-l'] = '40%';
    }

    getUserPrimaryColorsVariables(themeVars: any) {
        themeVars[CustomizationService.COLOR_USER_PRIMARY_KEY + '-h'] = '78';
        themeVars[CustomizationService.COLOR_USER_PRIMARY_KEY + '-s'] = '87%';
        themeVars[CustomizationService.COLOR_USER_PRIMARY_KEY + '-l'] = '27%';
    }

    getUserSecondaryColorsVariables(themeVars: any) {
        themeVars[CustomizationService.COLOR_USER_SECONDARY_KEY + '-h'] = '77';
        themeVars[CustomizationService.COLOR_USER_SECONDARY_KEY + '-s'] = '87%';
        themeVars[CustomizationService.COLOR_USER_SECONDARY_KEY + '-l'] = '42%';
    }

    getWeakColorsVariables(themeVars: any) {
        themeVars[CustomizationService.COLOR_WEAK_KEY + '-h'] = 'var(' + CustomizationService.COLOR_SYSTEM_PRIMARY_KEY + '-h)';
        themeVars[CustomizationService.COLOR_WEAK_KEY + '-s'] = 'var(' + CustomizationService.COLOR_SYSTEM_PRIMARY_KEY + '-s)';
        themeVars[CustomizationService.COLOR_WEAK_KEY + '-l'] = 'var(' + CustomizationService.COLOR_SYSTEM_PRIMARY_KEY + '-l)';
    }

    getRegularColorsVariables(themeVars: any) {
        themeVars[CustomizationService.COLOR_REGULAR_KEY + '-h'] = 'var(' + CustomizationService.COLOR_SYSTEM_PRIMARY_KEY + '-h)';
        themeVars[CustomizationService.COLOR_REGULAR_KEY + '-s'] = 'var(' + CustomizationService.COLOR_SYSTEM_PRIMARY_KEY + '-s)';
        themeVars[CustomizationService.COLOR_REGULAR_KEY + '-l'] = 'var(' + CustomizationService.COLOR_SYSTEM_PRIMARY_KEY + '-l)';
    }

    getStrongColorsVariables(themeVars: any) {
        themeVars[CustomizationService.COLOR_STRONG_KEY + '-h'] = 'var(' + CustomizationService.COLOR_USER_PRIMARY_KEY + '-h)';
        themeVars[CustomizationService.COLOR_STRONG_KEY + '-s'] = 'var(' + CustomizationService.COLOR_USER_PRIMARY_KEY + '-s)';
        themeVars[CustomizationService.COLOR_STRONG_KEY + '-l'] = 'var(' + CustomizationService.COLOR_USER_PRIMARY_KEY + '-l)';
    }

    getTextColorsVariables(themeVars: any) {
        themeVars[CustomizationService.COLOR_TEXT_LINK_KEY + '-h'] = '207';
        themeVars[CustomizationService.COLOR_TEXT_LINK_KEY + '-s'] = '76%';
        themeVars[CustomizationService.COLOR_TEXT_LINK_KEY + '-l'] = '37%';
    }

    getDefaultThemeColorsVariables(themeVars: any) {
        // System primary invert colors.
        this.getSystemPrimaryInvertColorsVariables(themeVars);
        // System primary colors.
        this.getSystemPrimaryColorsVariables(themeVars);
        // System success colors.
        this.getSystemSuccessColorsVariables(themeVars);
        // System caution colors.
        this.getSystemCautionColorsVariables(themeVars);
        // User primary colors.
        this.getUserPrimaryColorsVariables(themeVars);
        // User secondary colors.
        this.getUserSecondaryColorsVariables(themeVars);

        // Weak colors.
        this.getWeakColorsVariables(themeVars);
        // Regular colors.
        this.getRegularColorsVariables(themeVars);
        // Strong colors.
        this.getStrongColorsVariables(themeVars);

        // Text colors.
        this.getTextColorsVariables(themeVars);
    }

    getDefaultThemeShadowsVariables(themeVars: any) {
        const noneOffset = '0';
        themeVars[CustomizationService.SHADOW_NONE_OFFSET_KEY] = noneOffset;

        const xsOffset = '0 0.125rem 0.25rem 0';
        themeVars[CustomizationService.SHADOW_XS_OFFSET_KEY] = xsOffset;

        const smOffset = '0 0.25rem 0.5rem 0';
        themeVars[CustomizationService.SHADOW_SM_OFFSET_KEY] = smOffset;

        const mdOffset = '0 0.5rem 1rem 0';
        themeVars[CustomizationService.SHADOW_MD_OFFSET_KEY] = mdOffset;

        const lgOffset = '0 1rem 2rem 0';
        themeVars[CustomizationService.SHADOW_LG_OFFSET_KEY] = lgOffset;

        const xlOffset = '0 2rem 4rem 0';
        themeVars[CustomizationService.SHADOW_XL_OFFSET_KEY] = xlOffset;
    }

    getDefaultThemeFormCustomizationVariables(themeVars: any) {
        const formFieldSpacing = 1;
        themeVars[CustomizationService.FORM_FIELD_HEIGHT_KEY] = '2.5' + CustomizationService.REM_STRING;
        themeVars[CustomizationService.FORM_FIELD_TITLE_HEIGHT_KEY] = '1.5' + CustomizationService.REM_STRING;
        themeVars[CustomizationService.FORM_SPACEING_KEY] = formFieldSpacing + CustomizationService.REM_STRING;
        themeVars[CustomizationService.FORM_FIELD_SPACEING_KEY] = formFieldSpacing + CustomizationService.REM_STRING;
    }

    getDefaultThemeCardCustomizationVariables(themeVars: any) {
        themeVars[CustomizationService.CARD_FIELD_HEIGHT_KEY] = '1.5' + CustomizationService.REM_STRING;
        themeVars[CustomizationService.CARD_SPACEING_KEY] = 'var(' + CustomizationService.SPACING_SIZE_XS_KEY + ')';

        themeVars[CustomizationService.CARD_BORDER_RADIUS_KEY] = 'var(' + CustomizationService.BORDER_RADIUS_MD_KEY + ')';
        themeVars[CustomizationService.CARD_SHADOW_OFFSET_KEY] = 'var(' + CustomizationService.SHADOW_MD_OFFSET_KEY + ')';
    }

    getDefaultThemeTableCustomizationVariables(themeVars: any) {
        themeVars[CustomizationService.TABLE_FIELD_HEIGHT_KEY] = '2' + CustomizationService.REM_STRING;
        themeVars[CustomizationService.TABLE_SPACEING_KEY] = '0.5' + CustomizationService.REM_STRING;
        themeVars[CustomizationService.TABLE_BORDER_RADIUS_KEY] = 'var(' + CustomizationService.BORDER_RADIUS_MD_KEY + ')';
    }

    getDefaultThemeQSCustomizationVariables(themeVars: any) {
        const qsState = STYLE_TYPE.Regular;
        themeVars[CustomizationService.STYLE_QS_KEY] = qsState;

        themeVars[CustomizationService.COLOR_QS_KEY + '-h'] = 'var(' + CustomizationService.COLOR_SYSTEM_PRIMARY_KEY + '-h)';
        themeVars[CustomizationService.COLOR_QS_KEY + '-s'] = 'var(' + CustomizationService.COLOR_SYSTEM_PRIMARY_KEY + '-s)';
        themeVars[CustomizationService.COLOR_QS_KEY + '-l'] = 'var(' + CustomizationService.COLOR_SYSTEM_PRIMARY_KEY + '-l)';
    }

    getDefaultThemeTopHeaderCustomizationVariables(themeVars: any) {
        const topHeaderState = STYLE_TYPE.Strong;
        themeVars[CustomizationService.STYLE_TOP_HEADER_KEY] = topHeaderState;

        themeVars[CustomizationService.COLOR_TOP_HEADER_KEY + '-h'] = '';
        themeVars[CustomizationService.COLOR_TOP_HEADER_KEY + '-s'] = '';
        themeVars[CustomizationService.COLOR_TOP_HEADER_KEY + '-l'] = '';
    }

    getDefaultThemeVariables() {
        const themeVars = {};

        // Declare default layout.
        this.getDefaultThemeLayoutVariables(themeVars);

        // Declare default border radius.
        this.getDefaultThemeBorderRadiusVariables(themeVars);

        // Declare default spacing.
        this.getDefaultThemeSpacingVariables(themeVars);

        // Declare default fonts size & line height.
        this.getDefaultThemeFontsVariables(themeVars);

        // Declare default buttons.
        this.getDefaultThemeButtonsVariables(themeVars);

        // Declare default colors.
        this.getDefaultThemeColorsVariables(themeVars);

        // Declare default shadows.
        this.getDefaultThemeShadowsVariables(themeVars);

        // Declare default form customization.
        this.getDefaultThemeFormCustomizationVariables(themeVars);

        // Declare default card customization.
        this.getDefaultThemeCardCustomizationVariables(themeVars);

        // Declare default table customization.
        this.getDefaultThemeTableCustomizationVariables(themeVars);

        // Declare default qs customization.
        this.getDefaultThemeQSCustomizationVariables(themeVars);

        // Declare default top header customization.
        this.getDefaultThemeTopHeaderCustomizationVariables(themeVars);

        return themeVars;
    }

    getThemeVariables() {
        const ret = this.getDefaultThemeVariables();
        const themeVars = JSON.parse(sessionStorage.getItem(CustomizationService.USER_THEME_VARIABLES));

        // Override defaults.
        if (themeVars) {
            // tslint:disable-next-line: forin
            for (const key in themeVars) {
                ret[key] = themeVars[key];
            }
        }

        return ret;
    }

    setThemeVariables(themeVariablesToSet = null) {
        const themeVariables = this.getThemeVariables();

        // Override defaults.
        if (themeVariablesToSet) {
            // tslint:disable-next-line: forin
            for (const key in themeVariablesToSet) {
                themeVariables[key] = themeVariablesToSet[key];
            }
        }

        sessionStorage.setItem(CustomizationService.USER_THEME_VARIABLES, JSON.stringify(themeVariables));

        // tslint:disable-next-line: forin
        for (const key in themeVariables) {
            document.documentElement.style.setProperty(key, themeVariables[key]);
        }
    }

    getThemeVariable(key: string) {
        const themeVars = this.getThemeVariables();

        if (themeVars.hasOwnProperty(key)) {
            return themeVars[key];
        } else {
            return '';
        }
    }

    getNumberThemeVariable(themeVars, key: string) {
        if (themeVars && themeVars.hasOwnProperty(key)) {
            // If it's reference to another key.
            if (themeVars[key].indexOf('var(') === 0) {
                key = themeVars[key].substr(4).split(')')[0];
            }

            const tmp = Number(themeVars[key].replace(CustomizationService.REM_STRING, ''));
            return tmp;
        } else {
            return 0;
        }
    }

    setFooterHeight(height) {
        const self = this;
        if (this.footerHeight.getValue() !== height) {
            //it is publishing this value to all the subscribers that have already subscribed to this message
            setTimeout(() => self.footerHeight.next(height), 0);
        }
        document.documentElement.style.setProperty(CustomizationService.FOOTER_HEIGHT_KEY, height + CustomizationService.REM_STRING);
    }

    setDefaultFooterHeight() {
        const themeVars = this.getThemeVariables();

        const res =
            this.getNumberThemeVariable(themeVars, CustomizationService.FOOTER_BAR_SPACING_TOP_KEY) +
            this.getNumberThemeVariable(themeVars, CustomizationService.FOOTER_BAR_SPACING_BOTTOM_KEY) +
            this.getNumberThemeVariable(themeVars, CustomizationService.TOP_BAR_FIELD_HEIGHT_KEY);

        this.setFooterHeight(res);
    }

    getTopBarHeight() {
        const themeVars = this.getThemeVariables();

        const res =
            this.getNumberThemeVariable(themeVars, CustomizationService.TOP_BAR_SPACING_TOP_KEY) +
            this.getNumberThemeVariable(themeVars, CustomizationService.TOP_BAR_SPACING_BOTTOM_KEY) +
            this.getNumberThemeVariable(themeVars, CustomizationService.TOP_BAR_FIELD_HEIGHT_KEY);

        return res;
    }

    setOldUserTheme(res: any) {
        // Added user theme.
        const themeObj = {
            Theme: res.Theme || 'default-theme',
        };

        sessionStorage.setItem(CustomizationService.USER_THEME, JSON.stringify(themeObj));

        let spinnerColor;
        let brandingFontColor;

        if (this.isLightColor(res.BrandingMainColor)) {
            spinnerColor = CustomizationService.DEFAULT_SPINNER_COLOR;
            brandingFontColor = '#222';
        } else {
            spinnerColor = res.BrandingMainColor;
            brandingFontColor = CustomizationService.DEFAULT_BRANDING_COLOR;
        }

        const color = {
            BrandingSecondaryColor: res.BrandingSecondaryColor,
            BrandingMainColor: res.BrandingMainColor,
            BrandingFontColor: brandingFontColor,
            SpinnerColor: spinnerColor,
        };
        sessionStorage.setItem(CustomizationService.USER_COLOR, JSON.stringify(color));

        this.hasCustomHeader = res.TopHeaderFiles && res.TopHeaderFiles.length > 0 && res.TopHeaderFiles[0] !== '' ? true : false;
        this.hasCustomHomepage = res.UserRole === 'Buyer' && res.TopHeaderFiles && res.TopHeaderFiles.length > 1 && res.TopHeaderFiles[1] !== '';
    }

    isLegacyColor() {
        const h = document.documentElement.style.getPropertyValue(CustomizationService.COLOR_TOP_HEADER_KEY + '-h');
        const s = document.documentElement.style.getPropertyValue(CustomizationService.COLOR_TOP_HEADER_KEY + '-s');
        const l = document.documentElement.style.getPropertyValue(CustomizationService.COLOR_TOP_HEADER_KEY + '-l');

        return !(h && s && l);
    }

    getLoadingSpinnerColor() {
        let spinnerColor = '';

        if (this.isLegacyColor()) {
            const color = JSON.parse(sessionStorage.getItem(CustomizationService.USER_COLOR));

            if (color && color.SpinnerColor) {
                spinnerColor = color.SpinnerColor;
            } else {
                spinnerColor = CustomizationService.DEFAULT_SPINNER_COLOR;
            }
        }

        return spinnerColor;
    }

    getBrandingMainColor() {
        let brandingMainColor = '';

        if (this.isLegacyColor()) {
            const color = JSON.parse(sessionStorage.getItem(CustomizationService.USER_COLOR));

            if (color && color.BrandingMainColor) {
                brandingMainColor = color.BrandingMainColor;
            } else {
                brandingMainColor = CustomizationService.DEFAULT_BRANDING_COLOR;
            }
        }

        return brandingMainColor;
    }

    isLightColor(hex_color) {
        if (!hex_color) {
            return;
        }

        let isBright = false,
            sum = 0,
            c = hex_color.replace(/^#/, '');

        sum = parseInt(c[0] + c[1], 16);
        sum += parseInt(c[2] + c[3], 16);
        sum += parseInt(c[4] + c[5], 16);

        if (sum > 382.6) {
            // it's bright color
            isBright = true;
        }

        return isBright;
    }
}
