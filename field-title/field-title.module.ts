import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCommonModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';

import { PepperiFieldTitleComponent } from './field-title.component';

@NgModule({
    imports: [
        CommonModule,
        // Material modules,
        MatFormFieldModule,
        MatCommonModule,
    ],
    exports: [PepperiFieldTitleComponent],
    declarations: [PepperiFieldTitleComponent],
})
export class PepperiFieldTitleModule {}
