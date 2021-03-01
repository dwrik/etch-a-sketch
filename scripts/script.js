let size = 16;      // squares per side
let gridSize = 400; // in pixels

const sizeButton = document.querySelector('#size');
sizeButton.addEventListener('click', changeSize);

const clearButton = document.querySelector('#clear');
clearButton.addEventListener('click', clearGrid);

let mediaQuerySmall = window.matchMedia('(max-width: 450px)');
mediaQuerySmall.addEventListener('change', decreaseGridSize);

let mediaQuerySmaller = window.matchMedia('(max-width: 250px)');
mediaQuerySmaller.addEventListener('change', decreaseGridSize);

let mediaQueryBig = window.matchMedia('(min-width: 251px)');
mediaQueryBig.addEventListener('change', increaseGridSize);

let mediaQueryBigger = window.matchMedia('(min-width: 451px)');
mediaQueryBigger.addEventListener('change', increaseGridSize);

function increaseGridSize(event) {
    if (event.matches) {
        gridSize *= 2;
        generateGrid(size);
    }
}

function decreaseGridSize(event) {
    if (event.matches) {
        gridSize /= 2;
        generateGrid(size);
    }
}


function clearGrid(event) {
    const gridSquares = [ ...document.querySelectorAll('#grid div') ];
    gridSquares.forEach((square) => {
        square.style.backgroundColor = 'transparent';
    });
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
    let userInput = parseInt(prompt('Enter a grid size [1-100]'));
    while (isNaN(userInput) || (userInput < 1 || userInput > 100)) {
        userInput = parseInt(prompt('Please a enter a valid grid size [1-100]'));
    }

    return userInput;
}

function getGridSquare() {
    const divSize = Math.round(gridSize / size);
    const square = document.createElement('div');

    square.addEventListener('mouseover', changeColor);
    square.style.width = `${divSize}px`;
    square.style.height = square.style.width;
    square.style.border = '0px solid black';

    return square;
}

function changeColor(event) {
    const div = event.target;
    let redValue = getRandomColorValue();
    let blueValue = getRandomColorValue();
    let greenValue = getRandomColorValue();
    div.style.backgroundColor = `rgb(${redValue}, ${greenValue}, ${blueValue})`;
}

function getRandomColorValue() {
    return Math.floor(Math.random() * 256);
}

decreaseGridSize(mediaQuerySmall);
decreaseGridSize(mediaQuerySmaller);

generateGrid(size);