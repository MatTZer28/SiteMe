const STRIP_ANIMATION_DURATION = 4;
const STRIPS_ANIMATION_DELAY = 2.8;
const INTERVAL_IDS = [];
const STRIPS_NUM = 25;

const STRIPS_CSS_STYLE = `
#strips-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.strip {
    flex-grow: 1;
    display: flex;
    flex-direction: row;
}

.l-sector-container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    flex-shrink: 1;
    position: relative;
}

.r-sector-container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    flex-shrink: 1;
    position: relative;
}

.l-sector {
    width: 0%;
    height: 60%;
    position: absolute;
    background-image: linear-gradient(to right, rgb(210, 250, 255), rgb(230, 252, 255));
    animation: l-sector-animation ${STRIP_ANIMATION_DURATION}s forwards infinite;
    animation-timing-function: cubic-bezier(.31, .58, .48, 1);
}

.r-sector {
    width: 0%;
    height: 60%;
    position: absolute;
    background-image: linear-gradient(to right, rgb(230, 252, 255), rgb(210, 250, 255));
    animation: r-sector-animation ${STRIP_ANIMATION_DURATION}s forwards infinite;
    animation-timing-function: cubic-bezier(.69, 0, .73, .44);
}

@keyframes l-sector-animation {
    0% {
        width: 0%;
        left: 0%;
    }

    25% {
        width: 100%;
        left: 0%;
    }

    80% {
        width: 0%;
        left: 100%;
    }
}

@keyframes r-sector-animation {
    20% {
        width: 0%;
        left: 0%;
    }

    75% {
        width: 100%;
        left: 0%;
    }

    100% {
        width: 0%;
        left: 100%;
    }
}
`

document.addEventListener("DOMContentLoaded", initStrips);

document.addEventListener("visibilitychange", handleAnimation);

function initStrips() {
    setTimeout(() => {
        loadStrips();
    }, STRIPS_ANIMATION_DELAY * 1000);
}

function loadStrips() {
    appendStrips();
    animateStrip();
}

function appendStrips() {
    let elm = document.getElementById('strips-container');

    if (elm != null) {
        elm.parentNode.replaceChild(elm.cloneNode(true), elm);
    } else {
        const stripsContainer = document.createElement('div');
        stripsContainer.id = 'strips-container';

        for (let i = 0; i < STRIPS_NUM; i++) {
            stripsContainer.appendChild(createStrip());
        }

        let parent = document.getElementById("img-strip")
        parent.appendChild(stripsContainer);

        addStripsAnimation();
    }
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

    addStripsAnimation();

    randomAnimationStartUpDelay(lscs, rscs);

    initialStripsStartUp(lscs, rscs);

    initialStripsInterval(lscs, rscs);
}

function addStripsAnimation() {
    let old_styleSheet = document.getElementById('strips-css');

    if (old_styleSheet != null) {
        document.head.removeChild(old_styleSheet);
    }

    let new_styleSheet = document.createElement("style");

    new_styleSheet.id = "strips-css";
    new_styleSheet.innerText = STRIPS_CSS_STYLE;

    document.head.appendChild(new_styleSheet);
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

    loadStrips();
}