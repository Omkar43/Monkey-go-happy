
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage ;
var fruitGroup, obstaclesGroup ;
var  foodScore = 0 ;
var invisibleGround ;
var survivalTime = 0;
var bg , bgImg ;
var score = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY ;


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  bgImg = loadImage("jungle.jpg");
 
 
}



function setup() {
  
  createCanvas(500,500);
  
 bg = createSprite(300,280,10,10);
 bg.addImage(bgImg);
 bg.velocityX = -6;
 bg.x = bg.width/2 ;
 bg.scale = 1 ;
  
  
  
 monkey = createSprite(80,420,20,20);
 monkey.addAnimation("moving",monkey_running);
 monkey.scale = 0.1;
    
 invisibleGround = createSprite(200,450,800,10);
 invisibleGround.visible = false ;

  fruitGroup =new Group();
  obstaclesGroup =new Group();

}


function draw() {
  
  background("black");
  
    if(gameState === PLAY){ 
      
      if(keyDown("space")&& monkey.y >= 350) {
        monkey.velocityY = -12;
        }
               
     if (bg.x < 0){
    bg.x = bg.width/2;
   }
   
   monkey.velocityY = monkey.velocityY + 0.8
  
  monkey.collide(invisibleGround);
  
  if(fruitGroup.isTouching(monkey)){
    foodScore = foodScore + 2;
    fruitGroup.destroyEach();
  }
  
  
  switch(foodScore){
    case 10 : monkey.scale = 0.12 ;
             break ;
    case 20 : monkey.scale = 0.14 ;
             break ;
    case 30 : monkey.scale = 0.16 ;
             break ;
    case 40: monkey.scale = 0.18 ;
             break ; 
    default : break ;     
  }
  

   food ();
   obstacles();
   
   drawSprites();
  
    }
  
  if( gameState === END) {
    background("black");
    fill("cyan");
    textSize(35);
    text("GAME OVER",148,250);
    
    
  }
 
  if(obstaclesGroup.isTouching(monkey)) {
   gameState = END ;
   }
   
  
   
  textSize(20);
  fill("black");
  score = score + Math.round(getFrameRate()/60);
  text("Survival time: "+score,310, 30);
  text("Score : " + foodScore , 2, 30);
  
}

function food () {
  if (frameCount % 80 === 0) {
    var banana = createSprite(400,120,40,10);
    banana.y = Math.round(random(250,320 ));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 160;
    
    //adjust the depth
    banana.depth = monkey.depth;
    banana.depth = monkey.depth + 1;
    
    fruitGroup.add(banana);
    
  }
   
}


function obstacles(){
  if (frameCount%100  === 0){
    
    obstacle = createSprite(620,430,50,50);
    obstacle.addImage("rock", obstacleImage);
    
    obstacle.scale = 0.1  ;
    obstacle.velocityX = -4;
    obstacle.lifetime = 220;
    obstaclesGroup.add(obstacle);
    
  }
}





