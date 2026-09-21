"use strict";

function startGame() {

    removeStartDiv();
    let row = createRow();
    console.log(row);

}

function removeStartDiv() {
    let startDiv = document.getElementById('start');
    startDiv.style.pointerEvents = "unset";
    startDiv.style.display = "none";
}

function createRandomNumber() {
    let min = 1;
    let max = 10;

    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);

    let randomNumber = Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);

    return randomNumber;
}

function createRow() {
    let row = [];
    for (let i = 0; i < 9; i++) {
        let randomNumber = createRandomNumber();
        let duplicationResualt = checkIfDuplicate(randomNumber, row);

        if (duplicationResualt) {
            do {
                var newRandomNumber = createRandomNumber();
                duplicationResualt = checkIfDuplicate(newRandomNumber, row);
            } while (duplicationResualt);

            randomNumber = newRandomNumber;
        }

        row.push(randomNumber);
    }
    return row;
}

function checkIfDuplicate(randomNumber, numbers) {
    if (numbers.includes(randomNumber)) {
        return true;
    } else {
        return false;
    }
}