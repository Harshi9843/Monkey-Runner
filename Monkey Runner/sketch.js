var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var ground;
var survivalTime;
var ran;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(700, 300);
  
  
  monkey = createSprite(60, 260);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
  
  //Making the ground
  ground = createSprite(200, 290, 400, 10);
  ground.x = ground.width/2;
  ground.velocityX = -4;
  ground.scale = 4;
  
  survivalTime = 0;
  
  bananaGroup = new Group();
  obstacleGroup = new Group();
  
  
  
}


function draw() {
  //Background
  background("white");
  
  if(gameState == PLAY) {
    //Infinite ground
    if(ground.x == 0) {
      ground.x = ground.width/2;
      }
    
    //Scoring
    survivalTime =  Math.round(frameCount/frameRate());
    fill("black");
    textSize(15);
    text("Survival Time:" + survivalTime, 300, 20); 

    //Spawn obstacles
      spawnObstacles();
    //Spawn bananas
      spawnBananas();



    //Adding gravity
    monkey.velocityY = monkey.velocityY + 0.8;

    monkey.collide(ground);
    
    if(obstacleGroup.isTouching(monkey)){
       gameState = END;
    }
  }
  
  if(gameState == END) {
    ground.velocityX = 0;
    obstacleGroup.destroyEach();
    bananaGroup.destroyEach();
    survivalTime = survivalTime;
    fill("black");
    textSize(24);
    text("Survival Time:" + survivalTime, 270, 150); 
}

     //For the monkey to jump
    if(keyDown("space")) {
      monkey.velocityY = -20;
    }
  

  

  
  //For displaying the sprites
  drawSprites();

  
  //Adding gravity
  monkey.velocityY = monkey.velocityY + 0.4;
  
  monkey.collide(ground);
}

//function for spawning obstacles
function spawnObstacles() {
  if(frameCount % 80 == 0) {
    var obstacle = createSprite (700, 250);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.15;
    obstacle.velocityX = -7;
    obstacle.lifetime = 300;
    
    //Adding it to the group
    obstacleGroup.add(obstacle);
  }
}

function spawnBananas() {
  if(frameCount % 80 == 0) {
    var banana = createSprite(700, 125);
    var ran = Math.round(random(90, 150));
    banana.y = ran;
    
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -7;
    banana.lifetime = 300;
    
    //Adding it to the group
    bananaGroup.add(banana);
  }
}



