/*
Name: Jay Lauzon
File: main.js
Date: July 25, 2026
Description: Lab 4 Part 4 - OOP Inheritance, EvilCircle keyboard controls, and collision detection score tracking.
*/

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);
const para = document.querySelector("p");
let count = 0;

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomRGB() {
return `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`;
}

// ===========================================================================
// 1. SUPERCLASS
// ===========================================================================
class Shape {
    constructor(x, y, velX, velY) {
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
    }
}

// ==========================================================================
// 2. BALL CLASS (Inherits from Shape)
// ==========================================================================
class Ball extends Shape {
    constructor(x, y, velX, velY, color, size) {
        super(x, y, velX, velY);
        this.color = color;
        this.size = size;
        this.exists = true; // tracks whether the ball is still in play (not removed)
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
    }

    update() {
        if (this.x + this.size >= width) {
            this.velX = -this.velX;
        }

        if (this.x - this.size <= 0) {
            this.velX = -this.velX;
        }

        if (this.y + this.size >= height) {
            this.velY = -this.velY;
        }

        if (this.y - this.size <= 0) {
            this.velY = -this.velY;
        }

        this.x += this.velX;
        this.y += this.velY;
    }

    collisionDetect() {
        for (const ball of balls) {
            // Only check collisions if the target ball exists and isn't itself
            if (!(this === ball) && ball.exists) {
                const dx = this.x - ball.x;
                const dy = this.y - ball.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
               
                if (distance < this.size + ball.size) {
                    ball.color = this.color = randomRGB();
                }
            }
        }
    }
}

// ===========================================================================
// 3. Evil CIRCLE CLASS (Inherits from Shape)
// ===========================================================================
class EvilCircle extends Shape {
    constructor(x, y) {
        super(x, y, 20, 20);
        this.color = "white";
        this.size = 10;

        this.setControls();
    }

    draw() {
        ctx.beginPath();
        ctx.lineWidth = 3;
        ctx.strokeStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.stroke();
    }
    
    checkBounds() {
        if (this.x + this.size >= width) {
           this.x = width - this.size;
        }

        if (this.x - this.size <= 0) {
            this.x = this.size;
        }

        if (this.y + this.size >= height) {
            this.y = height - this.size;
        }

        if (this.y - this.size <= 0) {
            this.y = this.size;
        }
    }

    setControls() {
        window.addEventListener("keydown", (e) => {
            switch (e.key) {
                case "a":
                case "ArrowLeft":
                    this.x -= this.velX;
                    break;
                case "d":
                case "ArrowRight":
                    this.x += this.velX;
                    break;
                case "w":
                case "ArrowUp":
                    this.y -= this.velY;
                    break;
                case "s":
                case "ArrowDown":
                    this.y += this.velY;
                    break;
            }
        });
    }

    collisionDetect() {
        for (const ball of balls) {
            if (ball.exists) {
                const dx = this.x - ball.x;
                const dy = this.y - ball.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                // Evil Circle eats the ball on contact
                if (distance < this.size + ball.size) {
                    ball.exists = false;
                    count--;
                    para.textContent = 'Ball count: ' + count;
                }
            }
        }
    }
}

// =========================================
// 4. ANIMATION SETUP & LOOP
// =========================================
const balls = [];

while (balls.length < 25) {
  const size = random(10, 20);
  const ball = new Ball(
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-7, 7),
    random(-7, 7),
    randomRGB(),
    size
  );

  balls.push(ball);
  count++;
}

para.textContent = 'Ball count: ' + count;

// Instantiate EvilCircle object
const evilCircle = new EvilCircle(random(0, width), random(0, height));

function loop() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.fillRect(0, 0, width, height);

  for (const ball of balls) {
    if (ball.exists) {
      ball.draw();
      ball.update();
      ball.collisionDetect();
    }
  }

  // Draw and update Evil Circle
  evilCircle.draw();
  evilCircle.checkBounds();
  evilCircle.collisionDetect();

  requestAnimationFrame(loop);
}

loop();