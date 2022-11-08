var pigeon, window, jungle, star, cloud, heart;
var pigeonImg, windowImg, jungleImg, starImg, cloudImg, heartImg;
var score = 0;
//Group
var cloudGroup, windowGroup, heartGroup;
//gamestates
var PLAY = 1;
var END = 2;
var gameState = 1;

function preload() {
  //load images
  pigeonImg = loadImage("pigeon pigi.png");
  windowImg = loadImage("window.webp");
  jungleImg = loadImage("jungle.jpg");
  starImg = loadImage("star.png");
  cloudImg = loadImage("cloud.png");
  heartImg = loadImage("heart.png");
}

function setup() {
  //canvas
  createCanvas(windowWidth, windowHeight);

  //sprites

  jungle = createSprite(200, 180, 400, 20);
  jungle.addImage(jungleImg);
  //jungle.velocityX=-4;
  jungle.scale = 2.5;
  jungle.x = jungle.width / 2;

  pigeon = createSprite(50, 50, 10, 10);
  pigeon.addImage(pigeonImg);
  pigeon.scale = 0.4;

  //Groups
  windowGroup = new Group();
  cloudGroup = new Group();
  heartGroup = new Group();
}

function draw() {
  if (gameState === PLAY) {
    //edge
    edges = createEdgeSprites();
    pigeon.collide(edges);
    jungle.velocityX = -4;
    //reset background
    if (jungle.x < 300) {
      jungle.x = jungle.width / 2;
    }
    text("Score: " + score, 500, 50);
    if (keyDown("space") && pigeon.y >= -150) {
      pigeon.velocityY = -12;
    }
    pigeon.velocityY = pigeon.velocityY + 0.8;

    //pigeon.debug=true
    createWindows();
    createHearts();
    createClouds();

    /*
    using overlap will work as it provides the advantage to
    have a callnback function whihc captures a single sprite
    from a group. callback function - heartvanish
    */
    heartGroup.overlap(pigeon, heartvanish);

    if (windowGroup.isTouching(pigeon)) {
      gameState = END;

      /* these lines should come in when u r restarting the game,
      and also reset ur score count
      heartGroup.destroyEach;
      cloudGroup.destroyEach;
      windowGroup.destroyEach;
      */
      /*
     create an if condition for gameState === END and write these lines in it
      heartGroup.setVelocityXEach(0);
      cloudGroup.setVelocityXEach(0);
      windowGroup.setVelocityXEach(0);
      

      textSize(400);
      fill("Skyblue");
      text("Game Over! Score is " + score, 300, height - 300);
      */
    }
  }
  drawSprites();
  //   textSize(20);
  //   fill(255);
}

//created this callback function to vanish one heart from the group
function heartvanish(h) {
  h.destroy();
  score = score + 100;
}

function createWindows() {
  if (frameCount % 200 === 0) {
    var window = createSprite(width, height - 400, 40, 10);
    window.y = Math.round(random(height - 500, height - 300));
    window.addImage(windowImg);
    window.scale = 0.3;
    window.velocityX = -3;

    //assign lifetime to the variable
    window.lifetime = 700;

    //adjust the depth
    window.depth = pigeon.depth;
    pigeon.depth = pigeon.depth + 1;

    //add each cloud to the group
    windowGroup.add(window);
  }
}

function createHearts() {
  if (frameCount % 80 === 0) {
    var heart = createSprite(width, height - 400, 40, 10);
    heart.y = Math.round(random(height - 100, height - 400));
    heart.addImage(heartImg);
    heart.scale = 0.3;
    heart.velocityX = -3;

    //assign lifetime to the variable
    heart.lifetime = 700;

    //adjust the depth
    heart.depth = pigeon.depth;
    pigeon.depth = pigeon.depth + 1;

    //add each cloud to the group
    heartGroup.add(heart);
  }
}
function createClouds() {
  //write code here to spawn the clouds
  if (frameCount % 200 === 0) {
    var cloud = createSprite(width, 120, 40, 10);
    cloud.y = Math.round(random(80, 120));
    cloud.addImage(cloudImg);
    cloud.scale = 0.4;
    cloud.velocityX = -3;

    //assign lifetime to the variable
    cloud.lifetime = 700;

    //adjust the depth
    cloud.depth = pigeon.depth;
    pigeon.depth = pigeon.depth + 1;

    //add each cloud to the group
    cloudGroup.add(cloud);
  }
}
