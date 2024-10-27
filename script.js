"use strict";
var numSelected = null;
var tileSelected = null;
var delSelected = null;
var errors = 0;
var gameStart = 0;

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

// start game function
function startGame() {
    if (gameStart != 1) {
        setGame();
        gameStart += 1;
        console.log("game start condition:" + gameStart);
    } else {
        window.alert("Game has been started");
    }
}

// create table game and digits list
function setGame() {
    console.log("start creating digits");
    for (let i = 1; i <= 9; i++) {
        let number = document.createElement("div");
        number.id = i;
        number.innerText = i;
        number.addEventListener("click", selectNumber);
        number.classList.add("number");
        document.getElementById("digits").appendChild(number);
        console.log(`create digit number: ${i}`);
    }
    console.log("end create digits");

    let eraser = document.createElement("img");
    eraser.src = "icons8-eraser-96.png";
    eraser.classList.add("eraser");
    document.getElementById("digits").appendChild(eraser);
    eraser.style.pointerEvents = "none";
    eraser.style.opacity = "50%";
    eraser.addEventListener("click", deleteNumber);

    let pencil = document.createElement("img");
    pencil.src = "icons8-pencil-100.png";
    pencil.classList.add("pencil");
    document.getElementById("digits").appendChild(pencil);
    pencil.addEventListener("click", writeNumber);

    console.log("start create table game");
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            if (board[r][c] != "-") {
                tile.innerText = board[r][c];
                tile.classList.add("tile-start");
                tile.classList.add("game");
            }
            if (r == 2 || r == 5) {
                tile.classList.add("horizontal-line");
                console.log("create horizontal line in table game");
            }
            if (c == 2 || c == 5) {
                tile.classList.add("vertical-line");
                console.log("create vertical line in table game");
            }
            tile.addEventListener("click", selectTile);
            tile.classList.add("tile");
            document.getElementById("board").append(tile);
            console.log(`create table col and row coord: r= ${r} / c= ${c}`);
        }
    }
    console.log("end create table game");
}


// set selected digit number
function selectNumber() {
    if (numSelected != null) {
        numSelected.classList.remove("number-selected");
        console.log("clear pereves selected number in digits");
    }
    numSelected = this;
    numSelected.classList.add("number-selected");
    console.log(`digit number selected / number is ${numSelected.innerText}`);
}


// check the solution and count the mestiks
function selectTile() {
    if (numSelected) {
        if (this.innerText != "") {
            console.log("this block is full alredy");
            return;
        }
        this.innerText = numSelected.id;
        let coords = this.id.split("-");
        let r = parseInt(coords[0]);
        let c = parseInt(coords[1]);
        if (solution[r][c] == numSelected.id) {
            this.innerText = numSelected.id;
            this.style.color = "blue";
            this.classList.add("true");
            console.log(`${numSelected.id} is correct answer in ${r}/${c} coord`);
        } else {
            errors += 1;
            document.getElementById("errors").innerText = errors;
            this.style.color = "red";
            this.classList.add("false");
            console.log(`${numSelected.id} is wrong answer in ${r}/${c} coord`);
            delActive();
        }
    }
    if (delSelected) {
        delValue(this.id);
    }
}


function writeNumber() {
    delSelected = null;
    let digits = document.getElementsByClassName("number");
    let pencil = document.getElementsByClassName("pencil")[0];
    let ersaer = document.getElementsByClassName("eraser")[0];

    for (let i = 0; i < digits.length; i++) {
        digits[i].style.pointerEvents = "auto";
        digits[i].style.opacity = "100%";
    }
    pencil.classList.add("pencil-selected");
    ersaer.classList.remove("eraser-selected");
    console.log("you can input nubmers now!");
}

function delActive() {
    let ersaer = document.getElementsByClassName("eraser")[0];
    ersaer.style.pointerEvents = "auto";
    ersaer.style.opacity = "100%";

}

function deleteNumber() {
    numSelected = null;
    delSelected = 1;
    let digits = document.getElementsByClassName("number");
    let ersaer = document.getElementsByClassName("eraser")[0];
    let pencil = document.getElementsByClassName("pencil")[0];
    let selectedNumber = document.getElementsByClassName("number-selected")[0];
    for (let i = 0; i < digits.length; i++) {
        digits[i].style.pointerEvents = "none";
        digits[i].style.opacity = "50%";
    }
    ersaer.classList.add("eraser-selected");
    pencil.classList.remove("pencil-selected");
    if (selectedNumber) {
        if (selectedNumber.classList.contains("number-selected")) {
            selectedNumber.classList.remove("number-selected");
            console.log("you can delete your answers");
        } else {
            console.log("you can delete your answers");
        }
    } else {
        console.log("you can delete your answers");
    }
}

function delValue(thisItam) {
    let tile = document.getElementById(thisItam);
    console.log(tile);
    if(tile.classList.contains("false")){
        console.log("false");
        tile.innerText = "";
    }

}
