const STRIP_ANIMATION_DURATION = 2;
const STRIPS_ANIMATION_DELAY = 2.8;
const INTERVAL_IDS = [];
const STRIPS_NUM = 30;

document.addEventListener("DOMContentLoaded", loadStrips);

document.addEventListener("visibilitychange", handleAnimation);

function loadStrips() {
    setTimeout(() => {
        appendStrips(document.getElementById("img-strip"));
        animateStrip();
    }, STRIPS_ANIMATION_DELAY * 1000);
}

function appendStrips(parent) {
    const stripsContainer = document.createElement('div');
    stripsContainer.id = 'strips-container';

    for (let i = 0; i < STRIPS_NUM; i++) {
        stripsContainer.appendChild(createStrip());
    }

    parent.appendChild(stripsContainer);
}

function createStrip() {
    const strip = document.createElement('div');
    strip.className = 'strip';

    const lSectorContainer = document.createElement('div');
    lSectorContainer.className = 'l-sector-container';
    lSectorContainer.appendChild(createLSector());

    const rSectorContainer = document.createElement('div');
    rSectorContainer.className = 'r-sector-container';
    rSectorContainer.appendChild(createRSector());

    strip.appendChild(lSectorContainer);
    strip.appendChild(rSectorContainer);

    return strip;
}

function createLSector() {
    const lSector = document.createElement('div');
    lSector.className = 'l-sector';
    return lSector;
}

function createRSector() {
    const rSector = document.createElement('div');
    rSector.className = 'r-sector';
    return rSector;
}

function animateStrip() {
    let lscs = document.getElementsByClassName("l-sector-container");
    let rscs = document.getElementsByClassName("r-sector-container");

    randomAnimationStartUpDelay(lscs, rscs);

    initialStripsStartUp(lscs, rscs);

    initialStripsInterval(lscs, rscs);
}

function randomAnimationStartUpDelay(lscs, rscs) {
    for (let i = 0; i < lscs.length; i++) {
        let delay = ((Math.round((Math.random() * 2) * 100)) / 100).toString().concat("s");

        lscs[i].firstChild.style["animation-delay"] = delay;
        rscs[i].firstChild.style["animation-delay"] = delay;
    }
}

function initialStripsStartUp(lscs, rscs) {
    for (let i = 0; i < lscs.length; i++) {
        let rand_num = Math.round(((Math.random() * 8 + 1) / 10) * 100) / 100;

        lscs[i].style["flex-shrink"] = 1 - rand_num;
        rscs[i].style["flex-shrink"] = rand_num;
    }
}

function initialStripsInterval(lscs, rscs) {
    for (let i = 0; i < lscs.length; i++) {
        window.setTimeout(() => {
            stripsAnimationInterval(lscs[i], rscs[i]);
        }, (Number(lscs[i].firstChild.style["animation-delay"].slice(0, -1)) + STRIP_ANIMATION_DURATION) * 1000);
    }
}

function stripsAnimationInterval(lsc, rsc) {
    let id = window.setInterval(() => {
        let rand_num = Math.round(((Math.random() * 8 + 1) / 10) * 100) / 100;

        lsc.style["flex-shrink"] = 1 - rand_num;
        rsc.style["flex-shrink"] = rand_num;
    }, STRIP_ANIMATION_DURATION * 3000);

    INTERVAL_IDS.push(id);
}

function handleAnimation() {
    if (document.hidden) return;

    for (let id of INTERVAL_IDS) {
        clearInterval(id);
    }

    let elm = document.getElementById('strips-container');
    if (elm != null) {
        elm.parentNode.replaceChild(elm.cloneNode(true), elm);
    }

    animateStrip();
}