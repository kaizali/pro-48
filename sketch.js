var characterimg,ch;
var monsterimg;
var bgimage,bg;
var score = 0;
var gameState = "play";

function preload(){
  characterimg = loadAnimation("images/c1.png", "images/c3.png", "images/c5.png", "images/c6.png", "images/c7.png", "images/c8.png", "images/c9.png", "images/c10.png", "images/c11.png", "images/c12.png", "images/c13.png","images/c14.png" ,"images/c15.png","images/c16.png")
  monsterimg = loadAnimation(" images/m1.png","images/m2.png", "images/m3.png", "images/m4.png", "images/m5.png", "images/m6.png", "images/m7.png", "images/m8.png", "images/m9.png", "images/m10.png", "images/m11.png", "images/m12.png", "images/m13.png")
  bgimage = loadImage("images/junglebg.gif")
  fruit1img = loadImage("images/banana.png")
  fruit2img = loadImage("images/strawberry.png");
  fruit3img = loadImage("images/pineapple.png");
  charactercollide = loadAnimation("images/c8.png")
  sound = loadSound("background sound.mp3")
}
function setup() {
  createCanvas(windowWidth,windowHeight);
  sound.loop();
  bg = createSprite(width/2,height/2-300);
  bg.addImage(bgimage);
  bg.scale = 4.7;
  bg.velocityX = -20
  
  ch = createSprite(100, height-200);
  ch.addAnimation("character",characterimg);
  ch.addAnimation("char",charactercollide);
  ch.setCollider("rectangle",0,0,200,ch.height)
 // ch.scale = 1

 ground = createSprite(200,height-50,400,20)


 fruitsGroup = new Group();
 monsterGroup = new Group();
  
}

function draw() {
  
  background(0);
 
  if(gameState ==="play"){
   if(bg.x<200){
     bg.x = width/2
   }
   if(keyWentDown("space") && ch.y >= height/2) {
    ch.velocityY = -12;
    ch.changeAnimation("char",charactercollide);
  }
  if(keyWentUp("space") && ch.y >= height/2) {
    
    ch.changeAnimation("character",characterimg);
  }
  // if(ch.y ===height-50){
  //   ch.changeAnimation("character",characterimg);
  // }
   ch.velocityY+=0.5;

   ch.collide(ground);
  spawnMonsters();
  spawnFruits();
  drawSprites();
  textSize(25);
  fill("white");
  text("Score: "+score,width-200,100);
  if(fruitsGroup.isTouching(ch)){
    score = score +5
    fruitsGroup[0].destroy();
  }
  if(monsterGroup.isTouching(ch)){
    gameState ="end"
  }
  }
  if(gameState === "end"){
    textSize(40);
    fill("white");
    strokeWeight(5);
    stroke("yellow");
    text("GAME OVER",width/2-200,height/2)
    text("Press R to restart",width/2-250,height/2+100)
    if(keyDown("R")){
      reset();
    }
  }
}

function spawnMonsters(){
  if(frameCount%200===0){
    monster = createSprite(width+50,height-150);
    monster.addAnimation("mon",monsterimg)
    monster.velocityX = -(7 + 3*score/30);
    monster.scale = 1.3
    monster.lifetime = width/(-monster.velocityX);
    monsterGroup.add(monster);
  }
}

function spawnFruits() {
  if(frameCount % 100 === 0) {
    var fruit = createSprite(width,100,10,40);
    fruit.y = random(20,height-300)
    //fruit.debug = true;
    fruit.velocityX = -(6 + 3*score/30);
    
    //generate random fruits
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: fruit.addImage(fruit1img);
              break;
      case 2: fruit.addImage(fruit2img);
              break;
      case 3: fruit.addImage(fruit3img);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the fruit           
    fruit.scale = 0.15;
    fruit.lifetime = width/(-fruit.velocityX);
    //add each fruit to the group
    fruitsGroup.add(fruit);
  }
}
function reset(){
  gameState = "play";
  score = 0;
  fruitsGroup.destroyEach();
  monsterGroup.destroyEach();
}