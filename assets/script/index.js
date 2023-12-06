'user strict'

function onEvent(event, selector, callback){
    return selector.addEventListener(event,callback);
}

function select(selector,parent = document){
    return parent.querySelector(selector);
}

function selectById(selector,parent = document){
    return parent.getElementById(selector);
}

function selectAll(selector,parent = document){
    return [...parent.querySelectorAll(selector)];
}

function create(element,parent=document){
    return parent.createElement(element);
}

const model = selectById('model');
const divCookie = selectById('div-cookie');
const divSetting = selectById('div-setting');
const modalContainer = select('.modal-container');
const center = select('.center');
const setting = selectById('setting');
const accept = selectById('accept');
const browser = selectById('browser');
const os = selectById('os');
const screenW = selectById('screenW');
const screenH = selectById('screenH');
const btnSave = selectById('save');


onEvent('load',window,function(){
    if (!document.cookie) {
        modalContainer.classList.add('model_show');
        model.classList.add('modal-transform');
        center.classList.add('filter');
    }
});

onEvent('click', accept, function(){
    setCookie('Browser', getBrowser(), 15);
    setCookie('OS', getOS(), 15);
    setCookie('ScreenW', window.innerWidth, 15);
    setCookie('ScreenH', window.innerHeight, 15);

    console.log(`Browser: ${getCookie('Browser')}`);
    console.log(`OS: ${getCookie('OS')}`);
    console.log(`ScreenWidth: ${getCookie('ScreenW')}`);
    console.log(`ScreenHeight: ${getCookie('ScreenH')}`);

    modalContainer.classList.remove('model_show');
    model.classList.remove('modal-transform');
    center.classList.remove('filter');

});

onEvent('click',btnSave, function() {
    setCookie('Browser', browser.checked ? getBrowser() : 'rejects', 15);
    setCookie('OS', os.checked ? getOS() : 'rejects', 15);
    setCookie('ScreenW', screenW.checked ? window.innerWidth : 'rejects', 15);
    setCookie('ScreenH', screenH.checked ? window.innerHeight : 'rejects', 15);
    
    console.log(`Browser: ${getCookie('Browser')}`);
    console.log(`OS: ${getCookie('OS')}`);
    console.log(`ScreenWidth: ${getCookie('ScreenW')}`);
    console.log(`ScreenHeight: ${getCookie('ScreenH')}`);
    
    modalContainer.classList.remove('model_show');
    model.classList.remove('modal-transform');
    center.classList.remove('filter');
    divSetting.style.display = 'none';
    divCookie.style.display = 'block';
});

onEvent('click',setting, function() {
    divSetting.style.display = 'block';
    divCookie.style.display = 'none';
    /*
    let browserCookie = getCookie('Browser');
    let osCookie = getCookie('OS');
    let screenWCookie = getCookie('ScreenW');
    let screenHCookie = getCookie('ScreenH');

    if (browserCookie != 'rejects' && browserCookie != null) {
        browser.checked = true;
    }else{
        browser.checked = false;
    }
    if (osCookie != 'rejects' && osCookie != null) {
        os.checked = true;
    }else{
        browser.checked = false;
    }
    if (screenWCookie != 'rejects' && screenWCookie != null) {
        screenW.checked = true;
    }else{
        browser.checked = false;
    }
    if (screenHCookie != 'rejects' && screenHCookie != null) {
        screenH.checked = true;
    }else{
        browser.checked = false;
    }
    */
});

function setCookie(name, value, time) {
    document.cookie = `${name}=${value}; path=/; max-age=${time}; SameSite=Lax`;
}

function getCookie(name, value) {
    if(document.cookie.length > 0) {
        const cookies = document.cookie.split('; ');
        for (let i = 0; i< cookies.length; i++) {
            let cookieArray = cookies[i].split('=');
            if(cookieArray[0] == name)
                return cookieArray[1];
        }
    }
    return null;
}

function getBrowser() {
    let platformInfo = navigator.userAgent;
    if(platformInfo.indexOf('Firefox') !== -1){
        return 'Firefox';
    }
    if (platformInfo.indexOf('Edg') !== -1){
        return 'Microsoft Edge';
    }
    if (platformInfo.indexOf('Safari') !== -1){
        return 'Safari';
    }
    if (platformInfo.indexOf('Chrome') !== -1){
        return 'Chrome';
    }
    if (platformInfo.indexOf('Opera') !== -1){
        return 'Opera';
    }
    return 'Unknow';
}

function getOS(){
    let platformInfo = navigator.userAgent;
    if(platformInfo.indexOf('Mac OS') !== -1)
        return 'Mac OS';
    if(platformInfo.indexOf('Windows') !== -1)
        return 'Windows';
    return 'unknow OS';
}
