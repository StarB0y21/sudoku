"use strict";

function startGame() {

    removeStartDiv();
    let gameBoard = createGameBoard();
}

function removeStartDiv() {
    let startDiv = document.getElementById('start');
    startDiv.style.pointerEvents = "unset";
    startDiv.style.display = "none";
}

function createGameBoard() {
    let gameBoard = [];
    for (let boardRowIndex = 0; boardRowIndex < 3; boardRowIndex++) {
        let row = createGameBoardRow(boardRowIndex);
        gameBoard.push(row);
    }
    console.log(gameBoard);
}

function createGameBoardRow(boardRowIndex) {
    let row = [];
    for (let boxRowIndex = 0; boxRowIndex < 3; boxRowIndex++) {
        let box = createbox(boardRowIndex, boxRowIndex);
        row.push(box);
    }
    return row;
}

function createbox(boardRowIndex, boxRowIndex) {
    let box = [];
    let usedNumbers = [];
    for (let columnIndex = 0; columnIndex < 3; columnIndex++) {
        let row = [];
        for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
            let leftNumbers = returnValidNumbers(usedNumbers);
            let randomNumber = createRandomNumber(leftNumbers);
            usedNumbers.push(randomNumber);
            row.push(randomNumber);
            console.log(
                "boardRowIndex", boardRowIndex,
                "boxRowIndex", boxRowIndex,
                "columnIndex", columnIndex,
                "rowIndex", rowIndex
            );
        }
        box.push(row);
    }
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