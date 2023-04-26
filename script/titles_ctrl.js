const HOVER_LISTENER_DELAY = 5.6;
const FLY_OUT_ANIMATION_DURATION = 2;

const subtitles = document.getElementById("subtitles-sect").childNodes;
const subsect = document.getElementById("subtitles-sect");
const title = document.getElementById("home-title");

const HOVER_CSS_STYLE = `
.subtitle:hover {
    color: rgb(18, 18, 18);
    cursor: pointer;
}

.subtitle:hover::before {
    content: "";
    width: 100%;
    height: 100%;
    bottom: 5px;
    position: absolute;
    visibility: visible;
    left: 0%;
    z-index: -1;
    background-color: whitesmoke;
    animation: hover-white 0.5s forwards;
}

@keyframes hover-white {
    from {
        width: 0%;
        background-color: whitesmoke;
        visibility: visible;
        z-index: -1;
    }

    to {
        width: 100%;
        background-color: whitesmoke;
        visibility: visible;
        z-index: -1;
    }
}

.subtitle:not(:hover)::before {
    visibility: hidden;
}
`

const FLY_OUT_CSS_STYLE = `
#subtitles-sect {
    animation: subtitle-fly-out ${FLY_OUT_ANIMATION_DURATION}s forwards;
    animation-timing-function: cubic-bezier(.77,-0.01,.11,1);
}

@keyframes subtitle-fly-out {
    100% {
        transform: translateY(-50vh)
    }
}

#home-title {
    animation: title-fly-out ${FLY_OUT_ANIMATION_DURATION}s forwards;
    animation-timing-function: cubic-bezier(.77,-0.01,.11,1);
}

@keyframes title-fly-out {
    100% {
        transform: translateY(-100vh)
    }
}
`

function handleHover() {
    setTimeout(() => {
        addHoverAnimation();
        initHoverEventListener();
    }, HOVER_LISTENER_DELAY * 1000);
}

function addHoverAnimation() {
    let styleSheet = document.createElement("style");
    styleSheet.innerText = HOVER_CSS_STYLE;
    document.head.appendChild(styleSheet);
}

function initHoverEventListener() {
    for (elem of subtitles) {
        if (!(elem instanceof HTMLDivElement)) continue;
        elem.firstChild.addEventListener("click", (event) => {
            animateFlyOut();
        });
    }
}

function animateFlyOut() {
    addFlyOutAnimation();
    removeAfterFlyOut();
}

function addFlyOutAnimation() {
    let styleSheet = document.createElement("style");
    styleSheet.innerText = FLY_OUT_CSS_STYLE;
    document.head.appendChild(styleSheet);
}

function removeAfterFlyOut() {
    setTimeout(() => {
        subsect.remove();
        title.remove();
    }, FLY_OUT_ANIMATION_DURATION * 1000);
}

document.addEventListener("DOMContentLoaded", handleHover);