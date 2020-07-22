
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MatCommonModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { PepperiModule } from '@pepperi/lib';
import { PepperiTextboxIconModule } from '@pepperi/lib/textbox-icon';
import { PepperiFieldTitleModule } from '@pepperi/lib/field-title';

import { PepperiTextboxComponent} from './textbox.component';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        // Material modules,
        MatCommonModule,
        MatFormFieldModule,
        MatInputModule,
        // Pepperi modules
        PepperiModule,
        PepperiFieldTitleModule,
        PepperiTextboxIconModule
    ],
    exports: [PepperiTextboxComponent, ],
    declarations: [PepperiTextboxComponent],
})
export class PepperiTextboxModule {}
