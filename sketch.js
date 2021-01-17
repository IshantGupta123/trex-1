var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided,start,ending;
var ground, invisibleGround, groundImage,bird ,ddie;

var cloud, cloudsGroup, cloudImage,echeckpoint;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6 ,gjump;

var score;


function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  start = loadImage("restart.png");
  ending = loadImage("gameOver.png");
  bird = loadImage("flying-birds-gif-transparent-7.gif");
  gjump=loadSound("jump.mp3");
  ddie=loadSound("die.mp3");
  echeckpoint=loadSound("checkPoint.mp3");
  
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  
  trex = createSprite(50,height-20,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided" , trex_collided)
  trex.scale = 0.5;
  
  
      
  ground = createSprite(200,height-20,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  invisibleGround = createSprite(200,height-10,400,10);
  invisibleGround.visible = false;
  
  // create Obstacles and Cloud groups
  obstaclesGroup = new Group();
  cloudsGroup = new Group();
  
  
  
  score = 0;
  start1 = createSprite(300,150,50,50);
  start1.addImage(start);
  start1.scale=0.3;
  end = createSprite(300,100,50,50);
  end.addImage(ending);
  end.scale=2;
  
  
  
  
  
}

function draw() {
  background(100,100,100);
  fill("yellow");
  text("Score: "+ score, 500,50);
 trex.setCollider("rectangle",0,0,100,100);
  var a=["ujjwal","aditya"]
  console.log(a[1])
  if(gameState === PLAY){
    //move the ground
    ground.velocityX = -(4+Math.round(score/100));
    if((touches.length>0||keyDown("space"))&& trex.y >= 150) {
    trex.velocityY = -13;
      gjump.play();
      touches=[];
  }
  spawnClouds();
   spawnObstacles();
    if(score>500){
      spawnbird();
    }
    if(score>0&&score %100===0){
      echeckpoint.play();
    }
    
  trex.velocityY = trex.velocityY + 0.8
   score = score + Math.round(frameCount/200);
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
    end.visible=false;
    start1.visible=false;
    if(trex.isTouching(obstaclesGroup)){
     gameState=END;
      ddie.play();
      
    }
}
    
     
  
  else if(gameState === END){
    //stop the ground
    ground.velocityX = 0;
      trex.changeAnimation("collided" , trex_collided);
    obstaclesGroup.setVelocityXEach(0);
     cloudsGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
     end.visible=true;
     start1.visible=true;
    
    
    
    
  
  }
  
  
  
  trex.collide(invisibleGround);
  if(mousePressedOver(end)){
    console.log("restart")
    restart();
  }
  
    
  drawSprites();
}

function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(400,height-35,10,40);
   obstacle.velocityX = -(6+Math.round(score/100));

   
    // //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
   
   //adding obstacles to the group
   obstaclesGroup.add(obstacle);
 }
}

function spawnbird(){
 if (frameCount % 200 === 0){
   
    bird2 = createSprite(500,height-100,25,25);
  bird2.addImage(bird);
  bird2.scale=0.05;
  bird2.velocityX=-2;
  
   

   
   
    //assign scale and lifetime to the obstacle           
    
    bird2.lifetime = 300;
   
   
 }
}





function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
     cloud = createSprite(600,height-100,40,10);
    cloud.y = Math.round(random(height-190,height-140));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -(3+Math.round(score/100));
    
     //assign lifetime to the variable
    cloud.lifetime = 134;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //adding cloud to the group
   cloudsGroup.add(cloud);
  }
  
}
function restart(){
  gameState=PLAY;
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  score=0;
  trex.changeAnimation("running", trex_running);
}