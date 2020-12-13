var gameState;
var PLAY = 0;
var END = 1;

var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var score;

function preload(){
  
  
  monkey_running =loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")
  
  bananaImage = loadImage("banana.png");
 obstacleImage = loadImage("obstacle.png");
}



function setup() {
  createCanvas(600, 420)
  
  monkey= createSprite(70, 365, 10, 10);
  monkey.addAnimation("running", monkey_running);
  monkey.scale= 0.1;
  
  ground= createSprite(300, 400, 1000, 10);
  
  score= 0;
  
  
  fruitsGroup= new Group();
 obstaclesGroup= new Group();
  
  survivalTime= 0;
  
  gameState= PLAY;
}


function draw() {
   background("lightBlue");
  
  drawSprites();
  
  monkey.collide(ground);
  
    stroke("black");
    fill("black");
    textSize(22);
    text("Survival Time: " + score, 200, 60);
  
  if (gameState=== PLAY){
      
    if (keyDown("space") && monkey.y >= 360) {
     monkey.velocityY= -13;
    }

    monkey.velocityY= monkey.velocityY + 0.3;

    ground.velocityX= -(6 + score*2);

    if (ground.x < 0) {
      ground.x = ground.width/2;
    }

     bananas();
     obstacles();

     score= Math.round(frameCount/60);
    
    if (obstaclesGroup.isTouching(monkey)){
        gameState= END;
     }
    
    //code for one banana destroying one at a time
    if (fruitsGroup.isTouching(monkey)) {
       for (var i = 0; i<fruitsGroup.length; i++){
         if (fruitsGroup.get(i).isTouching(monkey)){
           fruitsGroup.get(i).remove();
         }
      }
    }
    
  }else if(gameState=== END) {  
     monkey.pause();
      
     obstaclesGroup.setVelocityXEach(0);
     fruitsGroup.setVelocityXEach(0);
      
     ground.velocityX= 0;

     //set lifetime of the game objects so that they are never destroyed
     obstaclesGroup.setLifetimeEach(-1);
     fruitsGroup.setLifetimeEach(-1);
    
     monkey.velocityY= monkey.velocityY + 0.4;
  }
}

function bananas(){
  if (frameCount%80=== 0) {
    banana= createSprite(620, Math.round(random(120, 200)), 10, 10);
    banana.addImage("banana", bananaImage);
    banana.scale= 0.1;
    banana.lifetime= 180;
    banana.velocityX= -5;
    fruitsGroup.add(banana);
    return banana
  }
}

function obstacles() {
  if (frameCount%300=== 0) {
    obstacle= createSprite(655, 365, 10, 10);
    obstacle.addImage("obstacle", obstacleImage);
    obstacle.scale= 0.2;
    obstacle.lifetime= 200;
    obstacle.velocityX= -4.5;
    obstaclesGroup.add(obstacle);
    obstacle.setCollider("circle", -30, 0, 240);
    //obstacle.debug= true;
    obstacle.rotation= 5;
    return obstacle
  }
}
