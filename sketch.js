var trex,trexRunning,invisibleGround,ground,groundImage,score,gameState,PLAY,END,spawnClouds,spawnObstacles,cloudGroup,obstacleGroup,clouds,cloudImage,ob1,ob2,ob3,ob4,ob5,ob6,restart,restartImage,gameOver,gameOverImage,trexDead,die,jump,checkPoint;
localStorage["highestScore"]=0;
function preload(){
  jump=loadSound("jump.mp3");
  die=loadSound("die.mp3");
  checkPoint=loadSound("checkPoint.mp3");
  trexRunning=loadAnimation("trex1.png","trex3.png","trex4.png");
  trexDead=loadImage("trex_collided.png");
  restartImage=loadImage("restart.png");
  gameOverImage=loadImage("gameOver.png");
  groundImage=loadImage("ground2.png");
  cloudImage=loadImage("cloud.png");
  ob1=loadImage("obstacle1.png");
   ob2=loadImage("obstacle2.png");
   ob3=loadImage("obstacle3.png");
   ob4=loadImage("obstacle4.png");
   ob5=loadImage("obstacle5.png");
   ob6=loadImage("obstacle6.png");
}
function setup() {
  createCanvas(600, 200);
  invisibleGround=createSprite(200,175,400,10);
  ground=createSprite(200,163,10,10);
  ground.addAnimation("ground",groundImage);
  trex=createSprite(30,145,10,10);
  trex.addAnimation("trex",trexRunning);
  trex.scale=0.5;
  score=0;
  trex.setCollider("circle",0,0,31);
  
  PLAY=1;
  END=0;
  gameState=PLAY;
  gameOver=createSprite(300,70,10,10);
  gameOver.addImage("gameOver",gameOverImage);
  gameOver.scale=0.4;
  gameOver.visible=false;
  restart=createSprite(300,100,10,10);
  restart.addImage(restartImage);
  restart.scale=0.4;
  restart.visible= false;
  cloudGroup=new Group();
  obstacleGroup=new Group();
  
}

function draw() {
  background(230);
  if(gameState===PLAY){
    
    score=score+0.1;
     if(keyDown("space") && trex.y >= 146){
       jump.play();
      trex.velocityY = -13;
    }
    if (obstacleGroup.isTouching(trex)){
      die.play();
    gameState=END;
      trex.addImage("trex",trexDead);
      
  }
    if(Math.round(score) % 100=== 0 && Math.round(score) > 0){
      checkPoint.play();
      
    }
    trex.velocityY=trex.velocityY+1;
    trex.velocityY = trex.velocityY + 0.1;
    ground.velocityX=-(6+3*Math.round(score)/100);
    if(ground.x<0){
    ground.x=ground.width/2;
  }
    spawnClouds();
    spawnObstacles();
  }
  else if(gameState===END){
    restart.visible=true;
    gameOver.visible=true;
    ground.velocityX=0;
    trex.velocityY=0;
    obstacleGroup.setVelocityXEach(0);
    cloudGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-5);
    cloudGroup.setLifetimeEach(-5);
    
  }
  if(mousePressedOver(restart)){
    reset();
  }
  text("SCORE:"+Math.round(score),350,30);
  text("Highest Score:"+localStorage["highestScore"],200,30);
  invisibleGround.visible=false; 
  trex.collide(invisibleGround);
  
  createEdgeSprites();
  drawSprites();
}
function spawnClouds(){
  if (frameCount%60===0){
  clouds=createSprite(600,100,10,10);
    clouds.addImage("abc",cloudImage);
    clouds.velocityX=-6;
    clouds.y= random(50,100);
    clouds.lifetime=135;
    trex.depth=clouds.depth;
    trex.depth=trex.depth+4;
    gameOver.depth=clouds.depth;
    gameOver.depth=gameOver.depth+4;
    restart.depth=clouds.depth;
    restart.depth=restart.depth+6;
    cloudGroup.add(clouds);
  }
}
function spawnObstacles(){
  if (frameCount%100===0){
    obstacles=createSprite(600,146,10,10);
    obstacles.velocityX=-(6+3*Math.round(score)/100);
    var obj=Math.round(random(1,6));
    switch(obj){
      case 1:obstacles.addImage("a1",ob1);
        break;
        case 2: obstacles.addImage("a2",ob2);
        break;
        case 3:obstacles.addImage("a3",ob3);
        break;
        case 4:obstacles.addImage("a4",ob4);
        break;
        case 5:obstacles.addImage("a5",ob5);
        break;
        case 6:obstacles.addImage("a6",ob6);
        break;
        default:break;
    }
    obstacles.lifetime=135;
    obstacles.scale=0.4;
    obstacleGroup.add(obstacles);
  }
}
function reset(){
  gameState=PLAY;
 
  obstacleGroup.destroyEach();
  cloudGroup.destroyEach();
  restart.visible=false;
  gameOver.visible=false;
  trex.addAnimation("trex",trexRunning);
  if(localStorage["highestScore"]<Math.round(score)){
    localStorage["highestScore"]=Math.round(score);
  }
  console.log(localStorage["highestScore"]);
   score=0;
}
  
  
