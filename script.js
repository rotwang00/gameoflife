let conway = document.getElementById("conway").getContext("2d");
let width = document.getElementById("conway").width;
let height = document.getElementById("conway").height;
let size = 5;

let draw = (x, y, c, s) => {
  conway.fillStyle = c;
  conway.fillRect(x, y, s, s);
};

draw(5, 5, 100, 100);
