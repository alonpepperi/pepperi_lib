import {Injectable} from '@angular/core';

export enum FileTypeEnum {
    'Script' = 1,
    'Style' = 2,
}

export interface ExternalFileModel {
    path: string;
    type: FileTypeEnum;
}

declare var document: any;

@Injectable({
    providedIn: 'root',
})
export class FileService {
    private scripts: Map<string, {loaded: boolean; src: string}>;
    private styles: Map<string, {loaded: boolean; src: string}>;

    constructor() {
        this.scripts = new Map<string, {loaded: boolean; src: string}>();
        this.styles = new Map<string, {loaded: boolean; src: string}>();
    }

    loadFiles(files: ExternalFileModel[]) {
        var promises: any[] = [];
        files.forEach((file) => {
            if (file.type == FileTypeEnum.Style) {
                promises.push(this.loadStyle(file.path));
            } else if (file.type == FileTypeEnum.Script) {
                promises.push(this.loadScript(file.path));
            }
        });
        return Promise.all(promises);
    }

    removeFiles(files: ExternalFileModel[]) {
        for (let index: number = 0; index < files.length && files[index].path && files[index].path.trim() != ''; index++) {
            let name = this.getFileName(files[index].path, true);
            let element = document.getElementById(name);
            element.parentNode.removeChild(element);

            if (files[index].type == FileTypeEnum.Script && this.scripts.has(name)) {
                this.scripts.delete(name);
            } else if (files[index].type == FileTypeEnum.Style && this.styles.has(name)) {
                this.styles.delete(name);
            }
        }
    }

    loadScript(path: string) {
        return new Promise((resolve, reject) => {
            let name = this.getFileName(path, true);

            // If the script isn't exist add it.
            if (!this.scripts.has(name)) {
                this.scripts.set(name, {loaded: false, src: path});
            }

            let scriptItem = this.scripts.get(name);

            //resolve if already loaded
            if (scriptItem.loaded) {
                resolve({script: name, loaded: true, status: 'Already Loaded'});
            } else {
                //load script
                let script = document.createElement('script');
                script.type = 'text/javascript';
                script.src = scriptItem.src;
                script.setAttribute('id', name);
                script.async = false;

                if (script.readyState) {
                    //IE
                    script.onreadystatechange = () => {
                        if (script.readyState === 'loaded' || script.readyState === 'complete') {
                            script.onreadystatechange = null;
                            scriptItem.loaded = true;
                            resolve({path: path, type: FileTypeEnum.Script, loaded: true, status: 'Loaded'});
                        }
                    };
                } else {
                    //Others
                    script.onload = () => {
                        scriptItem.loaded = true;
                        resolve({path: path, type: FileTypeEnum.Script, loaded: true, status: 'Loaded'});
                    };
                }
                script.onerror = (error: any) => resolve({path: path, type: FileTypeEnum.Script, loaded: false, status: 'Loaded'});
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        });
    }

    loadStyle(path: string) {
        return new Promise((resolve, reject) => {
            let name = this.getFileName(path, true);

            // If the style isn't exist add it.
            if (!this.styles.has(name)) {
                this.styles.set(name, {loaded: false, src: path});
            }

            let styleItem = this.styles.get(name);

            //resolve if already loaded
            if (styleItem.loaded) {
                resolve({path: path, type: FileTypeEnum.Style, loaded: true, status: 'Already Loaded'});
            } else {
                //load style
                let style = document.createElement('link');
                style.type = 'text/css';
                style.rel = 'stylesheet';
                style.href = styleItem.src;
                style.media = 'all';
                style.setAttribute('id', name);

                styleItem.loaded = true;
                resolve({path: path, type: FileTypeEnum.Style, loaded: true, status: 'Loaded'});

                document.getElementsByTagName('head')[0].appendChild(style);
            }
        });
    }

    getFileName(filePath: string, withExtenstion: boolean = false): string {
        let lastIndex = withExtenstion ? filePath.length - 1 : filePath.lastIndexOf('.');

        return filePath.substr(filePath.lastIndexOf('/') + 1, lastIndex);
    }

    getFileExtension(filePath: string): string {
        var fileSplit = filePath.split('.');
        var fileExt = '';
        if (fileSplit.length > 1) {
            fileExt = fileSplit[fileSplit.length - 2];
        }
        return fileExt;
    }

    getNoImageSrc(webappHost) {
        // return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=';
        return webappHost + '/assets/images/no-image.svg';
    }

    /* Returns true if url is valid */
    isValidUrl(url: string) {
        /* Try creating a valid URL */
        try {
            const tmp = new URL(url);
            return true;
        } catch (e) {
            return false;
        }
    }

    convertFromb64toBlob(b64Data, contentType = '', sliceSize = 512) {
        const byteCharacters = atob(b64Data);
        const byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);

            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }

        const blob = new Blob(byteArrays, {type: contentType});
        return blob;
    }
}
