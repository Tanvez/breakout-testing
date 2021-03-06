/* globals __DEV__ */
import Phaser from 'phaser'
import Brick from '../prefab/Brick'
import Paddle from '../prefab/Paddle'
import Ball from '../prefab/Ball'

export default class extends Phaser.State {

  constructor (){
    super();
    this.ballOnPaddle = true
  }
  init () {}
  preload () {}

  create () {
  this.setupText()
  this.setupBricks()
  this.setupPaddle()
  this.setupBall()
  this.game.input.onDown.add(this.releaseBall, this)
  }

  releaseBall(){
    
    if(!this.ballOnPaddle){
      return
    }
    this.ballOnPaddle = false
    this.ball.body.velocity.y = -300
    this.ball.body.velocity.x = -100
  }

  setupBall(){
    this.ball = new Ball(this.game)
    this.game.add.existing(this.ball)
    this.putBallOnPaddle()
  }

  putBallOnPaddle(){
    this.ballOnPaddle = true;
    this.ball.reset(this.paddle.body.x, this.paddle.y - this.paddle.body.height)
  }

  setupPaddle(){
    this.paddle = new Paddle(
      this.game,
      this.game.world.centerX,
      this.game.world.height - 100
    )
  this.game.add.existing(this.paddle)
  }

  setupBricks(){
    this.bricks= this.game.add.group() // can apply to all things inside of it
    this.generateBricks(this.bricks)
  }

  generateBricks(bricksGroup){
    let rows = 5
    let columns = 15
    let xOffset = 50
    let yOffset = 45
    let brick
    for(let y = 0; y< rows; y++){
      for(let x = 0; x< columns; x++){
        
        brick = new Brick(
        this.game,
        x* xOffset,
        y* yOffset
        )
        bricksGroup.add(brick)
      }
    }
   let bricksGroupWidth = ((xOffset * columns)- (xOffset - brick.width))/2

  //  console.log(bricksGroupWidth)

   bricksGroup.position.setTo(
     this.game.world.centerX - bricksGroupWidth,
     this.game.world.centerY -150
    )
    // console.log(bricksGroup.position)
  }

  setupText(){
   this.createText(20,20,'left', `Score: ${this.game.global.score}`);
   this.createText(0,20,'center', `Lives: ${this.game.global.lives}`);
   this.createText(-20,20,'right', `Level: ${this.game.global.level}`);
  }

  createText(xOffset, yOffset, align, text){
   return this.game.add.text(
     xOffset,
     yOffset, 
     text, 
     {
       font: '18px Ariel', fill:'#000', boundsAlignH:align
    }).setTextBounds(0,0, this.game.world.width, 0)
  }
  update(){
    
    if(this.ballOnPaddle){
      this.ball.body.x = this.paddle.x-(this.ball.width/2)
    }

    this.game.physics.arcade.collide(
      this.ball,
      this.paddle,
      this.ballHitPaddle,
      null,
      this

    )

  }
  ballHitPaddle(){

  }

  render () {

    }
  }

