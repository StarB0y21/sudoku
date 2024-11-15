"use strict";
var numSelected = null;
var tileSelected = null;
var delSelected = null;
var errors = 0;
var gameStart = 0;

var tileIs = null;

var board = [
    "--74916-5",
    "2---6-3-9",
    "-----7-1-",
    "-586----4",
    "--3----9-",
    "--62--187",
    "9-4-7---2",
    "67-83----",
    "81--45---"
]

var solution = [
    "387491625",
    "241568379",
    "569327418",
    "758619234",
    "123784596",
    "496253187",
    "934176852",
    "675832941",
    "812945763"
]

let endGame = [
    "387491625",
    "241568379",
    "569327418",
    "758619234",
    "123784596",
    "496253187",
    "934176852",
    "675832941",
    "812945763"
]

console.log(`program variables:`);
console.log(`selected number: ${numSelected}`);
console.log(`slecter tile: ${tileSelected}`);
console.log(`delete selected: ${delSelected}`);
console.log(`error counter: ${errors}`);
console.log(`stert game: ${gameStart}`);
console.log(`game board: ${board}`);
console.log(`game board solution: ${solution}`);
console.log(`end game: ${endGame}`);
console.log("______________");

// start game function
function startGame() {
    if (gameStart != 1) {
        setGame();
        gameStart += 1;
        console.log("game started, game start condition:" + gameStart);
        console.log("______________");
    } else {
        window.alert("you can't start game again! Game has been started");
    }
}

// create table game and digits list
function setGame() {
    console.log("start creating digits");
    for (let i = 1; i <= 9; i++) {
        let number = document.createElement("div");
        number.id = i;
        number.innerText = i;
        number.classList.add("number");
        number.addEventListener("click", () => putNumber(number));
        document.getElementById("digits").appendChild(number);
        console.log(`create digit number: ${i}`);
    }
    console.log("end create digits");
    console.log("______________");

    let eraser = document.createElement("img");
    eraser.src = "icons8-eraser-96.png";
    eraser.classList.add("eraser");
    document.getElementById("digits").appendChild(eraser);

    let pencil = document.createElement("img");
    pencil.src = "icons8-pencil-100.png";
    pencil.classList.add("pencil");
    document.getElementById("digits").appendChild(pencil);

    console.log("start create table game");
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let tile = document.createElement("div");

            tile.id = r.toString() + "-" + c.toString();
            if (board[r][c] != "-") {
                tile.innerText = board[r][c];
                tile.classList.add("tile-start");
                tile.classList.add("game");
                tile.style.pointerEvents = "none";
            }
            if (r == 2 || r == 5) {
                tile.classList.add("horizontal-line");
                console.log("create horizontal line in table game");
            }
            if (c == 2 || c == 5) {
                tile.classList.add("vertical-line");
                console.log("create vertical line in table game");
            }
            tile.classList.add("tile");
            document.getElementById("board").append(tile);
            console.log(`create table col and row coord: r= ${r} / c= ${c}`);

            if (!tile.classList.contains("game")) {
                tile.classList.add("game-cell");
            }

            tile.addEventListener("click", () => printNumbers(tile));
        }
    }

    document.getElementById("digits").style.opacity = 0.5;
    document.getElementById("digits").style.pointerEvents = "none";
    console.log("end create table game");
    console.log("______________");
}


// get the selected col and put the digit inside it
function printNumbers(thisItem) {
    document.getElementById("digits").style.opacity = 1;
    document.getElementById("digits").style.pointerEvents = "auto";
    let thisItemId = thisItem.id;

    if (tileIs != null && tileIs != thisItem) {
        console.log("remove the previous selection");
        tileIs.classList.remove("number-selected");
    }

    switch (true) {

        case thisItem.classList.contains("game-cell"):
            if (tileIs != thisItem || !thisItem.classList.contains("number-selected")) {
                tileIs = thisItem;
                tileIs.classList.add("number-selected");
                console.log(`selected col is ${thisItemId}`);
            } else {
                tileIs.classList.remove("number-selected");
                document.getElementById("digits").style.opacity = 0.5;
                document.getElementById("digits").style.pointerEvents = "none";
                tileIs = null;
                console.log(`unselect this col ${thisItemId}`);
            }
            break;

        case tileIs == thisItem:
            console.log("unselect");
            tileIs.classList.remove("number-selected");
            tileIs = null;
            break;

        case tileIs == null:
            console.log("empty");
            break;

        default:
            console.log("No matching case found.");
    }
}


// check the answer
function putNumber(thisItem) {

    if (!tileIs.classList.contains("true") && !tileIs.classList.contains("game")) {
        let coords = tileIs.id.split("-");
        let r = parseInt(coords[0]);
        let c = parseInt(coords[1]);

        if (solution[r][c] == thisItem.id) {
            let originalVal = solution[r][c];
            let rArray = endGame[r].split('');
            rArray[c] = originalVal;
            endGame[r] = rArray.join('');

            console.log(`solution: ${solution[r][c]}`);
            console.log(`solution: ${solution}`);
            console.log(`endGame: ${endGame[r][c]}`);
            console.log(`endGame: ${endGame}`);

            // for (let a = 0; a < 9; a++) {
            //     for (let b = 0; b < 9; b++) {

            //     }
            // }

            tileIs.innerText = thisItem.id;
            tileIs.style.color = "blue";
            tileIs.classList.add("true");
            tileIs.classList.add("game");
            tileIs.classList.remove("number-selected");
            if (tileIs.classList.contains("false")) {
                tileIs.classList.remove("false");
                tileIs.classList.add("game");
                tileIs.classList.remove("number-selected");
                let originalVal = solution[r][c];
                let rArray = endGame[r].split('');
                rArray[c] = originalVal;
                endGame[r] = rArray.join('');
                console.log(`switch to true answer in ${tileIs.id}`);
            }
            document.getElementById("digits").style.opacity = 0.5;
            document.getElementById("digits").style.pointerEvents = "none";
            console.log(tileIs.id);
            console.log(thisItem.id);
            console.log(`${thisItem.id} is correct answer in ${r}/${c} coord`);
            console.log("______________");
        } else {
            tileIs.innerText = thisItem.id;
            errors += 1;
            document.getElementById("errors").innerText = errors;
            tileIs.style.color = "red";
            tileIs.classList.add("false");
            console.log(`${thisItem.id} is wrong answer in ${r}/${c} coord`);
            console.log("______________");
        }
    } else {
        tileIs.classList.remove("number-selected");
        document.getElementById("digits").style.opacity = 0.5;
        document.getElementById("digits").style.pointerEvents = "none";
        tileIs = null;
        console.log("you can't make change on true answers!");
    }

    if (arraysEqual(endGame, solution)) {
        document.getElementById("board").style.pointerEvents = "none";
        document.getElementById("digits").style.pointerEvents = "none";
        window.alert(`you end game with ${errors} error!`);
        // gameStart = 0;
        // errors = 0;
    } else {
        console.log("keep playing");
    }
}

function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        window.alert("this is a unexpected crash in program!");
        return false;
    } else {
        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i]) {
                return false;
            } else {
                return true;
            }
        }
    }
}
