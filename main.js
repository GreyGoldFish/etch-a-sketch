const MIN_GRID_SIZE = 0
const MAX_GRID_SIZE = 100

let mouseIsDown = false;
let gridSize = 16;
let currentColor = "rgb(0, 0, 0)";
let currentMode = "pencil";

window.onload = createGrid;


function createGrid() {
    const colorPicker = document.querySelector(".color-picker");
    const pencilButton = document.querySelector(".pencil-button");
    const eraserButton = document.querySelector(".eraser-button");
    const rainbowButton = document.querySelector(".rainbow-button");
    const shadeButton = document.querySelector(".shade-button");
    const lightenButton = document.querySelector(".lighten-button");
    const clearButton = document.querySelector(".clear-button");
    const gridSizeButton = document.querySelector(".grid-size-button");
    const grid = document.querySelector(".grid-container");

    colorPicker.addEventListener("input", colorPickerInputListener);
    pencilButton.addEventListener("click", pencilButtonClickListener);
    eraserButton.addEventListener("click", eraserButtonClickListener);
    rainbowButton.addEventListener("click", rainbowButtonClickListener);
    shadeButton.addEventListener("click", shadeButtonClickListener);
    lightenButton.addEventListener("click", lightenButtonClickListener);
    clearButton.addEventListener("click", clearButtonClickListener);
    gridSizeButton.addEventListener("click", gridSizeButtonClickListener);
    // Allows user to let go of the mouse button outside of the grid
    window.addEventListener("mouseup", windowMouseUpListener);

    clearGrid();

    for (let index = 0; index < gridSize * gridSize; index++) {
        const cell = document.createElement("div");
        cell.style.flexBasis = ((1 / gridSize) * 100) + "%";
        
        cell.classList.add("grid-cell");
        cell.addEventListener("mousedown", cellMouseDownListener);
        cell.addEventListener("mouseover", cellMouseOverListener);
        grid.appendChild(cell);
    }
}


function clearGrid() {
    const grid = document.querySelector(".grid-container");

    grid.innerHTML = "";
}


function getRGBColor(r, g, b) {
    return `rgb(${r}, ${g}, ${b})`;
}


function getRGBColorArray(color) {
    return color.substring(4).slice(0, -1).split(", ");
}


function shadeColor(color, value) {
    let colorArray = getRGBColorArray(color)
    let newColorArray = colorArray.map(primaryColor => {
        return primaryColor *= value;
    });
    let newColor = getRGBColor(
        newColorArray[0],
        newColorArray[1],
        newColorArray[2]);
    return newColor
}


function changeCell(cell) {
    switch (currentMode) {
        case "pencil":
            cell.style.backgroundColor = currentColor;
            break;
        case "erase":
            cell.style.backgroundColor = "";
            break;
        case "rainbow":
            let randomColor = getRGBColor(
                Math.floor(Math.random() * 255),
                Math.floor(Math.random() * 255),
                Math.floor(Math.random() * 255));
            cell.style.backgroundColor = randomColor;
            break;
        case "shade":
            let darkerColor = cell.style.backgroundColor;
            if (darkerColor === "") {
                return;
            }
            darkerColor = shadeColor(darkerColor, 0.9);
            cell.style.backgroundColor = darkerColor;
            break;
        case "lighten":
            let lighterColor = cell.style.backgroundColor;
            if (lighterColor === "") {
                return;
            }
            lighterColor = shadeColor(lighterColor, 1.1);
            cell.style.backgroundColor = lighterColor;
            break;
        default:
            break;
    }
}


function colorPickerInputListener(event) {
    currentMode = "pencil";
    currentColor = event.target.value;
}


function pencilButtonClickListener() {
    currentMode = "pencil";
}


function eraserButtonClickListener() {
    currentMode = "erase";
}


function rainbowButtonClickListener() {
    currentMode = "rainbow";
}


function shadeButtonClickListener() {
    currentMode = "shade";
}


function lightenButtonClickListener() {
    currentMode = "lighten";
}


function clearButtonClickListener() {
    clearGrid();
    createGrid();
}

// Sets new grid according to prompt between 0 and 100.
function gridSizeButtonClickListener() {
    newSize = prompt("Grid size:", 16);

    newSize = Math.min(Math.max(newSize, MIN_GRID_SIZE), MAX_GRID_SIZE);

    console.log(newSize);

    gridSize = newSize;

    createGrid();
}


// Allows for drawing the first cell clicked
function cellMouseDownListener(event) {
    mouseIsDown = true;
    changeCell(event.target)
}


// Stops drawing if mouse is down
function windowMouseUpListener() {
    mouseIsDown = false;
}


// Only draws if the user holds the mouse button down and is over a cell
function cellMouseOverListener(event) {
    if (mouseIsDown) {
        changeCell(event.target)
    }
}