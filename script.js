"use strict";

function startGame() {

    removeStartDiv();

    let table = [];

    for (let i = 0; i < 9; i++) {
        let row = createRow();
        table.push(row);
    }

    console.log(table);
    createTable(table);
}

function removeStartDiv() {
    let startDiv = document.getElementById('start');
    startDiv.style.pointerEvents = "unset";
    startDiv.style.display = "none";
}

function createRow() {
    let row = [];
    for (let i = 0; i < 9; i++) {
        let leftNumbers = returnValidNumbers(row);
        let randomNumber = createRandomNumber(leftNumbers);

        row.push(randomNumber);
    }
    return row;
}

function returnValidNumbers(row) {
    let leftNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let validNumbers = leftNumbers.filter((e) => !row.includes(e));
    return validNumbers;
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

function createTable(rows) {
    let gameBoard = document.getElementById('game-board');
    let theTable = document.createElement('table');

    for (let i = 0; i < rows.length; i++) {

        let tableRow = document.createElement('tr');

        for (let j = 0; j < rows[i].length; j++) {

            let tableData = document.createElement('td');

            tableData.innerText = rows[i][j];
            tableRow.appendChild(tableData);
        }

        theTable.appendChild(tableRow);

    }

    gameBoard.appendChild(theTable);
}