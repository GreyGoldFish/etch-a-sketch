const GRID_WIDTH = 16;
const GRID_HEIGHT = 16;

window.onload = main;

function main() {
    const container = document.querySelector(".container");

    for (let index = 0; index < GRID_WIDTH * GRID_HEIGHT; index++) {
        const tile = document.createElement("div");
        container.appendChild(tile);
    }
}