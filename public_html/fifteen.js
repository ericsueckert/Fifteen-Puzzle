/*
 * Eric Eckert CSE 154 AC
 * Fifteen puzzle
 * js for fifteen.html, contains all methods to play with and shuffle the puzzle
 * 
 */
"use strict";

var blankx;
var blanky;

//Onload function
window.onload = function () {
    //place all pieces in correct place
    setPieces();
    document.getElementById("shufflebutton").onclick = shuffle;
    var tiles = document.getElementsByClassName("tile");
    for (var i = 0, length = tiles.length; i < length; i++) {
        tiles[i].onclick = moveTile;
    }
    //blank area is in the bottom right corner
    blankx = 300;
    blanky = 300;
};

//place all pieces in correct place one by one
function setPieces() {
    for (var i = 0; i <= 14; i++) {
        createPiece("p" + (i + 1));
    }
}

//create a single piece, pass in id to identify the div
function createPiece(id) {
    var piece = document.createElement("div");
    //add class and id
    piece.setAttribute("class", "tile");
    piece.setAttribute("id", id);
    //write number on div
    piece.innerHTML = parseInt(id.substring(1));
    //add piece to puzzle area
    document.getElementById("puzzlearea").appendChild(piece);
}

//move tile when clicked
function moveTile() {
    var thisx = this.offsetLeft;
    var thisy = this.offsetTop;
    //check if piece is next to empty space, if so then swap
    if (thisy === blanky) {
        if (thisx === (blankx - 100) || thisx === parseInt(blankx + 100)) {
            swap(this);
        }
    }
    else if (thisx === blankx) {
        if (thisy === (blanky - 100) || thisy === (blanky + 100)) {
            swap(this);
        }
    }
}

//swap piece with empty space
function swap(piece) {
    var thisx = piece.offsetLeft;
    var thisy = piece.offsetTop;
    piece.style.left = blankx + "px";
    blankx = thisx;
    piece.style.top = blanky + "px";
    blanky = thisy;
}

//shuffle the board
function shuffle() {
    var neighbors = [];
    //randomly move 1000 times
    for (var i = 0; i < 1000; i++) {
        //reset array
        neighbors.length = 0;
        //check each piece to see which ones are next to the empty space
        for (var j = 0; j <= 14; j++) {
            var thisPiece = document.getElementById("p" + (j + 1));
            var thisx = thisPiece.offsetLeft;
            var thisy = thisPiece.offsetTop;
            //if piece is next to empty space, add to array
            if (thisy === blanky) {
                if (thisx === (blankx - 100) || thisx === parseInt(blankx + 100)) {
                    neighbors[neighbors.length] = thisPiece;
                }
            }
            else if (thisx === blankx) {
                if (thisy === (blanky - 100) || thisy === (blanky + 100)) {
                    neighbors[neighbors.length] = thisPiece;
                }
            }
        }
        //choose random piece, and swap it
        var choose = Math.floor((Math.random() * neighbors.length));
        swap(neighbors[choose]);
    }
}