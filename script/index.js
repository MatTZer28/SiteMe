document.addEventListener("DOMContentLoaded", () => {
    window.setTimeout(() => {
        appendStrips(document.getElementById("img-strip"));
        doStripEffect();
    }, 4000);
});

function appendStrips(parent) {
    const stripsContainer = document.createElement('div');
    stripsContainer.id = 'strips-container';

    for (let i = 0; i < 25; i++) {
        const strip = document.createElement('div');
        strip.className = 'strip';

        const lSectorContainer = document.createElement('div');
        lSectorContainer.className = 'l-sector-container';

        const lSector = document.createElement('div');
        lSector.className = 'l-sector';

        const rSectorContainer = document.createElement('div');
        rSectorContainer.className = 'r-sector-container';

        const rSector = document.createElement('div');
        rSector.className = 'r-sector';

        lSectorContainer.appendChild(lSector);
        rSectorContainer.appendChild(rSector);
        strip.appendChild(lSectorContainer);
        strip.appendChild(rSectorContainer);
        stripsContainer.appendChild(strip);
    }

    parent.appendChild(stripsContainer);
}

function doStripEffect() {
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
        }, (Number(lscs[i].firstChild.style["animation-delay"].slice(0, -1)) + 3) * 1000);
    }
}