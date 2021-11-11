/**
* ------------------------------------
* Section for canvas setup
--------------------------------------
*/
// Set up canvas
// Begin
let canvas = document.getElementById('canvas'),
  ctx = canvas.getContext('2d'),
  width = (canvas.width = window.innerWidth),
  height = (canvas.height = window.innerHeight);
// Readjust values on window resize
window.addEventListener('resize', () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  init();
});
/**
* ------------------------------------
* Section for the main Square class
--------------------------------------
*/
class Square {
  /**
   * Public constructor for the Square class
   * @param {Number} x
   * @param {Number} y
   * @param {Number} size
   * @param {Number} vel
   * @param {Number} radius
   */
  constructor(x, y, vel, radius, width, height = null) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height || this.width;
    this.velocity = vel;
    this.radius = { tl: radius, tr: radius, br: radius, bl: radius };
    this.opacity = 0;
  }
  // Main update function
  update() {
    this.y += this.velocity;
    this.opacity += 0.009;
    if (this.y < -height) {
      this.opacity = 0;
      this.y = -this.y;
    }
    this.draw();
  }
  // Main draw function
  draw() {
    ctx.save();
    ctx.rotate(-0.3);
    ctx.scale(1, 2 / 3);
    ctx.beginPath();
    let t = width + height,
      d = this.x + this.y,
      p = d / t,
      color = 360 * p;
    ctx.strokeStyle = `hsla(${color}, 100%, 50%, ${this.opacity})`;
    ctx.moveTo(this.x + this.radius.tl, this.y);
    ctx.lineTo(this.x + this.width - this.radius.tr, this.y);
    ctx.quadraticCurveTo(
      this.x + this.width,
      this.y,
      this.x + this.width,
      this.y + this.radius.tr
    );
    ctx.lineTo(this.x + this.width, this.y + this.height - this.radius.br);
    ctx.quadraticCurveTo(
      this.x + this.width,
      this.y + this.height,
      this.x + this.width - this.radius.br,
      this.y + this.height
    );
    ctx.lineTo(this.x + this.radius.bl, this.y + this.height);
    ctx.quadraticCurveTo(
      this.x,
      this.y + this.height,
      this.x,
      this.y + this.height - this.radius.bl
    );
    ctx.lineTo(this.x, this.y + this.radius.tl);
    ctx.quadraticCurveTo(this.x, this.y, this.x + this.radius.tl, this.y);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  }
}
let squares;
// Square creator
const createSquare = size => {
  let vel = -height * 0.003,
    radius = 25,
    offset = size * 1.2,
    cols = 2,
    rows = 5,
    posX = width * 0.5,
    posY = height * 0.5;
  for (let x = posX, i = 0; i < cols; x += offset, i++) {
    for (let y = posY, j = 0; j < rows; y += offset, j++) {
      if (i % 2 == 0) {
        if (j % 2 == 0) {
          squares.push(new Square(x, y, vel, radius, offset, size));
        } else {
          squares.push(new Square(x + offset / 1.2, y, vel, radius, size));
        }
      }
    }
  }
};
// Init function
const init = () => {
  squares = [];
  createSquare(height / 3);
};
// Animation Loop function
const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (square of squares) {
    square.update();
  }
  // Stay in sync with browser
  requestAnimationFrame(animate);
};
// Init animation loop
init();
animate();
 let btn = document.querySelector('.menu-button'),
     menu = document.querySelector('.menu');
btn.addEventListener('click', function() {
	btn.classList.toggle('active');
	menu.classList.toggle('active');
});