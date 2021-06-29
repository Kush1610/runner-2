const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var Start=1
var Play=0
var End=2
var GameState=Start 
var life=3;
var score2=0;
var index = 0;
var ener=100;
var player


function preload(){
  bgimg=loadImage("bg2.png");
  bg2img=loadImage("bg.jpg");
  bg3img=loadImage("b.jpg");
  enrimg=loadImage("enr6.png");

  eneimg=loadAnimation("enr.png");
  ene2img=loadAnimation("enr2.png");
  ene3img=loadAnimation("enr3.png");
  ene4img=loadAnimation("enr4.png");

  stoneImg=loadImage("stone.png");
  pitImg=loadImage("hole.png");
  log1Img=loadImage("log1.png");
  log2Img=loadImage("log2.png");
  boy2Img=loadAnimation("boy/e-3.png");
  boyImg=loadAnimation("boy/e-0.png","boy/e-1.png","boy/e-2.png","boy/e-3.png","boy/e-4.png","boy/e-5.png","boy/e-6.png","boy/e-7.png");
  gorImg=loadAnimation("gorilla/p-0.png","gorilla/p-1.png","gorilla/p-2.png","gorilla/p-3.png","gorilla/p-4.png","gorilla/p-5.png","gorilla/p-6.png","gorilla/p-7.png");
  gor2Img=loadAnimation("gorilla/p-0.png")

  playimg=loadImage("play.png");
  howimg=loadImage("how2.png");
  oopsimg=loadAnimation("g.png");
  oops2img=loadAnimation("Untitled.png");
  insimg=loadImage("ins.png");

  resimg=loadImage("Restart.png");
  mainimg=loadImage("main.png")
  crossimg=loadImage("cross.png");
}

function setup() {
  createCanvas(1400,770);

  
  ground1=createSprite(700, 385,20,20);
  ground1.addImage(bgimg);
  ground1.scale=1;
  ground2=createSprite(2090, 385,20,20);
  ground2.addImage(bgimg);
  ground2.scale=1;

  ground1.visible=false
  ground2.visible=false

 boy=createSprite(470, 580,20,20);
 boy.addAnimation("boy",boyImg);
 boy.addAnimation("jump",boy2Img);
 boy.scale=1;
 //boy.debug=true
 boy.setCollider("rectangle",0,0,140,150);
 boy.visible=false
 boy1 = [boy];

 gor=createSprite(100, 530,20,20);
 gor.addAnimation("run",gorImg);
 gor.addAnimation("jump",gor2Img);
 gor.scale=1;
 gor.visible=false

 ene=createSprite(590, 60,20,20);
 ene.addAnimation("full",eneimg);
 ene.addAnimation("70%",ene2img);
 ene.addAnimation("50%",ene3img);
 ene.addAnimation("20%",ene4img);
 ene.scale=0.4;
 ene.visible=false
  
 playb=createSprite(450, 455,20,20);
 playb.addImage(playimg);
 playb.scale=0.4;

 how=createSprite(450, 545,20,20);
 how.addImage(howimg);
 how.scale=0.8; 

 oops=createSprite(700, 380,20,20);
 oops.addAnimation("fall",oops2img);
 oops.addAnimation("gor",oopsimg);
 oops.scale=0.15; 
oops.visible=false

 ins=createSprite(700, 385,20,20);
 ins.addImage(insimg);
 ins.scale=1.4; 
 ins.visible=false

 cross=createSprite(260, 115,20,20);
 cross.addImage(crossimg);
 cross.scale=0.15; 
 cross.visible=false

 res=createSprite(540, 705,20,20);
 res.addImage(resimg);
 res.scale=0.3;

 main=createSprite(840, 705,20,20);
 main.addImage(mainimg);
 main.scale=0.3;

 pitGroup=new Group();
 logGroup=new Group();
 stoneGroup=new Group();
 enerGroup=new Group();
 invisibleGroup=new Group();
  engine = Engine.create();
  world = engine.world;
  Engine.run(engine);

 // wall1 = new Wall(970,193,30,40);

}
function draw() {
  if(GameState===Start){
    background(bg2img);
    drawSprites()
    ground1.visible=false
    ground2.visible=false
    boy.visible=false
    ene.visible=false
    res.visible=false
    main.visible=false
    gor.visible=false
    how.visible=true;
    playb.visible=true
    if(mousePressedOver(playb))
    {
      GameState=Play
      frameCount=1
      ground1.x=700
      ground1.y=385

      ground2.x=2090
      ground2.y=385
      boy.x=470
      boy.y=580
      gor.x=100
      gor.y=530
    }
    if(mousePressedOver(how))
    {
      ins.visible=true
      cross.visible=true
    }

    if(mousePressedOver(cross))
    {
      ins.visible=false
      cross.visible=false
    }

  }
console.log(score2)

  if(GameState===Play){
    background(bgimg);
    playb.visible=false
    ground1.visible=true
    ground2.visible=true
    boy.visible=true
    ene.visible=true
    gor.visible=true
    ins.visible=false
    cross.visible=false
    how.visible=false
        res.visible=false
    main.visible=false
     ground1.velocityX=-8;
     ground2.velocityX=-8;



     /*if(ground1.x<=-700)
      {
        ground1.x=2085
      }
      if(ground2.x<=-700)
      {
        ground2.x=2090
      }*/
      if (ground1.x < camera.position.x-1400)
      { ground1.x = camera.position.x+ground1.width-50; } 

      if (ground2.x < camera.position.x-1400)
      { ground2.x = camera.position.x+ground2.width-50; } 

      console.log(ground1.x)
      console.log(ground2.x)
    drawSprites()
    if(frameCount % 400 === 0) 
    {
      ener=70;
      ene.changeAnimation("70%", ene2img)
    }

    if(frameCount % 450 === 0) 
    {
      ener=50;
      ene.changeAnimation("50%", ene3img)
    }

    if(frameCount % 500 === 0) 
    {
      ener=20;
      ene.changeAnimation("20%", ene4img)
    }


    if(frameCount % 500 === 0) 
  {
    pit= createSprite(1700, 650,20,50);
    pit.addImage(pitImg);
    pit.scale = 0.5;
    pit.velocityX=-8;
    pit.lifetime=300;
    //pit.debug=true
    pitGroup.add(pit);
    pit.setCollider("rectangle",0,0,440,150);

    enr= createSprite(1100, 400,20,50);
    enr.addImage(enrimg);
    enr.scale = 0.2;
    enr.velocityX=-8;
    enr.lifetime=300;
    //enr.debug=true
    enerGroup.add(enr);
    //pit.setCollider("rectangle",0,0,440,200);

    invisible= createSprite(1880, 650,100,70);
    invisible.velocityX=-8;
    invisible.visible=false
    invisibleGroup.add(invisible);
  }

  if((invisibleGroup.isTouching(boy)))
  {
    ener=0;
    GameState=End
  }

  if(frameCount % 1870 === 0) 
  {
    stone= createSprite(1700, 630,20,50);
    stone.addImage(stoneImg);
    stone.scale = 0.5;
    stone.velocityX=-8;
    stone.lifetime=300;
    //stone.debug=true
    stoneGroup.add(stone);
    stone.setCollider("rectangle",0,0,370,200);
  }

  
  if (frameCount % 2750 === 0){
    var obstacle = createSprite(1400,655,10,40);
    obstacle.addImage(log1Img);
    obstacle.scale=0.4
    obstacle.velocityX = -8
    stoneGroup.add(obstacle)
     //generate random obstacles
     var rand = Math.round(random(1,6));
     switch(rand) {
       case 1: obstacle.addImage(log2Img);
               break;
       case 2: obstacle.addImage(log1Img);
               break;
       default: break;
     
}
  }


  boy.velocityY = boy.velocityY + 0.6
if(boy.y>580)
{
  boy.velocityY=0
  boy.changeAnimation("boy", boyImg)
}

gor.velocityY = gor.velocityY + 0.6

if(gor.y>530)
{
  gor.velocityY=0
  gor.changeAnimation("run", gorImg);
}

if((pitGroup.isTouching(gor))||(stoneGroup.isTouching(gor))||(logGroup.isTouching(gor)))
{
  gor.velocityY=-17;
  gor.changeAnimation("jump", gor2Img)

}

if((pitGroup.isTouching(boy)))
{
GameState=End
score2=1

}

if((stoneGroup.isTouching(boy))||(logGroup.isTouching(boy)))
{
GameState=End
score2=2

}



if(enerGroup.isTouching(boy))
{
ener=100
ene.changeAnimation("full", eneimg)
enerGroup.destroyEach();
invisibleGroup.destroyEach()
}

textSize(77)
fill("white");
textFont("freestyle script");
text("Your energy:"+ener+"%",50,80)
  }

  if(GameState===End)
  {
   drawSprites();
   objvisible()

  }

  if((GameState===End)&&(ener===0)){
    background(bg3img)
    drawSprites()
    oops.visible=true
    res.visible=true
    oops.scale=1.3; 
    main.visible=true
    oops.changeAnimation("gor", oopsimg)
    objvisible()
    textSize(37) 
    textFont("Algerian")
    fill("red")
    text("You were caught due to lack of energy",300,90)
  }

  if((score2===1)&&(GameState===End))
{        
  background(bg3img)
  drawSprites()
  oops.visible=true
  oops.scale=1.2; 
  res.visible=true
  main.visible=true
  oops.changeAnimation("fall", oops2img)
  objvisible() 
  console.log(GameState)
}




if((score2===2)&&(GameState===End))
{    
  background(bg3img)
  drawSprites()
  oops.visible=true
  oops.scale=1.3; 
  res.visible=true
  main.visible=true
  oops.changeAnimation("gor", oopsimg)
  objvisible() 
}



if((mousePressedOver(res))&&(GameState===End))
{
  GameState=Play
  restart()
  gor.x=100
  gor.y=530
}

if((mousePressedOver(main))&&(GameState===End))
{
  GameState=Start
  restart()
}
}

function keyPressed() {
 
  if((keyCode === 32)&&(boy.y>=580)&&GameState===Play) 
  {
    boy.velocityY=-17;

  }

} 
     
function objvisible() 
{ 
  playb.visible=false
  ground1.visible=false
  ground2.visible=false
  boy.visible=false
  ene.visible=false
  gor.visible=false
  ins.visible=false
  cross.visible=false
  how.visible=false
  enerGroup.destroyEach()
  stoneGroup.destroyEach()
  pitGroup.destroyEach()
  logGroup.destroyEach()
  invisibleGroup.destroyEach()
}

function restart() 
{
  ground1.x=700
  ground1.y=385

  ground2.x=2090
  ground2.y=385

  oops.visible=false
  res.visible=false
  main.visible=false
  frameCount=1
  ene.changeAnimation("full", eneimg)
  ener=100
  boy.x=470
  boy.y=580
}