let conwayCanvas = document.getElementById("conway");
let conway = document.getElementById("conway").getContext("2d");
let width = document.getElementById("conway").width;
let height = document.getElementById("conway").height;
conwayCanvas.addEventListener("mousedown", function (e) {
  getMousePosition(conwayCanvas, e);
});

let size = 12;
let rows = 32;
let cols = 60;
let population = 0;

let generationDisplay = document.getElementById("generationDisplay");
let populationDisplay = document.getElementById("populationDisplay");
let nextGenerationButton = document.getElementById("nextGenerationButton");
nextGenerationButton.addEventListener("click", advanceGeneration, false);
document.addEventListener("keydown", (event) => {
  const keyName = event.key;
  if (keyName == "n") {
    advanceGeneration();
  }
});

let drawCell = (x, y, c, s) => {
  conway.fillStyle = c;
  conway.fillRect(x, y, s, s);
};

let createGrid = (cols, rows) => {
  let arr = new Array(rows);
  for (let i = 0; i < rows; i++) {
    let row = new Array(cols);
    arr[i] = row;
  }
  return arr;
};

let fillRandom = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      let status = Math.floor(Math.random() * 2);
      if (status == 1) population++;
      arr[i][j] = status;
    }
  }
  return arr;
};

let drawGrid = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if (arr[i][j] == 1) {
        conway.fillStyle = "black";
        drawCell(i * (size + 1), j * (size + 1), size, size);
      } else {
        conway.fillStyle = "lightgrey";
        drawCell(i * (size + 1), j * (size + 1), size, size);
      }
    }
  }
};

let findNeighbors = (arr, i, j) => {
  let count = 0;
  // first row
  if (i - 1 >= 0 && j - 1 >= 0 && arr[i - 1][j - 1] == 1) count++;
  if (j - 1 >= 0 && arr[i][j - 1] == 1) count++;
  if (i + 1 < arr.length && j - 1 >= 0 && arr[i + 1][j - 1] == 1) count++;

  // second row
  if (i - 1 >= 0 && arr[i - 1][j] == 1) count++;
  if (i + 1 < arr.length && arr[i + 1][j] == 1) count++;

  // third row
  if (i - 1 >= 0 && j + 1 < arr.length && arr[i - 1][j + 1] == 1) count++;
  if (j + 1 < arr.length && arr[i][j + 1] == 1) count++;
  if (i + 1 < arr.length && j + 1 < arr.length && arr[i + 1][j + 1] == 1)
    count++;

  return count;
};

let findNextGen = (arr) => {
  let nextGen = createGrid(rows, cols);
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      let neighbors = findNeighbors(arr, i, j);
      if (arr[i][j] == 0 && neighbors == 3) {
        // empty cell gets a birth
        nextGen[i][j] = 1;
        population++;
      } else if (neighbors != 2 && neighbors != 3 && arr[i][j] == 1) {
        // death from overcrowding or loneliness
        nextGen[i][j] = 0;
        population--;
      } else {
        // maintain current condition
        nextGen[i][j] = arr[i][j];
      }
    }
  }
  return nextGen;
};

function advanceGeneration() {
  generationCount++;
  generationDisplay.textContent = `Generation: ${generationCount}`;
  let nextGenGrid = findNextGen(currentGrid);
  populationDisplay.textContent = `Population: ${population}`;
  drawGrid(nextGenGrid);
  currentGrid = JSON.parse(JSON.stringify(nextGenGrid));
}

function getMousePosition(canvas, event) {
  let rect = canvas.getBoundingClientRect();
  let x = event.clientX - rect.left;
  let y = event.clientY - rect.top;
  console.log("Coordinate x: " + x, "Coordinate y: " + y);
  handleClick(canvas, x, y);
}

function handleClick(canvas, x, y) {}

let currentGrid = createGrid(rows, cols);
fillRandom(currentGrid);
drawGrid(currentGrid);
populationDisplay.textContent = `Population: ${population}`;
let generationCount = 1;
