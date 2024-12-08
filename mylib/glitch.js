/*
Credit.
Asciiz on discord
Do Tran Hieu Anh
(we are literally the same person)

How to use:

- Include glitch.js into your html (obviously)

- Add data-glitch to your text html element
    E.g. <h2 data-glitch>Your text</h2>

- Add value to data-glitch to make it alternate
    E.g <h2 data-glitch="Text 2">Text 1</h2>

- Add data-glitch-time="<time>" (ms) to change glitch interval time
    E.g <h2 data-glitch="Text 2" data-glitch-time="100">Text 1</h2>
*/

const asciiTable = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
const asciiException = [" ", "\n", "°"];
const asciiLength = asciiTable.length;

function randomAscii() {
    const rndIndex = Math.floor(Math.random() * asciiLength);
    return asciiTable[rndIndex];
}

function glitchEffect(element, text, time) {
    // Effect in "effect"
    if (parseInt(element.getAttribute("data-glitch-active"))) return;
    element.setAttribute("data-glitch-active", 1);

    // Time interval
    const glitchTime = time || parseInt(element.getAttribute("data-glitch-time"));

    let ogText = text || element.getAttribute("data-glitch");
    let gText = ogText;

    // Swap content
    if (element.getAttribute("data-glitch") != element.innerText) {
        element.setAttribute("data-glitch", element.innerText);
    }

    // Glitch interval
    if (glitchTime == 0) {
        element.setAttribute("data-glitch-active", 0);
        element.innerText = ogText;
        return;
    }

    let iteration = -1;
    let glitchInterval = setInterval(() => {
        // Remap text
        gText = ogText.split("").map((letter, index) => {
            if (asciiException.indexOf(letter) > -1) return letter;

            return index > iteration ? randomAscii() : letter;
        }).join("");

        // Update element
        element.innerText = gText;

        iteration++;

        if (gText == ogText) {
            element.setAttribute("data-glitch-active", 0);
            clearInterval(glitchInterval);
        }
    }, glitchTime || 50);

    delete ogText, gText;
}

function glitchActivate(element, time=50) {
    if (!element.getAttribute("data-glitch")) {
        element.setAttribute("data-glitch", element.innerText);
        element.setAttribute("data-glitch-time", time);
    }

    element.onmouseover = () => glitchEffect(element);
    element.ontouchstart = () => glitchEffect(element);
}

function glitchDeactivate(element) {
    element.onmouseover = null;
    element.ontouchstart = null;

    element.removeAttribute("data-glitch");
    element.removeAttribute("data-glitch-time");
    element.removeAttribute("data-glitch-active");
}

function applyGlitch() {
    const glitchElement = document.querySelectorAll("[data-glitch]")
    glitchElement.forEach(element => {
        glitchActivate(element);
    })
}
applyGlitch();