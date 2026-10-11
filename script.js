"use strict";

function startGame() {

    removeStartDiv();
    let gameBoard = createGameBoard();

    createTable(gameBoard);
}

function removeStartDiv() {
    let startDiv = document.getElementById('start');
    startDiv.style.pointerEvents = "unset";
    startDiv.style.display = "none";
}

function createGameBoard() {
    let gameBoard = [];
    for (let boardRowIndex = 0; boardRowIndex < 3; boardRowIndex++) {
        let row = [];

        for (let boardColumnIndex = 0; boardColumnIndex < 3; boardColumnIndex++) {
            let box = createbox(row);

            row.push(box);
        }

        gameBoard.push(row);
    }
    console.log(gameBoard);
    return gameBoard;
}

function createbox(boardRows) {
    let box = [];
    let usedNumbers = [];
    for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
        let row = [];

        for (let columnIndex = 0; columnIndex < 3; columnIndex++) {
            let leftNumbers = returnValidNumbers(usedNumbers);
            let randomNumber = createRandomNumber(leftNumbers);

            usedNumbers.push(randomNumber);
            row.push(randomNumber);
        }

        box.push(row);
    }
    console.log("---------------");
    return box;
}

function returnValidNumbers(numbers) {
    let leftNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let validRowNumbers = leftNumbers.filter((e) => !numbers.includes(e));
    return validRowNumbers;
}

function createRandomNumber(numbers) {
    let min = 0;
    let max = numbers.length;

    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);

    let randomIndex = Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
    let randomNumber = numbers[randomIndex];

    return randomNumber;
}

function createTable(gameBoard) {
    let gameArea = document.getElementById('game-board');
    console.log(gameBoard.flat(4));
    for (let i = 0; i < gameBoard.length; i++) {
        for (let j = 0; j < gameBoard[i].length; j++) {
            for (let y = 0; y < gameBoard[i][j].length; y++) {
                for (let x = 0; x < gameBoard[i][j][y].length; x++) {
                    console.log(gameBoard[i][j][y][x]);
                }
            }
        }
    }
}