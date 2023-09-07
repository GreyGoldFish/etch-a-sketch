const min = 0
const max = 100

// Clamp number between two values with the following line:
const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

let mouseIsDown = false;
let gridWidth = 16;
let gridHeight = 16;

window.onload = createSketchPad;


function createSketchPad() {
    const sketchPad = document.querySelector(".sketch-pad-container");
    const button = document.querySelector("button");

    // Set grid size button
    button.addEventListener("click", buttonClickedListener);
    // Allows user to let go of the mouse button outside of the sketch pad
    window.addEventListener("mouseup", windowMouseUpListener);

    resetSketchPad(sketchPad);

    for (let index = 0; index < gridWidth * gridHeight; index++) {
        const tile = document.createElement("div");
        tile.style.flexBasis = ((1 / gridWidth) * 100) + "%";
        // Determine whether mouse is being dragged after mouse is down.
        tile.addEventListener("mousedown", tileMouseDownListener);
        tile.addEventListener("mouseover", tileMouseOverListener);
        sketchPad.appendChild(tile);
    }
}

function resetSketchPad(sketchPad) {
    // Ensures that container has no children (resets)
    while (sketchPad.lastElementChild) {
        sketchPad.removeChild(sketchPad.lastElementChild);
    }
}


// Sets new grid according to prompt between 0 and 100.
function buttonClickedListener() {
    newWidth = prompt("Grid width:", 16);
    newHeight = prompt("Grid height:", newWidth);

    newWidth = clamp(newWidth, 0, 100);
    newHeight = clamp(newHeight, 0, 100);

    gridWidth = newWidth;
    gridHeight = newHeight;

    createSketchPad();
}


// Allows for painting the first tile clicked
function tileMouseDownListener() {
    this.classList.toggle("painted");
    mouseIsDown = true;
}


// Stops painting
function windowMouseUpListener() {
    mouseIsDown = false;
}


// Only paints if the user holds the mouse button down
function tileMouseOverListener() {
    if (mouseIsDown) {
        this.classList.toggle("painted");
    }
}