// SLide key event
let keyhold = false;
document.addEventListener("keydown", (e) => {
    if (keyhold) return;

    keyhold = true;

    if (!introRemoved) {
        removeIntro();
        return;
    }

    if (e.key === "ArrowRight") {
        powerpoint.moveRight(true);
    }
    if (e.key === "ArrowLeft") {
        powerpoint.moveRight(false);
    }
});
document.addEventListener("keyup", () => {
    keyhold = false;
});

let introRemoved = false;
let introRemoving = false;
function removeIntro() {
    if (introRemoving) return;

    introRemoving = true;

    document.getElementById("intro-screen").animate([
        { opacity: 1 },
        { opacity: 0 }
    ], {
        duration: 500,
        fill: "forwards",
        easing: "ease"
    });

    setTimeout(() => {
        document.getElementById("intro-screen").remove();
        introRemoved = true;
    }, 500);
}