'use strict';
//Constructor function for all Enemies, our player must avoid
var Enemy = function (x, y, speed) {
    'use strict';
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

//Method to reset Enemy position

Enemy.prototype.resetLocation = function(){
    'use strict';
    this.x = -100;
    this.speed = Math.floor(Math.random() * 5 + 1) * 100;
}

// Method for updating the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    'use strict';
    this.x += this.speed * dt;

    if (this.x > 510) {
        this.resetLocation();
    }

    this.checkCollisions();
}

//function for checking the collision between enemy and player.

Enemy.prototype.checkCollisions = function(){
    'use strict';
    if (player.x < this.x + 70 &&
        player.x > this.x - 70 &&
        player.y > this.y - 60 &&
        player.y < this.y + 60){
            player.resetPosition();
          //Reseting the enemies position and speed.
            this.resetLocation();
  }
}

// Draw the enemy on the screen, required method for game

Enemy.prototype.render = function() {
    'use strict';
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Player constuctor function.

var Player = function () {
    'use strict';
    this.sprite = 'images/char-boy.png';
    this.x = 202;
    this.y = 405;
}

// Method to reset player position after collision.

Player.prototype.resetPosition = function(){
    'use strict';
    this.x = 202;
    this.y = 405;
}

// Draw the player on the screen, required method for game.

Player.prototype.render = function() {
    'use strict';
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

//Method for handling user input i.e key press and accordingly update player position.

Player.prototype.handleInput = function(keyPress){
    'use strict';
    const self = this;
    if (keyPress == 'left' && this.x > 0){
        this.x -= 102;
    }
    if (keyPress == 'right' && this.x < 405){
        this.x += 102;
    }
    if (keyPress == 'up' && this.y > 0){
        this.y -= 83;
    }
    if (keyPress == 'down' && this.y < 405){
        this.y += 83;
    }
    if (this.y < 0){
        setTimeout( function(){
            self.popup();
        }, 100)
        setTimeout( function(){
            self.resetPosition();
        }, 50)
    }
}

//Function for alert window when player wins the round

Player.prototype.popup = function(){
    'use strict';
    alert("You won it..Let's Replay!!!");
}

// Creating all enemy objects and placing them in an array called allEnemies

var enemy1 = new Enemy(-100, 60, (Math.floor(Math.random() * 4 + 1) * 100));
var enemy2 = new Enemy(-100, 145, (Math.floor(Math.random() * 5 + 1) * 100));
var enemy3 = new Enemy(-100, 230, (Math.floor(Math.random() * 6 + 1) * 100));

var allEnemies = [enemy1, enemy2, enemy3];

//Creating player instance

var player = new Player();

// This listens for key presses and sends the keys to your
document.addEventListener('keyup', function(e) {
    'use strict';
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
