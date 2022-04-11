import localForage from "localforage";

import * as K from "../constants/constants";

import { Notify } from 'quasar';
import { Dialog } from 'quasar';


export const hkDateText = (aDate = "", showMin = false) => {
    if (aDate == "") {
        aDate = new Date(Date.now());
    } else {
        aDate = new Date(aDate);
    };
    var timePart = new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'medium' }).format(aDate)
    timePart = timePart.slice(-8, timePart.length);
    if (!showMin) {
        timePart = timePart.slice(0, -3);
    };
    let offset = aDate.getTimezoneOffset();
    aDate = new Date(aDate.getTime() - (offset * 60 * 1000))
    const datePart = aDate.toISOString().split('T')[0];
    return `${datePart} ${timePart}`
};



export const storage = {
    set: async(name, value) => {
        localForage.setDriver([localForage.INDEXEDDB, localForage.LOCALSTORAGE]);
        if (typeof value == "object") {
            value = JSON.stringify(value)
        } else {
            value = value.toString();
        }
        try {
            await localForage.setItem(name, value);
            K.print(`saved: ${name}`);
            return true
        } catch (err) {
            K.error(err);
            return false
        }
    },
    get: async(name) => {
        localForage.setDriver([localForage.INDEXEDDB, localForage.LOCALSTORAGE]);
        try {
            const value = await localForage.getItem(name);
            return value
        } catch (err) {
            K.error(err);
            return null
        }
    },
    remove: async(name) => {
        localForage.setDriver([localForage.INDEXEDDB, localForage.LOCALSTORAGE]);
        try {
            await localForage.removeItem(name)
            K.print(`${name} removed`)
        } catch (err) {
            K.error(err.message)
        }
    },
    clear: async() => {
        localForage.setDriver([localForage.INDEXEDDB, localForage.LOCALSTORAGE]);
        try {
            await localForage.clear()
            K.print(`cleared`)
        } catch (err) {
            K.error(err.message)
        }
    }
};

export const getPWADisplayMode = () => {
    const isStandalone = window.matchMedia(
        "(display-mode: standalone)"
    ).matches;
    if (document.referrer.startsWith("android-app://")) {
        return "twa";
    } else if (navigator.standalone || isStandalone) {
        return "standalone";
    }
    return "browser";
};

export const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export const decodeLHS = function(msg) {
    if (typeof msg === 'string' && msg.slice(0, 5) === "HKEN:") {
        const HKEN = msg.slice(0, 5)
        const LocateID = msg.slice(5, 14)
        try {
            const hash = msg.slice(14, )
            const decodedMsg = JSON.parse(Buffer.from(hash, 'base64').toString())
            return decodedMsg
        } catch (err) {
            console.error("Invalid QR code")
            return null
        }
    } else return null
};


export const notifyHandler = (options) => {
    return Notify.create(options)
};

export const dialogHandler = (options) => {
    return Dialog.create(options);
};

export const clearCamera = () => {

    try {
        window.localStream
            .stop()
            .then((ignore) => {
                // QR Code scanning is stopped.
            })
            .catch((err) => {
                // Stop failed, handle it.
            });
    } catch {}
};