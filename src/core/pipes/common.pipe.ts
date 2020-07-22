import {Pipe, PipeTransform} from "@angular/core";
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({ name: 'capitalize' })
export class CapitalizePipe implements PipeTransform {

    transform(value: any) {
        if (value) {
            return value.charAt(0).toUpperCase() + value.slice(1);
        }  
        return value;
    }

}

@Pipe({ name: 'encodePipe' })
export class EncodePipe implements PipeTransform {

    transform(value: any) {
        if (value) {
            var v = btoa(value);
            return v;
        }
        return value;
    }
}

declare function escape(s: string): string;

@Pipe({ name: 'escapePipe' })
export class EscapePipe implements PipeTransform {

    transform(value: any) {
        if (value) {
            var v = escape(value);
            return v;
        }
        return value;
    }
}

@Pipe({ name: 'replaceLineBreaks' })
export class ReplaceLineBreaks implements PipeTransform {
    transform(value: string): string {
        let newValue = value.replace(/(<br\ ?\/?>)/g, ' ');
        return newValue;
    }
}

@Pipe({ name: 'quantitySelectorNumber' })
export class QuantitySelectorNumber implements PipeTransform {

    transform(value: string, allowDecimal: boolean): string {

        let tmpValue = parseFloat(value);

        if (tmpValue == 0) {
            return "0";
        }
        else if (allowDecimal) {
            return tmpValue.toString();
        }
        else {
            return parseInt(value).toString();
        }
    }
}

@Pipe({ name: 'dateFormatter' })
export class DateFormatter implements PipeTransform {
    transform(value: Date, culture: any, showTime: boolean = false): string {
        var res = "";
        value = new Date(value);
        if (value) {
            res = value.toLocaleDateString(culture || 'en-US');
            if (showTime) {                
                res += " " + value.toLocaleTimeString((culture || 'en-US'), { hour: '2-digit', minute: '2-digit' });
            }
        }
        return res;
    }
}


@Pipe({ name: 'dateStringFormatter' })
export class DateStringFormatter implements PipeTransform {
    transform(value: string, culture: any, showTime: boolean = false): string {
        var res = "";
        let tmpDate = new Date(value);
        if (value) {
            res = tmpDate.toLocaleDateString(culture || 'en-US');
            if (showTime) {
                res += " " + tmpDate.toLocaleTimeString(culture || 'en-US');
            }
        }
        return res;
    }
}

@Pipe({ name: 'safeHtml' })
export class safeHtml implements PipeTransform {
    constructor(private sanitizer: DomSanitizer) { }

    transform(style) {
        return this.sanitizer.bypassSecurityTrustHtml(style);
        //return this.sanitizer.bypassSecurityTrustStyle(style);
        // return this.sanitizer.bypassSecurityTrustXxx(style); - see docs
    }
}

@Pipe({
    name: 'safe'
})
export class SafePipe implements PipeTransform {
    constructor(protected sanitizer: DomSanitizer) { }

    public transform(value: any, type: string): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl {
        switch (type) {
            case 'html': return this.sanitizer.bypassSecurityTrustHtml(value);

            case 'style': return this.sanitizer.bypassSecurityTrustStyle(value);

            case 'script': return this.sanitizer.bypassSecurityTrustScript(value);

            case 'url': return this.sanitizer.bypassSecurityTrustUrl(value);

            case 'resourceUrl': return this.sanitizer.bypassSecurityTrustResourceUrl(value);

            default: throw new Error(`Invalid safe type specified: ${type}`);

        }
    }
}

@Pipe({ name: 'splitUppercase' })
export class SplitUppercase implements PipeTransform {
    transform(value: string): string {
        let newValue = value.replace(/([a-z])([A-Z])/g, "$1 $2");
        return newValue;
    }
}
