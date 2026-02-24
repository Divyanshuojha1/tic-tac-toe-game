let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;
let gameOver = false;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = () => {
    turnO = true;
    gameOver = false;

    boxes.forEach((box) => {
        box.disabled = false;
        box.innerText = "";
    });

    msgContainer.classList.add("hide");
};

const disableBoxes = () => {
    boxes.forEach((box) => box.disabled = true);
};

const showWinner = (winner) => {
    msg.innerHTML = `Winner is <span style="color: yellow;">${winner}</span>`;
    msgContainer.classList.remove("hide");
    disableBoxes();
    gameOver = true;
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if (pos1 !== "" && pos1 === pos2 && pos2 === pos3) {
            showWinner(pos1);
            return;
        }
    }

    let allFilled = [...boxes].every(box => box.innerText !== "");
    if (allFilled && !gameOver) {
        msg.innerHTML = `It's a <span style="color: orange;">Draw</span>`;
        msgContainer.classList.remove("hide");
        gameOver = true;
    }
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (gameOver) return;

        if (turnO) {
            box.innerText = "O";
            box.style.color = "#000000";  // Blue
        } else {
            box.innerText = "X";
            box.style.color = "#ff3b3b";  // Red
        }

        turnO = !turnO;
        box.disabled = true;
        checkWinner();
    });
});

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);