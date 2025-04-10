export class Utils {
    constructor() {}

    static DeviceType = {
        Android: "Android",
        iOS: "iOS",
        Windows: "Windows",
        Other: "Other"
    }

    static GetDeviceType() {
        if (/Android/i.test(navigator.userAgent)){
            return this.DeviceType.Android
        }
        else if (/iPhone|iPad|iPod/i.test(navigator.userAgent)){
            return this.DeviceType.iOS
        }
        else if (/Windows/i.test(navigator.userAgent)){
            return this.DeviceType.Windows
        }
        else {
            return this.DeviceType.Other
        }
    }
}