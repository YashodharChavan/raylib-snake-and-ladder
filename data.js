const snakes = [
    { startCell: 40, endCell: 3 },
    { startCell: 27, endCell: 5 },
    { startCell: 43, endCell: 18 },
    { startCell: 66, endCell: 45 },
    { startCell: 54, endCell: 31 },
    { startCell: 89, endCell: 53 },
    { startCell: 89, endCell: 53 },
    { startCell: 95, endCell: 77 },
    { startCell: 99, endCell: 41 },
]

const ladders = [
    { startCell: 5, endCell: 25 },
    { startCell: 13, endCell: 46 },
    { startCell: 42, endCell: 63 },
    { startCell: 50, endCell: 69 },
    { startCell: 62, endCell: 81 },
    { startCell: 74, endCell: 91 },
]

const windowWidth = 1200;
const windowHeight = 900;

const gridWidth = 800;
const gridHeight = 800;

let gridX;
let gridY;

let turn = "";
let currentCell = 0;

module.exports = {
    snakes,
    ladders,
    windowWidth,
    windowHeight,
    gridWidth,
    gridHeight,
    gridX,
    gridY,
    turn,
    currentCell,
}