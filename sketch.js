
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var score = 0;
var survivalTime = 0;
var invisbleGround;
var gameState = 0;
var PLAY = 0;
var END = 1;
var WIN = 2;

function preload(){
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
}

function setup() {
  createCanvas(displayWidth,displayHeight);
  
  monkey = createSprite(80, displayHeight - 10, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;

  ground = createSprite(1500, displayHeight - 5, 3000, 10);
  ground.velocityx = -4;
  groundx = ground.width/2;
  console.log(ground.x);
  
  invisibleGround = createSprite(1500, displayHeight - 5, 3000, 10);
  invisibleGround.visible = false;
  
  foodGroup = new Group();
  obstacleGroup = new Group();
}


function draw() {
  background("white");
  console.log(monkey.x);
  stroke("white");
  textSize(20);
  fill("black");
  text("Score: "+ score, 275, 50);
  
  stroke("black"); 
  textSize(20)
  fill("black");
  if (gameState == PLAY){
    survivalTime = Math.round(frameCount/60)
  }
  text("Survival Time: "+ survivalTime, 100, 50);
  
  if(gameState == PLAY) {
    camera.position.x = monkey.x;
    camera.position.y = displayHeight/2;

    if(keyDown("space")&& monkey.y >= 100) {
      monkey.velocityY = -13;
    }

    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    monkey.x = monkey.x + 1;
    monkey.velocityY = monkey.velocityY + 0.8
    monkey.collide(invisibleGround);
  
    if(foodGroup.isTouching(monkey)){
      foodGroup.destroyEach();
      score = score + 2;
    }
    
    if(obstacleGroup.isTouching(monkey)){
      obstacleGroup.setLifetimeEach(-1);
      foodGroup.setLifetimeEach(-1);
      obstacleGroup.setVelocityXEach(0);
      foodGroup.setVelocityXEach(0);
      gameState = END;
    }
    
    if(monkey.x > 2890){
      gameState = WIN;
    }

    bananaSpawn();
    obstacleSpawn();
  }
  
  if(gameState == END) {
    monkey.collide(invisibleGround);
    textAlign("center");
    textSize(20); 
    text("GAME OVER",monkey.x,monkey.y);
  }

  if(gameState == WIN) {
    monkey.collide(invisibleGround);
    textAlign("center");
    textSize(20); 
    text("YOU WON",monkey.x,monkey.y - 50);
  }
  
  drawSprites();
}

function bananaSpawn () {
  if (frameCount % 150 === 0){
    banana = createSprite(monkey.x + 1000, 200, 10, 10);
    banana.y = Math.round(random(displayHeight - 380, displayHeight - 150 ));
    banana.addImage(bananaImage);
    banana.velocityX = -6.5;
    banana.scale = 0.1;
    banana.lifetime = 250;
    foodGroup.add(banana);
    banana.depth = monkey.depth - 10;
  }
}

function obstacleSpawn () {
  if (frameCount % 600 === 0){
    obstacle = createSprite(monkey.x + 1000, displayHeight - 65, 20, 20);
    obstacle.velocityX = -4;
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.3;
    obstacle.lifetime = 550;
    obstacleGroup.add(obstacle);
  }
}