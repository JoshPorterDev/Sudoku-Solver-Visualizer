const board = [[], [], [], [], [], [], [], [], []];

const puzzle1 =
  "052071048006040125108002709205490816804016537607583204020764081761809452409025073";
const puzzle2 =
  "300000000000705600000210003100000700000008350402000000009080000005000140000064080";
const puzzle3 =
  "500080049000500030067300001150000000000208000000000018700004150030002000490050003";

const iterations = 0;

function isValid(x, y, n) {
  // Valid in row
  for (let i = 0; i < 9; i++) {
    if (board[x][i] == n) {
      return false;
    }
  }
  // Valid in column
  for (let j = 0; j < 9; j++) {
    if (board[j][y] == n) {
      return false;
    }
  }
  // Valid in box
  let box_row = Math.floor(x / 3) * 3;
  let box_col = Math.floor(y / 3) * 3;
  for (let k = 0; k < 3; k++) {
    for (let l = 0; l < 3; l++) {
      if (board[box_row + k][box_col + l] == n) {
        return false;
      }
    }
  }
  return true;
}

async function solvePuzzle() {
  for (let y = 0; y < 9; y++) {
    for (let x = 0; x < 9; x++) {
      if (board[y][x] == 0) {
        // change background color of current cell
        let cell = document.querySelectorAll(".board .cell")[y * 9 + x];
        cell.classList.add("currentCell");
        await new Promise((resolve) => setTimeout(resolve, 100));

        // Loop through 1-9
        for (let n = 1; n < 10; n++) {
          if (isValid(y, x, n)) {
            board[y][x] = n;
            drawBoard();
            const solved = await solvePuzzle();
            if (solved) {
              return true;
            }
            board[y][x] = 0;
            drawBoard();
          }
        }
        cell.classList.remove("currentCell");
        await new Promise((resolve) => setTimeout(resolve, 100));

        return false;
      }
    }
  }
  drawBoard();
  return true;
}

function loadPuzzle(number) {
  let input = document.getElementById("puzzleInput");
  switch (number) {
    case 1:
      input.innerHTML = puzzle1;
      break;
    case 2:
      input.innerHTML = puzzle2;
      break;
    case 3:
      input.innerHTML = puzzle3;
      break;
    default:
      input.innerHTML = puzzle1;
  }
  inputPuzzle();
}

function initializeBoard(val) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      board[i][j] = val;
    }
  }
}

function reset() {
  for (let y = 0; y < 9; y++) {
    for (let x = 0; x < 9; x++) {
      // change background color of current cell
      let cell = document.querySelectorAll(".board .cell")[y * 9 + x];
      cell.classList.remove("currentCell");
    }
  }
  initializeBoard(7);
  drawBoard();
}

function drawBoard() {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      let cell = document.querySelectorAll(".board .cell")[i * 9 + j];
      if (board[i][j] == 0) {
        cell.innerHTML = "";
      } else {
        cell.innerHTML = board[i][j];
      }
    }
  }
}

function inputPuzzle() {
  let input = document.getElementById("puzzleInput").value;
  input = input.replace(/\n/g, "");
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      board[i][j] = parseInt(input[i * 9 + j]);
    }
  }
  drawBoard();
}

initializeBoard(7);
drawBoard();
