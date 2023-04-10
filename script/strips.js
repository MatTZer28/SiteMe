const STRIP_ANIMATION_DURATION = 3;
const STRIPS_ANIMATION_DELAY = 2.8;

function appendStrips(parent) {
    const stripsContainer = document.createElement('div');
    stripsContainer.id = 'strips-container';

    for (let i = 0; i < 30; i++) {
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

    for (let i = 0; i < lscs.length; i++) {
        let delay = ((Math.round((Math.random() * 2) * 100)) / 100).toString().concat("s");

        lscs[i].firstChild.style["animation-delay"] = delay;
        rscs[i].firstChild.style["animation-delay"] = delay;
    }

    for (let i = 0; i < lscs.length; i++) {
        let rand_num = Math.round(((Math.random() * 8 + 1) / 10) * 100) / 100;

        lscs[i].style["flex-shrink"] = 1 - rand_num;
        rscs[i].style["flex-shrink"] = rand_num;

        window.setTimeout(() => {
            window.setInterval(() => {
                let rand_num = Math.round(((Math.random() * 8 + 1) / 10) * 100) / 100;

                lscs[i].style["flex-shrink"] = 1 - rand_num;
                rscs[i].style["flex-shrink"] = rand_num;
            }, 3000);
        }, (Number(lscs[i].firstChild.style["animation-delay"].slice(0, -1)) + STRIP_ANIMATION_DURATION) * 1000);
    }
}

const loadStrips = () => {
    setTimeout(() => {
        appendStrips(document.getElementById("img-strip"));
        animateStrip();
    }, STRIPS_ANIMATION_DELAY * 1000);
};

document.addEventListener("DOMContentLoaded", loadStrips);