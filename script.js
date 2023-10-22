let conway = document.getElementById("conway").getContext("2d");
let width = document.getElementById("conway").width;
let height = document.getElementById("conway").height;
let size = 5;

let drawCell = (x, y, c, s) => {
  conway.fillStyle = c;
  conway.fillRect(x, y, s, s);
};
