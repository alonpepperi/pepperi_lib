import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { TranslateModule, TranslateLoader, MissingTranslationHandler, MissingTranslationHandlerParams } from '@ngx-translate/core';

import { CustomizationService, SessionService } from './core';

export class Loader implements TranslateLoader {
    private translations = new Subject();
    $translations = this.translations.asObservable();
    getTranslation(lang: string) {
        console.log(`called with ${lang}`);
        return this.$translations;
    }
}

export class Missing implements MissingTranslationHandler {
    handle(params: MissingTranslationHandlerParams) {
        return '... and many more';
    }
}

export function LoaderFactory() {
    return new Loader();
}

@NgModule({
    declarations: [
        // AttachDirective,
        // TargetDirective,
        // RtlClassDirective,
        // pipesArray,
        // customizatoionComponenetsArray,
        // GroupButtonsComponent,
    ],
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        // ReactiveFormsModule,
        // FormsModule,
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: LoaderFactory
            },
            missingTranslationHandler: {
                provide: MissingTranslationHandler,
                useClass: Missing
            }
        }),
    ],
    exports: [
        TranslateModule
        // customizatoionComponenetsArray,
    ],
})
export class PepperiModule {
    // static forRoot(): ModuleWithProviders<PepperiModule> {
    //     return {
    //         ngModule: PepperiModule,
    //         providers: [SessionService]
    //     };
    // }

    // static forRoot() {
    //     return {
    //       ngModule: PepperiModule,
    //       providers: [ CustomizationService, SessionService ]
    //     }
    // }
}
