const MIN_GRID_SIZE = 0
const MAX_GRID_SIZE = 100

let mouseIsDown = false;
let gridSize = 16;
let currentColor = "black";
let currentMode = "pencil";

window.onload = createGrid;


function createGrid() {
    const colorPicker = document.querySelector(".color-picker");
    const eraserButton = document.querySelector(".eraser-button");
    const clearButton = document.querySelector(".clear-button");
    const gridSizeButton = document.querySelector(".grid-size-button");
    const grid = document.querySelector(".grid-container");

    colorPicker.addEventListener("input", colorPickerInputListener);
    eraserButton.addEventListener("click", eraserButtonClickListener);
    clearButton.addEventListener("click", clearButtonClickListener);
    gridSizeButton.addEventListener("click", gridSizeButtonClickListener);
    // Allows user to let go of the mouse button outside of the sketch pad
    window.addEventListener("mouseup", windowMouseUpListener);

    clearGrid();

    for (let index = 0; index < gridSize * gridSize; index++) {
        const tile = document.createElement("div");
        tile.style.flexBasis = ((1 / gridSize) * 100) + "%";
        
        tile.addEventListener("mousedown", tileMouseDownListener);
        tile.addEventListener("mouseover", tileMouseOverListener);
        grid.appendChild(tile);
    }
}


function clearGrid() {
    const grid = document.querySelector(".grid-container");

    grid.innerHTML = "";
}


function changeTile(tile) {
    switch (currentMode) {
        case "pencil":
            tile.style.backgroundColor = currentColor;
            break;
        case "erase":
            tile.style.backgroundColor = "";
            break;
        default:
            break;
    }
}


function colorPickerInputListener(event) {
    currentMode = "pencil";
    currentColor = event.target.value;
}


function eraserButtonClickListener() {
    currentMode = "erase";
}


function clearButtonClickListener() {
    clearGrid();
    createGrid();
}

// Sets new grid according to prompt between 0 and 100.
function gridSizeButtonClickListener() {
    newSize= prompt("Grid size:", 16);

    Math.min(Math.max(newSize, MIN_GRID_SIZE), MAX_GRID_SIZE);

    gridSize = newSize;

    createGrid();
}


// Allows for drawing the first tile clicked
function tileMouseDownListener(event) {
    mouseIsDown = true;
    changeTile(event.target)
}


// Stops drawing if mouse is down
function windowMouseUpListener() {
    mouseIsDown = false;
}


// Only draws if the user holds the mouse button down and is over a tile
function tileMouseOverListener(event) {
    if (mouseIsDown) {
        changeTile(event.target)
    }
}