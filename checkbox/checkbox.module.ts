import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MatCommonModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';

import { PepperiModule } from '@pepperi/lib';
import { PepperiFieldTitleModule } from '@pepperi/lib/field-title';

import { PepperiCheckboxComponent } from './checkbox.component';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        // Material modules
        MatCommonModule,
        MatFormFieldModule,
        MatCheckboxModule,
        MatIconModule,
        // Pepperi modules
        PepperiModule,
        PepperiFieldTitleModule
    ],
    exports: [ PepperiCheckboxComponent ],
    declarations: [ PepperiCheckboxComponent ],
})
export class PepperiCheckboxModule {}
