//selecting element 
let boxes = document.querySelectorAll(".box");
let reset_btn = document.querySelector("#reset");
let restart_btn = document.querySelector(".restart");
let O_score = document.querySelector("#O-score");
let X_score = document.querySelector("#X-score");

//audio
const music = new Audio("music.mp3");
const click = new Audio("move.mp3");
const over = new Audio("gameover.mp3");

//inputs and winpatern array
let i = 0; //for storing indexes of inputs
let O_input = [];
let X_input = [];
const winPaterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

//other varibles
let Oscore = 0;
let Xscore = 0;
let turnO = false;  //stores x turn(or O turn) 
let result;        //gives wineer O/X


//main funtion : on click on box
boxes.forEach((box, idx) => {
  box.addEventListener("click", () => {
    click.play();
    music.play();
    music.volume = 0.5;
    console.log(idx, "box");

    mark(box, idx);

    if (Winner() == "O") {
      //changes after winning O
      O_score.innerText = ++Oscore + "*";
      X_score.innerText = Xscore;
      O_score.style.color = "#591300";
      X_score.style.color = "tomato";
      over.play();
      clear();
    } else if (Winner() == "X") {
      //changes after winning X
      X_score.innerText = ++Xscore + "*";
      O_score.innerText = Oscore;
      X_score.style.color = "#591300";
      O_score.style.color = "tomato";
      clear();
      over.play();
    }
  });
});


//add text O/x in box && store inputs in O_input[] and X_input[]
function mark(box, idx) {
  if (turnO == true) {
    if (box.innerText != "X") {
      box.innerText = `O`;
      turnO = false;
      O_input[i] = idx;
      i++;
    }
  } else {
    if (box.innerText != "O") {
      box.innerText = `X`;
      X_input[i] = idx;
      turnO = true;
    }
  }
}

//reset button
reset_btn.addEventListener("click", clear);

//restart button
restart_btn.addEventListener("click", restart);

//reset the game
function clear() {
  boxes.forEach((box) => {
    box.innerText = ``;
  });
  turnO = false;
  O_input = [];
  X_input = [];
  i = 0;
  result = false;
}

//restart the game
function restart() {
  clear();
  O_score.innerText = 0;
  X_score.innerText = 0;
  Oscore=0;
  Xscore=0;
}



//return winner X or O
function Winner() {
  winPaterns.forEach((i) => {
    if (isSubset(O_input, i)) {
      result = "O";
    }
    if (isSubset(X_input, i)) {
      result = "X";
    }
  });
  return result;
}


//compare winningpattern and input array values
function isSubset(arr1, arr2) {
  const set1 = new Set(arr1);
  const set2 = new Set(arr2);
  return [...set2].every((val) => set1.has(val));
}
