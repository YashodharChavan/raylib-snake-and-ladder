const r = require("raylib")
const d = require("./data")
const u = require("./utils")

function setup() {
    const FPS = 60;
    r.InitWindow(d.windowWidth, d.windowHeight, "SNAKE AND LADDER")
    r.SetTraceLogLevel(r.LOG_NONE);
    r.SetTargetFPS(FPS)
}

function update() {
    if (r.IsKeyPressed(r.KEY_ENTER)) {
        u.updateTurn();
        u.updatePlayer();
    }
}

function isRunning() {
    return !r.WindowShouldClose();
}

function draw() {
    r.BeginDrawing();
    r.ClearBackground(r.WHITE);

    u.drawGrid(d.gridWidth, d.gridHeight);
    u.drawGridCells(d.gridX, d.gridY, d.gridWidth, d.gridHeight);

    u.drawDiceArea();

    u.drawSnakes();
    u.drawLadders();

    u.drawPlayer(d.currentPlayerX, d.currentPlayerY);

    u.handleDrawWinText();
    r.EndDrawing();
}

function teardown() {
    r.CloseWindow();
}

module.exports = {
    setup,
    update,
    isRunning,
    draw,
    teardown,
}