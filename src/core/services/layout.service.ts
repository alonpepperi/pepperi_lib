import { Injectable } from '@angular/core';

export enum ORIENTATION {
    Landscape,
    Portrait,
}
export enum DEVICE_SIZE {
    ExtraLarge,
    Large,
    Medium,
    Small,
    ExtraSmall,
}

@Injectable({
    providedIn: 'root',
})
export class LayoutService {
    deviceSize: DEVICE_SIZE;

    constructor() { }

    public getOrintation() {
        if (window.innerHeight > window.innerWidth) {
            return ORIENTATION.Portrait;
        } else {
            return ORIENTATION.Landscape;
        }
    }

    public getDeviceSize() {
        // TODO:
        // const size = $('#users-device-size').find('div:visible').first().attr('id');
        const size = 'm' + 'd';
        let sizeToReturn = DEVICE_SIZE.Large;

        switch (size) {
            case 'xs':
                sizeToReturn = DEVICE_SIZE.ExtraSmall;
                break;
            case 'sm':
                sizeToReturn = DEVICE_SIZE.Small;
                break;
            case 'md':
                sizeToReturn = DEVICE_SIZE.Medium;
                break;
            case 'lg':
                sizeToReturn = DEVICE_SIZE.Large;
                break;
            case 'xl':
                sizeToReturn = DEVICE_SIZE.ExtraLarge;
                break;
            default:
                sizeToReturn = DEVICE_SIZE.Large;
                break;
        }

        this.deviceSize = sizeToReturn;

        return this.deviceSize;
    }

    public getScreenWidth() {
        let retVal = 250.0;
        switch (this.getDeviceSize()) {
            case DEVICE_SIZE.ExtraSmall: {
                retVal = this.getOrintation() == ORIENTATION.Landscape ? 130.0 : 65.0;
                break;
            }
            case DEVICE_SIZE.Small:
            case DEVICE_SIZE.Medium: {
                retVal = this.getOrintation() == ORIENTATION.Landscape ? 220.0 : 140.0;
                break;
            }
            case DEVICE_SIZE.Large: {
                retVal = this.getOrintation() == ORIENTATION.Landscape ? 400.0 : 250.0;
                break;
            }
        }
        return retVal;
    }

    public getScreenHeight() {
        let retVal = 250.0;
        switch (this.getDeviceSize()) {
            case DEVICE_SIZE.ExtraSmall: {
                retVal = this.getOrintation() == ORIENTATION.Landscape ? 65.0 : 130.0;
                break;
            }
            case DEVICE_SIZE.Small:
            case DEVICE_SIZE.Medium: {
                retVal = this.getOrintation() == ORIENTATION.Landscape ? 140.0 : 220.0;
                break;
            }
            case DEVICE_SIZE.Large: {
                retVal = this.getOrintation() == ORIENTATION.Landscape ? 250.0 : 400.0;
                break;
            }
        }
        return retVal;
    }

    getScreenHeightPx() {
        return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    }

    getScreenWidthPx() {
        return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    }
}
