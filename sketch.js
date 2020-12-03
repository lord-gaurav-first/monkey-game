var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var score, survivalTime;

function preload(){
  
  
  monkey_running =loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")
  
  bananaImage = loadImage("banana.png");
 obstacleImage = loadImage("obstacle.png");
}



function setup() {
  createCanvas(600, 420)
  
  monkey= createSprite(45, 365, 10, 10);
  monkey.addAnimation("running", monkey_running);
  monkey.scale= 0.1;
  
  ground= createSprite(300, 400, 1000, 10);
  
  score= 0;
  
  
  fruitsGroup= new Group();
 obstaclesGroup= new Group();
  
  survivalTime= 0;
}


function draw() {
   background("white");
  
  drawSprites();
  
  monkey.collide(ground);
  
  if (keyDown("space") && monkey.y >= 360) {
    monkey.velocityY= -13;
  }
  
  monkey.velocityY= monkey.velocityY + 0.4;
  
  ground.velocityX= -4;
  
  if (ground.x < 0) {
    ground.x = ground.width/2;
  }
  
  bananas();
  obstacles();
  
  stroke("black");
  fill("black");
  textSize(22);
  text("Survival Time: " + survivalTime, 200, 60);
  
  survivalTime= Math.round(frameCount/60);
}

function bananas(){
  if (frameCount%80=== 0) {
    banana= createSprite(300, Math.round(random(120, 200)), 10, 10);
    banana.addImage("banana", bananaImage);
    banana.scale= 0.1;
    banana.lifetime= 100;
    banana.velocityX= -3;
    fruitsGroup.add(banana);
  }
}

function obstacles() {
  if (frameCount%100=== 0) {
    obstacle= createSprite(350, 360, 10, 10);
    obstacle.addImage("obstacle", obstacleImage);
    obstacle.scale= 0.2;
    obstacle.lifetime= 100;
    obstacle.velocityX= -3;
  //obstacle.collide(ground);
    obstaclesGroup.add(obstacle);
  }
}