const min = 0
const max = 100

// Clamp number between two values with the following line:
const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

let mouseIsDown = false;
let gridSize = 16;

window.onload = createSketchPad;


function createSketchPad() {
    const sketchPad = document.querySelector(".sketch-pad-container");
    const gridSizeButton = document.querySelector(".grid-size-button");
    const clearButton = document.querySelector(".clear-button");

    gridSizeButton.addEventListener("click", gridSizeButtonClickedListener);
    clearButton.addEventListener("click", clearButtonClickedListener);
    // Allows user to let go of the mouse button outside of the sketch pad
    window.addEventListener("mouseup", windowMouseUpListener);

    clearSketchPad();

    for (let index = 0; index < gridSize * gridSize; index++) {
        const tile = document.createElement("div");
        tile.style.flexBasis = ((1 / gridSize) * 100) + "%";
        
        tile.addEventListener("mousedown", tileMouseDownListener);
        tile.addEventListener("mouseover", tileMouseOverListener);
        sketchPad.appendChild(tile);
    }
}


function clearSketchPad() {
    const sketchPad = document.querySelector(".sketch-pad-container");

    sketchPad.innerHTML = "";
}


// Sets new grid according to prompt between 0 and 100.
function gridSizeButtonClickedListener() {
    newSize= prompt("Grid size:", 16);

    newSize = clamp(newSize, 0, 100);

    gridSize = newSize;

    createSketchPad();
}


function clearButtonClickedListener() {
    clearSketchPad();
    createSketchPad();
}


// Allows for painting the first tile clicked
function tileMouseDownListener() {
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