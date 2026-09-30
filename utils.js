const d = require("./data")
const g = require("./geometry")
const r = require("raylib")

function getUpdatedDelta(i) {
    return (i % 2 === 0) ? -1 : 1;
}

function getUpdatedDecrement(i) {
    return (i % 2 === 0) ? 9 : 11;
}

function drawGridCells(gridX, gridY, gridWidth, gridHeight) {
    const cellHeight = gridHeight / 10 - 2.5;
    const cellWidth = gridWidth / 10 - 2.5;

    let cellNumber = 100;
    let delta = -1;
    let decrement = 0;

    for (let i = 0; i < 10; i++, cellNumber -= decrement) {
        for (let j = 0; j < 10; j++, cellNumber += delta) {
            const cellXCoordinate = gridX + j * gridWidth * 0.1 + 2;
            const cellYCoordinate = gridY + (gridHeight / 10) * i + 2;

            const textX = cellXCoordinate + 5;
            const textY = cellYCoordinate + 5;

            delta = getUpdatedDelta(i);
            decrement = getUpdatedDecrement(i);

            r.DrawRectangle(cellXCoordinate, cellYCoordinate, cellWidth, cellHeight, r.WHITE);
            r.DrawText(cellNumber + "", textX, textY + 40, 20, r.BLACK);
        }
    }
}

function drawGrid(gridWidth, gridHeight) {
    d.gridX = g.getCenterCoordinate(d.windowWidth, gridWidth);
    d.gridY = g.getCenterCoordinate(d.windowHeight, gridHeight);

    r.DrawRectangle(d.gridX, d.gridY, gridWidth, gridHeight, r.BLACK);
}

function getPlayerX(gridX, playerWidth, j) {
    const cellXCoordinate = gridX + j * d.gridWidth / 10 + 2;

    return cellXCoordinate + g.getCenterCoordinate(d.gridWidth / 10, playerWidth)
}

function getPlayerY(gridY, playerHeight, i) {
    const cellYCoordinate = gridY + (d.gridHeight / 10) * i + 2;

    return cellYCoordinate - playerHeight + d.gridHeight / 20 + 10;
}

function calcPlayerDetails(playerWidth, playerHeight, i, j) {
    return {
        x: getPlayerX(d.gridX, playerWidth, j),
        y: getPlayerY(d.gridY, playerHeight, i),
        width: playerWidth,
        height: playerHeight,
    }
}

function calcPlayerBottomRect(playerDetails, playerWidth) {
    return {
        x: playerDetails.x + (playerWidth - 50) / 2,
        y: playerDetails.y + 60,
        width: 50,
        height: 25
    }
}

function drawPlayer() {
    const coordinates = getCellCoordinates(d.currentCell)
    const i = coordinates.X;
    const j = coordinates.Y;

    const playerWidth = 25;
    const playerHeight = 75;

    const playerDetails = calcPlayerDetails(playerWidth, playerHeight, i, j);
    const playerBottomRect = calcPlayerBottomRect(playerDetails, playerWidth)

    r.DrawRectangleRounded(playerDetails, 1, 40, r.RED);
    r.DrawCircle(playerDetails.x + playerWidth / 2, playerDetails.y + 10, 15, r.RED);
    r.DrawRectangleRounded(playerBottomRect, 1, 10, r.RED)
}

function getCellCoordinates(cellNumber) {
    if (cellNumber === 0) return { X: 9, Y: -1 };

    const X = 10 - Math.ceil(cellNumber / 10);

    const Y =
        X % 2 === 0
            ? (10 - cellNumber % 10) % 10
            : (cellNumber - 1) % 10;

    return { X, Y };
}

function updateTurn() {
    d.turn = Math.floor(Math.random() * 6 + 1);
}

function drawDiceArea() {
    const diceAreaWidth = 100;
    const diceAreaHeight = 100;

    const diceAreaX = d.windowWidth - 150;
    const diceAreaY = d.windowHeight - 150;

    const textWidth = r.MeasureText(d.turn + "", 100);
    const textX = diceAreaX + g.getCenterCoordinate(diceAreaWidth, textWidth);
    const textY = diceAreaY + 5;

    r.DrawRectangle(diceAreaX - 5, diceAreaY - 5, diceAreaWidth + 10, diceAreaHeight + 10, r.BLACK);
    r.DrawRectangle(diceAreaX, diceAreaY, diceAreaWidth, diceAreaHeight, r.WHITE);
    r.DrawText(d.turn + "", textX, textY, 100, r.BLACK);
}

function calcComponentX(j) {
    return d.gridX + j * d.gridWidth / 10 + 2 + d.gridWidth / 20;
}

function calcComponentY(i) {
    return d.gridY + (d.gridHeight / 10) * i + 2 + d.gridHeight / 20;
}

function drawIndividualSnake(startI, startJ, endI, endJ) {
    const startX = calcComponentX(startJ);
    const startY = calcComponentY(startI);

    const endX = calcComponentX(endJ);
    const endY = calcComponentY(endI);

    r.DrawLineEx({ x: startX, y: startY }, { x: endX, y: endY }, 25, r.DARKGREEN);
    r.DrawCircle(startX, startY, 25, r.DARKGREEN);
    r.DrawCircle(startX - 10, startY + 10, 5, r.RED);
    r.DrawCircle(startX + 10, startY - 10, 5, r.RED);
}

function drawSnakes() {
    for (let i = 0; i < d.snakes.length; i++) {
        const startCoordinates = getCellCoordinates(d.snakes[i].startCell);
        const endCoordinates = getCellCoordinates(d.snakes[i].endCell);
        drawIndividualSnake(startCoordinates.X, startCoordinates.Y, endCoordinates.X, endCoordinates.Y);
    }
}

function drawIndividualLadder(startI, startJ, endI, endJ) {
    const startX = calcComponentX(endJ);
    const startY = calcComponentY(endI);

    const endX = calcComponentX(startJ);
    const endY = calcComponentY(startI);

    r.DrawLineEx({ x: startX + 10, y: startY - 20 }, { x: endX + 10, y: endY - 20 }, 10, r.BROWN);
    r.DrawLineEx({ x: startX - 10, y: startY + 10 }, { x: endX - 10, y: endY + 10 }, 10, r.BROWN);
}

function drawLadders() {
    for (let i = 0; i < d.ladders.length; i++) {
        const startCoordinates = getCellCoordinates(d.ladders[i].startCell);
        const endCoordinates = getCellCoordinates(d.ladders[i].endCell);
        drawIndividualLadder(startCoordinates.X, startCoordinates.Y, endCoordinates.X, endCoordinates.Y);
    }
}

function checkAndUpdateCurrentCellIn(obj) {
    for (let i = 0; i < obj.length; i++) {
        if (d.currentCell === obj[i].startCell) {
            d.currentCell = obj[i].endCell;
            break;
        }
    }
}

function updatePlayer() {
    if (d.currentCell + d.turn > 100) return;
    d.currentCell += d.turn;

    checkAndUpdateCurrentCellIn(d.snakes);
    checkAndUpdateCurrentCellIn(d.ladders);
}

function drawWinText() {
    const winText = "YOU WON!!"
    const textWidth = r.MeasureText(winText, 150);

    const textX = g.getCenterCoordinate(d.windowWidth, textWidth);
    const textY = d.windowHeight / 2 - 100;

    r.DrawText(winText, textX, textY, 150, r.RED);
}

function handleDrawWinText() {
    if (d.currentCell === 100) {
        r.DrawRectangle(0, 0, d.windowWidth, d.windowHeight, r.ColorAlpha(r.WHITE, 0.75));
        drawWinText();
    }
}

module.exports = {
    drawGridCells,
    drawPlayer,
    drawGrid,
    updateTurn,
    drawDiceArea,
    drawSnakes,
    drawLadders,
    updatePlayer,
    handleDrawWinText
}