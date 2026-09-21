"use strict";

function startGame() {

    removeStartDiv();

    let rows = [];

    for (let i = 0; i < 9; i++) {
        let row = createRow();

        // if (i > 1) {
        //     console.log(rows);
        //     console.log("0");
        // }

        rows.push(row);
    }

    createTable(rows);

    // console.log(rows);

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
        let duplicationResualt = checkIfDuplicate(randomNumber, row);

        if (duplicationResualt) {
            var newRandomNumber = replaceDuplicateNumber(row, duplicationResualt);
            randomNumber = newRandomNumber;
        }

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

function checkIfDuplicate(randomNumber, numbers) {
    if (numbers.includes(randomNumber)) {
        return true;
    } else {
        return false;
    }
}

function replaceDuplicateNumber(row, duplicationResualt) {
    do {
        var newRandomNumber = createRandomNumber();
        duplicationResualt = checkIfDuplicate(newRandomNumber, row);
    } while (duplicationResualt);
    return newRandomNumber;
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