"use strict";

function startGame() {

    removeStartDiv();
    let gameBoard = createGameBoard();
}

function createGameBoard() {
    let gameBoard = [];
    for (let i = 0; i < 3; i++) {
        let row = createGameBoardRow();
        gameBoard.push(row);
    }
    console.log(gameBoard);
}

function createGameBoardRow() {
    let row = [];
    for (let i = 0; i < 3; i++) {
        let box = createbox();
        row.push(box);
    }
    return row;
}

function createbox() {
    let box = [];
    let usedNumbers = [];
    for (let j = 0; j < 3; j++) {
        let row = [];
        for (let i = 0; i < 3; i++) {
            let leftNumbers = returnValidNumbers(usedNumbers);
            let randomNumber = createRandomNumber(leftNumbers);
            usedNumbers.push(randomNumber);
            row.push(randomNumber);
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

function removeStartDiv() {
    let startDiv = document.getElementById('start');
    startDiv.style.pointerEvents = "unset";
    startDiv.style.display = "none";
}