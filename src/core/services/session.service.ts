import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class SessionService {
    svgIcons: string;

    constructor() {
        // TODO: Change getWebappDirectory to be local.
        this.svgIcons = `${this.getWebappDirectory()}/assets/images/symbol-defs.svg#icon-`;
    }

    getWebappDirectory() {
        const webappDirectory = sessionStorage.getItem('webappDirectory');
        return webappDirectory ? webappDirectory : '';
    }
}
