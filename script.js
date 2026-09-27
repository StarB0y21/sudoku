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
        let randomNumber = createRandomNumber();
        console.log(`randomNumber:${randomNumber}`);
        row.push(randomNumber);
    }
    return row;
}

function createRandomNumber() {
    let min = 1;
    let max = 10;

    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);

    let randomNumber = Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);

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