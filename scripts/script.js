let size = 16;
let gridSize = 400; // in pixels

const sizeButton = document.querySelector('#size');
sizeButton.addEventListener('click', changeSize);

const clearButton = document.querySelector('#size');
clearButton.addEventListener('click', clearGrid);

generateGrid(size);

function clearGrid(event) {
}

function changeSize(event) {
    size = getSize();
    generateGrid(size);
}

function generateGrid(size) {
    const divSize = Math.round(gridSize / size);
    const grid = document.querySelector('#grid');

    destroyExistingGrid(grid);

    grid.style['grid-template-rows'] = `repeat(${size}, ${divSize}px)`;
    grid.style['grid-template-columns'] = `repeat(${size}, ${divSize}px)`;

    for (let i=0; i<size**2; i++) {
        const div = getGridSquare();
        grid.appendChild(div);
    }
}

function destroyExistingGrid(grid) {
    const gridSquares = [ ...document.querySelectorAll('#grid div') ];
    gridSquares.forEach(square => grid.removeChild(square));
}

function getSize() {
    let userInput = parseInt(prompt('Enter a grid size (1-64)'));
    while (isNaN(userInput) || (userInput < 1 || userInput > 64)) {
        userInput = parseInt(prompt('Please a enter a valid grid size (1-64)'));
    }

    return userInput;
}

function getGridSquare() {
    const divSize = Math.round(gridSize / size);
    const square = document.createElement('div');

    square.addEventListener('mouseover', changeColor);
    square.style.width = `${divSize}px`;
    square.style.height = square.style.width;
    square.style.border = '1px solid black';
    square.style.borderRadius = '0px';

    return square;
}

function changeColor(event) {
    const div = event.target;
    div.style.backgroundColor = `black`;
}