let mouseIsDown = false;

window.onload = main;


function main() {
    const gridWidth = 16;
    const gridHeight = 16;
    const container = document.querySelector(".container");


    for (let index = 0; index < gridWidth * gridHeight; index++) {
        const tile = document.createElement("div");
        tile.addEventListener("mousedown", mouseDownListener);
        tile.addEventListener("mouseup", mouseUpListener);
        tile.addEventListener("mouseover", mouseOverListener);
        container.appendChild(tile);
    }
}


function mouseDownListener() {
    this.classList.toggle("painted");
    mouseIsDown = true;
}


function mouseUpListener() {
    mouseIsDown = false;
}


function mouseOverListener() {
    if (mouseIsDown) {
        this.classList.toggle("painted");
    }
}