let conway = document.getElementById("conway").getContext("2d");
let width = document.getElementById("conway").width;
let height = document.getElementById("conway").height;
let size = 50;
let rows = 4;
let cols = 7;

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
      arr[i][j] = Math.floor(Math.random() * 2);
    }
  }
  return arr;
};

let drawGrid = (arr, yOffset) => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if (arr[i][j] == 1) {
        conway.fillStyle = "black";
        drawCell(i * (size + 1), j * (size + 1) + yOffset, size, size);
      } else {
        conway.fillStyle = "lightgrey";
        drawCell(i * (size + 1), j * (size + 1) + yOffset, size, size);
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

  console.log(i, j, count);

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
      } else if (neighbors != 2 && neighbors != 3) {
        // death from overcrowding or loneliness
        nextGen[i][j] = 0;
      } else {
        // maintain current condition
        nextGen[i][j] = arr[i][j];
      }
    }
  }
  return nextGen;
};

let currentGrid = createGrid(rows, cols);
fillRandom(currentGrid);
drawGrid(currentGrid, 0);
console.dir(currentGrid);
let generationCount = 1;

let nextGenGrid = findNextGen(currentGrid);
drawGrid(nextGenGrid, 240);
console.dir(nextGenGrid);
// currentGrid = JSON.parse(JSON.stringify(nextGenGrid));

// drawGrid(currentGrid);
// generationCount++;
