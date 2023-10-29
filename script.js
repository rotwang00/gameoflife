let conway = document.getElementById("conway").getContext("2d");
let width = document.getElementById("conway").width;
let height = document.getElementById("conway").height;
let size = 10;
let rows = 40;
let cols = 70;

let drawCell = (x, y, c, s) => {
  conway.fillStyle = c;
  conway.fillRect(x, y, s, s);
};

let createCurrentGrid = (cols, rows) => {
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

let findNextGen = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      let neighbors = findNeighbors(arr, i, j);
      console.log(neighbors);
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

let currentGrid = createCurrentGrid(rows, cols);
fillRandom(currentGrid);
drawGrid(currentGrid);

console.log(findNeighbors(currentGrid, 69, 39));
