"use strict";

document.getElementById('start-button').addEventListener("mouseover", () => {
    let element = document.getElementById('start');
    element.style.backgroundColor = "rgba(42, 131, 95, 0.08)";
    element.style.boxShadow = "0 4px 30px rgba(0, 0, 0, 0.1)";
});

document.getElementById('start-button').addEventListener("mouseout", () => {
    let element = document.getElementById('start');
    element.style.backgroundColor = "rgba(42, 131, 95, 0.41)";
    element.style.boxShadow = "0 4px 30px rgba(0, 0, 0, 0.1)";
});