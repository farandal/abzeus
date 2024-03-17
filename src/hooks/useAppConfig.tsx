import { useState, useEffect } from 'react';

const userAgent = navigator.userAgent.toLowerCase();
const isElectron = userAgent.indexOf(' electron/') > -1;

function getVersion() {
    return process.env.APP_VERSION || "";
}

const useAppConfig = () => {

    return {
        version:getVersion(),
        isElectron: isElectron
    };
}

export default useAppConfig;