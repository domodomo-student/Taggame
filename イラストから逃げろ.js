let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;
document.addEventListener("mousemove", mouseMoveHandler, false);//マウスの監視

let w = canvas.width;
let h = canvas.height;
let id = setInterval(draw, 10);
let time = 35;
let count = 0;
let player = new Image();
player.src = "https://2.bp.blogspot.com/-JGH_cz6Tzwo/WKbKxiP9ByI/AAAAAAABB3I/a5XZSzqRWCgWMBLRDg6xTUY2zspSHrMZACLcB/s800/pose_hashiru_guruguru_man.png";
let playerX = w / 2;
let playerY = h / 2;

let enemy1 = new Image();
let enemy2 = new Image();
let enemy3 = new Image();
enemy1.src = "https://1.bp.blogspot.com/-SWOiphrHWnI/XWS5x7MYwHI/AAAAAAABUXA/i_PRL_Atr08ayl9sZy9-x0uoY4zV2d5xwCLcBGAs/s1600/pose_dance_ukareru_man.png";
enemy2.src = "https://1.bp.blogspot.com/-Q9jOqnVqGuo/W64DqXTxwfI/AAAAAAABPIk/mn0XoaVlL2s_Sphqb-5WielV75A6JIEowCLcBGAs/s800/job_yarigai_sausyu.png";
enemy3.src = "https://2.bp.blogspot.com/-JGH_cz6Tzwo/WKbKxiP9ByI/AAAAAAABB3I/a5XZSzqRWCgWMBLRDg6xTUY2zspSHrMZACLcB/s800/pose_hashiru_guruguru_man.png";

let enemy = [enemy1, enemy2, enemy3];
let enemyX = [0, w / 2 - 50, w - 100];
let enemyY = [h /2 - 50, 0, h / 2 - 50];
alert("矢印キーまたはマウスで操作します。残り時間30秒から敵が動き出します。");

function draw(){
    ctx.fillStyle = "#FAEFD4";
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "#662E1C";
    ctx.fillRect(0, 0, w / 2 - 50, 100);
    ctx.fillRect(w / 2 + 50, 0, w / 2 - 50, 100);
    ctx.fillRect(0, 0, 100, h / 2 - 50);
    ctx.fillRect(0, h / 2 + 50, 100, h / 2 - 50);
    ctx.fillRect(w - 100, 0, 100, h / 2 - 50);
    ctx.fillRect(w - 100, h / 2 + 50, 100, h / 2 - 50);
    
    if(count % 100 == 0){
      time -= 1;
    }
    ctx.font = "30px 'MS ゴシック'";
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText("残り時間：" + time, 50, 50);
  
    ctx.drawImage(player, playerX, playerY, 100, 100);
  
    for(let i = 0; i < 3; i ++){
      ctx.drawImage(enemy[i], enemyX[i], enemyY[i], 100, 100);
  
      if(i > Math.floor((30 - time) / 10)){
        continue;
      }
  
      let tilt = (playerY - enemyY[i]) / (playerX - enemyX[i]);
      let x = Math.sqrt(1 / (1 + tilt * tilt));
      
      if(playerX > enemyX[i]){
        if(i == 0) {//一体目
          enemyX[i] += x;
          enemyY[i] += tilt * x;
        }else if(i == 1) {//2体目
          enemyX[i] += x * 5;
          enemyY[i] += tilt * x * 5;
        }else if(i == 2) {//3体目
          enemyX[i] += x * 10;
          enemyY[i] += tilt * x * 10;
        }
      }
      else{
        if(i == 0) {//一体目
          enemyX[i] -= x;
          enemyY[i] -= tilt * x;
        }else if(i == 1) {//2体目
          enemyX[i] -= x * 5;
          enemyY[i] -= tilt * x * 5;
        }else if(i == 2) {//3体目
          enemyX[i] -= x * 10;
          enemyY[i] -= tilt * x * 10;
        }
      }
      if(enemyY[i] > playerY - 75 && enemyY[i] < playerY + 75 &&
         enemyX[i] > playerX - 75 && enemyX[i] < playerX + 75){
          ctx.font = "50px 'MS ゴシック'";
          ctx.fillStyle = "#EA5549";
          ctx.fillText("Game over...", w / 2 - 150, h / 2);
          clearInterval(id);
      }
    }
  

    if(time == 0){
      ctx.font = "50px 'MS ゴシック'";
      ctx.fillStyle = "#fa781b";
      ctx.fillText("Game clear！！！", w / 2 - 150, h / 2);
      clearInterval(id);
    }
    count += 1;
}

function mouseMoveHandler(e) {//マウス操作
  playerX = e.pageX;
  playerY = e.pageY;
}

document.onkeydown = keydown;
function keydown(e){//キーボード操作
  if(e.which == 37 && playerX > 100){
    playerX -= 100;
  }
  else if(e.which == 38 && playerY > 100){
    playerY -= 100;
  }
  else if(e.which == 39 && playerX < w - 200){
    playerX += 100;
  }
  else if(e.which == 40 && playerY < h - 100){
    playerY += 100;
  }
}
