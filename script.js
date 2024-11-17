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
    eraser.addEventListener("click", () => eraserAnswer(tileIs));
    document.getElementById("digits").appendChild(eraser);

    let pencil = document.createElement("img");
    pencil.src = "icons8-pencil-100.png";
    pencil.classList.add("pencil");
    pencil.addEventListener("click", () => toMark());
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
    let pencil = document.getElementsByClassName("pencil")[0];

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

                let allItems = document.getElementsByClassName("tile");
                let tileIsId = tileIs.id.split("-");
                let f = parseInt(tileIsId[0]);
                let s = parseInt(tileIsId[1]);

                // for (let i = 0; i < allItems.length; i++) {
                //     let tileId = allItems[i].id.split("-");
                //     let a = parseInt(tileId[0]);
                //     let b = parseInt(tileId[1]);
                //     if (a == f || b == s) {
                //         console.log(`is is ${allItems[i].id}`);
                //         allItems[i].classList.add("hovered-line");
                //     }
                //     // console.log(`is is ${allItems[i].id}`);
                // }

                console.log(`selected col is ${thisItemId}`);
            } else {
                tileIs.classList.remove("number-selected");
                pencil.classList.remove("pencil-selected");
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

// function removeHovers(){
//     let hoverItems = document.getElementsByClassName(hovered-line);
//     for(let i = 0; i< hoverItems.length;i++){
//         hoverItems[i].classList.remove("hovered-line");
//     }
// }


// check the answer
function putNumber(thisItem) {
    let pencil = document.getElementsByClassName("pencil")[0];
    let coords = tileIs.id.split("-");
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    let innerOfTile = tileIs.innerText;
    let insertValueIs = thisItem.id;
    switch (true) {
        case tileIs.classList.contains("true") || tileIs.classList.contains("game"):
            tileIs.classList.remove("number-selected");
            document.getElementById("digits").style.opacity = 0.5;
            document.getElementById("digits").style.pointerEvents = "none";
            tileIs = null;
            console.log("this cell can't be changed!");
            break;
        case pencil.classList.contains("pencil-selected"):
            console.log("Mark It Now!");
            if (!innerOfTile.includes(insertValueIs)) {
                if (tileIs.classList.contains("false")) {
                    tileIs.innerText = "";
                    tileIs.classList.remove("false");
                }
                tileIs.innerText += thisItem.id + "-";
                tileIs.style.color = "bisque";
                tileIs.classList.add("mark");
            } else {
                window.alert("you can't repeat note's!");
            }
            break;
        case solution[r][c] == thisItem.id:
            if (!tileIs.classList.contains("false")) {
                let originalVal = solution[r][c];
                let rArray = endGame[r].split('');
                rArray[c] = originalVal;
                endGame[r] = rArray.join('');
                tileIs.innerText = thisItem.id;
                tileIs.style.color = "darkblue";
                tileIs.classList.add("true");
                tileIs.classList.add("game");
                tileIs.classList.remove("mark");
                tileIs.classList.remove("number-selected");
                console.log("true");
            } else {
                tileIs.innerText = thisItem.id;
                let originalVal = solution[r][c];
                let rArray = endGame[r].split('');
                rArray[c] = originalVal;
                endGame[r] = rArray.join('');
                tileIs.style.color = "darkblue";
                tileIs.classList.add("game");
                tileIs.classList.add("true");
                tileIs.classList.remove("number-selected");
                tileIs.classList.remove("false");
                tileIs.classList.remove("mark");
                console.log("true false");
            }
            if (arraysEqual(endGame, solution)) {
                document.getElementById("board").style.pointerEvents = "none";
                document.getElementById("digits").style.pointerEvents = "none";
                window.alert(`you end game with ${errors} error!`);
            } else {
                console.log("keep playing");
            }
            tileIs.classList.remove("number-selected");
            document.getElementById("digits").style.opacity = 0.5;
            document.getElementById("digits").style.pointerEvents = "none";
            tileIs = null;
            break;
        case solution[r][c] != thisItem.id:
            tileIs.innerText = thisItem.id;
            errors += 1;
            document.getElementById("errors").innerText = errors;
            tileIs.style.color = "darkred";
            tileIs.classList.add("false");
            tileIs.classList.remove("mark");
            console.log("false");
            break;
        default:
            console.log("default");
            break;

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

function eraserAnswer(thisItem) {
    if (thisItem.classList.contains("false") || thisItem.classList.contains("mark")) {
        thisItem.innerText = "";
        console.log("delete");
    } else {
        console.log("wtf?");
    }
    console.log(thisItem);
}

function toMark() {
    let pencil = document.getElementsByClassName("pencil")[0];

    if (pencil.classList.contains("pencil-selected")) {
        pencil.classList.remove("pencil-selected");
        console.log("unselect pencil");
    } else {
        pencil.classList.add("pencil-selected");
        console.log("select pencil");
    }
}