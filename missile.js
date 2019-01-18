window.onload = initAll;
var canvas;
var ctx;
var interval;
var yellow=false;
var x2;
var y2;
var x1;
var y1;
var xc;
var yc;
var int;
var ts=0;
var ts1=0;
var counter=0;
var yellow3=false;
var enter=false;
var radius=4;
var level=1;
var snowSpeed = 0.8;
var number;
var makesnow=true;
var xp=0;
var yp=0;
var win=false;
var width=[];
var height=[];
var snowY=[];
var snowX=[];
var hits=0;
var snow=false;
var rain=false;
var constant=0.8;
var circleX = [];
var circleY=[];
var cr = [];
var s=[];
var newClick =false;
var score=0;
var circleSpeed = 1;
var missileY = [];
var missileX = [];
var missileInterval = 80;
var missileLimit=6;
var missileStatus=[];
var missileSpeed=[];
var building = [];
var w = [];
var ts2=0;
var highscore;
highscore=localStorage.getItem('hscore');
if(highscore==null)
    highscore=0;

for(var c = 0; c<40; c++)
{
    building[c]=[];
    for(var r=0; r<10; r++)
        building[c][r] = {x:0, y:0, status:1};
}
for(var c = 0; c<10; c++)
{
    w[c]=[];
    for(var r=0; r<2; r++)
        w[c][r] = {x:0, y:0, status:1};
}
function initAll()
{
   canvas = document.getElementById("myCanvas");
   ctx = canvas.getContext("2d");
   document.addEventListener("mouseup", mouseUpHandler,false);
   document.addEventListener("mousemove",mouseMoveHandler,false);
   number=Math.floor(Math.random()*4+1);
   if(number==1)
        snow=true;
    else if(number==2)
        {    
            rain=true;
            snowSpeed=6;
        }
   for(var c = 0; c<40; c++)
    {
        for(var r=0; r<10; r++)
        {
            building[c][r].x = c*10;
            building[c][r].y = r*10;
            building[c][r].y+=350;
            building[c][r].x+=100
        }
    }
    for(var c = 0; c<10; c++)
    {
        for(var r=0; r<2; r++)
        {
            w[c][r].x = c*30;
            w[c][r].y = r*30;
            w[c][r].y+=380;
            w[c][r].x+=150;
        }
    }
   interval = setInterval(setTitle, 20);
   int = setInterval(time,100);
   setTitle();
}
function makeStart()
{
    ctx.beginPath();
    if(yellow==true)
       ctx.fillStyle="rgb(0,250,250)";
   else if(yellow==false)
       ctx.fillStyle="rgb(255,255,255)";
  
   ctx.rect(225,360,150,50);
   ctx.fill();
   ctx.closePath();
}
function setTitle()
{
   ctx.beginPath();
   ctx.clearRect(0,0,canvas.width,canvas.height);
   drawMoon();
   drawBack();
   if(number==1 || number==2)
        drawWeather();
   drawBuilding();
   drawWindows();
   makeTree();
   ctx.font = "100px Impact";
   ctx.fillStyle = "#ffffff";
   ctx.fillText("Planet",174,140);
   ctx.fillText("Protector",120,230);
   ctx.font = "20px Comic Sans MS";
   ctx.fillText("Adam Janicki", 235, 278)
   makeStart();
   ctx.closePath();
   ctx.fillStyle = "#000000";
  ctx.font = "58px Impact";
  ctx.fillText("Start", 242, 408);
    ts1=0;
  if(enter==true)
  {
    for(var i = 0; i<circleX.length; i++)
    {
        circleX.pop();
        circleY.pop();
        cr.pop();
        s.pop();
        i--;
    }
      ctx.clearRect(0,0,canvas.width,canvas.height);
      clearInterval(interval);
      ts=0;
      ts1=0;
      ts2=0;
      int = setInterval(time,100);
      time();
      interval = setInterval(play,20);
      play();
  }
}
function time()
{
    ts++;
    ts1++;
    ts2++;
}
function drawTarget()
{
    ctx.beginPath();
    ctx.fillStyle = "#ff0000";
    ctx.arc(xp,yp,radius,0,2*Math.PI,false);
    ctx.fill();
}
function drawImpact()
{
    var r = Math.floor(Math.random()*150)+105;
    var g = Math.floor(Math.random()*150);
    var b = Math.floor(Math.random()*40);
    ctx.fillStyle = "rgb("+r+","+g+","+b+")";
    if(newClick==true)
    {
        newClick=false;
        circleX.push(xc);
        circleY.push(yc);
        cr.push(4);
        s.push(1);
    }
    if(circleX.length>0)
    {
    for(var i = 0; i<circleX.length; i++)
    {
        if(cr[i]>32)
        {
            s[i]=0;
            circleX[i]=700;
            circleY[i]=600;
        }
        if(s[i]==1)
        {
            ctx.beginPath();
            var rad = cr[i]/2;
            ctx.arc(circleX[i], circleY[i], cr[i],0,2*Math.PI,false);
            cr[i]+=0.5;
            ctx.fill();
            ctx.closePath();
        }
    }
}   
    ctx.closePath();
}
function drawMoon()
{
    ctx.beginPath();
    ctx.fillStyle="rgb(250,245,247)";
    ctx.arc(50,50,40,0,2*Math.PI,false);
    ctx.fill();
    ctx.closePath();
}
function drawBack()
{
    ctx.beginPath();
    ctx.fillStyle="rgb(15,250,10)";
    ctx.rect(0,canvas.height-50,canvas.width,50);
    ctx.fill();
    ctx.closePath();
}
function play()
{
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawMoon();
    drawBack();
    if(number==1 || number==2)
        drawWeather();
    drawBuilding();
    drawWindows();
    makeTree();
    print();
    drawTarget();
    drawImpact();
    drawMissile();
    collisionDetection();
    if(hits>=4)
        {
            if(highscore==null)
            {
                localStorage.setItem('hscore',score);
            }
            else if(score>highscore)
            {
                localStorage.setItem('hscore',score);
            }     
            win=true;
            clearInterval(interval);
            interval=setInterval(setWin,20);
            setWin();
        }
    if(missileX.length==missileLimit)
        resetLevel();
    
}
function collisionDetection()
{
    for(var i =0; i<missileX.length; i++)
    {
        if(missileStatus[i]==1)
        {
            var realx = missileX[i];
            var realy = missileY[i]+4;
            for(var k =0; k<circleX.length; k++)
            {
                if(s[k]==1)
                {
                    if(realx+10>=circleX[k] && realx<=circleX[k]+cr[k] && realy+28>=circleY[k] && realy<=circleY[k]+cr[k])
                    {
                        score+=50;
                        missileStatus[i]=0;
                    }
                }
            }
            if(realy+26>=canvas.height-150 && realy+26<=canvas.height-50)
            {
                missileStatus[i]=0;
                hits++;
                blowUp();
            }
        }
    }
}
function drawMissile()
{
    ctx.beginPath();
    for(var i = 0; i<missileY.length; i++)
    {
        if(missileStatus[i]==1)
        {
            makeGrey(missileX[i],missileY[i]);
            makeBlack(missileX[i],missileY[i]);
            makeRed(missileX[i],missileY[i]);
            makeOrange(missileX[i],missileY[i]);
            missileY[i]+=missileSpeed[i];
        }
    }
    if(ts>missileInterval && missileY.length<missileLimit)
    {
        missileX.push(Math.random()*450+75);
        missileY.push(-30);
        missileStatus.push(1);
        missileSpeed.push(Math.random()*2+constant);
        ts=0;
    }
}
function print()
{
    ctx.beginPath();
   ctx.fillStyle = "#ffffff";
   ctx.font = "20px Impact";
   ctx.fillText(""+score, 530, 25);
   ctx.fillText("Level "+level, 330, 25);
   if(highscore!=null)
        ctx.fillText("HI "+highscore, 430, 25);
    else{
        highscore=0;
        ctx.fillText("HI "+highscore, 430, 25);
    }
}
function drawBuilding(){
    ctx.beginPath();
    ctx.fillStyle = "#000000";
    for(var c = 0; c<40; c++)
    {
        for(var r = 0; r<10; r++)
        {
            if(building[c][r].status==1)
                ctx.rect(building[c][r].x,building[c][r].y,10,10);
        }
    }
    ctx.fill();
}
function drawWindows()
{
    ctx.beginPath();
    ctx.fillStyle = "#dbff4d";
    for(var c = 0; c<10; c++)
    {
        for(var r = 0; r<2; r++)
        {
            if(w[c][r].status==1)
                ctx.rect(w[c][r].x,w[c][r].y,20,20);
        }
    }
    ctx.fill();
}
function blowUp(){
    ctx.beginPath();
    for(var c=0; c<40; c++)
    {
        for(var r=0; r<4; r++)
        {
            var rand = Math.floor(Math.random()*5+1)
            if(building[c][r].status==1&&rand==1)
                    building[c][r].status=0;
        }
    }
    for(var c=0; c<10;c++)
    {
        for(var r=0; r<1; r++)
        {
            var rand = Math.floor(Math.random()*5+1)
            if(w[c][r].status==1&&rand==1)
                    w[c][r].status=0;
        }
    }
}
function drawWeather()
{
  ctx.beginPath();
  if(ts2>=4 && makesnow==true)
  {
      ts2=0;
      width.push(Math.floor(Math.random()*5+2));
      height.push(Math.floor(Math.random()*5+2));
      snowX.push(Math.floor(Math.random()*(canvas.width-7)));
      snowY.push(0);
  }
  for(var i = 0; i<height.length; i++)
  {
      if(snowY[i]>canvas.height-50)
      {
          snowY[i]=0;
          makesnow = false;
      }
      ctx.rect(snowX[i],snowY[i], width[i],height[i]);
      if(snow==true)
            ctx.fillStyle = "#ffffff";
    else if(rain==true)
        ctx.fillStyle="#0000ff";
      ctx.fill();
      snowY[i]+=snowSpeed;
  }
}
function resetLevel()
{
    for(var i = 0; i<circleX.length; i++)
    {
        circleX.pop();
        circleY.pop();
        cr.pop();
        s.pop();
        i--;
    }
    for(var i = 0; i<missileX.length; i++)
    {
        missileX.pop();
        missileY.pop();
        missileStatus.pop();
        missileSpeed.pop();
        i--;
    }
    missileLimit+=2;
    missileInterval-=6;
    constant+=0.7;
    level++;
    score+=125;
}
function makeGrey(x,y)
{
    ctx.beginPath();
    ctx.fillStyle = "#A9A9A9";
    ctx.rect(x+2,y+6,6,16);
    ctx.fill();
}
function makeBlack(x,y)
{
    ctx.beginPath();
    ctx.fillStyle = "#000000";
    ctx.rect(x,y+6,2,20);
    ctx.rect(x+8,y+6,2,20);
    ctx.rect(x+2,y+22,6,2);
    ctx.rect(x+2,y+26,2,2);
    ctx.rect(x+6,y+26,2,2);
    ctx.rect(x+4,y+28,2,2);
    ctx.rect(x+2,y+4,6,2);
    ctx.rect(x-6,y+8,6,2);
    ctx.rect(x+10,y+8,6,2);
    ctx.rect(x-4,y+10,2,2);
    ctx.rect(x-2,y+12,2,2);
    ctx.rect(x+12,y+10,2,2);
    ctx.rect(x+10,y+12,2,2);
    ctx.fill();
}
function makeRed(x,y)
{
    ctx.beginPath();
    ctx.fillStyle = "#ff3D00";
    ctx.rect(x+2,y+24,6,2);
    ctx.rect(x+4,y+26,2,2);
    ctx.fill();
}
function makeOrange(x,y)
{
    ctx.beginPath();
    ctx.fillStyle = "#ff6D00";
    ctx.rect(x+4,y+2,2,2);
    ctx.fill();
}
function makeTree()
{
    makeTrunk();
    makeLeaves();
}
function makeTrunk()
{
    ctx.beginPath();
    ctx.fillStyle = "#654321";
    ctx.rect(40,390,20,60);
    ctx.rect(540,390,20,60);
    ctx.fill();
}
function makeLeaves()
{
    ctx.beginPath();
    ctx.fillStyle = "#458B00";
    ctx.arc(50,365,30,0,2*Math.PI,false);
    ctx.arc(550,365,30,0,2*Math.PI,false);
    ctx.fill();
}
function mouseMoveHandler(e)
{
    x1 = e.clientX-canvas.offsetLeft;
    y1 = e.clientY-canvas.offsetTop;
    xp=x1+(radius/2);
    yp=y1+(radius/2);
    if(x1>=225 && x1<=375 && y1>=360 && y1<=410)
    {
        yellow=true;
    }
    if((x1<=225 || x1>=375) || (y1<=360 || y1>=410) && yellow == true)
   {
       yellow=false;
   }
   if(x1>=255 && x1<=355 && y1>=460 && y1<485 && win==true)
 {
     yellow3 = true;
 }
 if((x1<=255 || x1>=355 || y1<=460 || y1>485) && win==true)
 {
     yellow3 = false;
 }
}
function mouseUpHandler(e)
{
    x2 = e.clientX-canvas.offsetLeft;
   y2=e.clientY-canvas.offsetTop;
   if(ts1>=10)
    {
        newClick=true;
        xc=x2;
        yc=y2;
    }
   if(x2>=225 && x2<=375 && y2>=360 && y2<=410)
      enter=true;
    if(x2>=255 && x2<=355 && y2>=460 && y2<485 && win==true)
      {
          document.location.reload();
      }
}
function setWin()
{
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawMoon();
    drawBack();
    if(number==1 || number ==2)
        drawWeather();
    drawBuilding();
    drawWindows();
    makeTree();
    print();
    ctx.font = "100px Impact";
    ctx.fillStyle = "rgb(255,255,255)";
    ctx.fillText("Game Over",90,200);
    ctx.font = "50px Impact";
    ctx.fillText("Score: "+score,210,280);
    ctx.fillText("High: "+highscore,210,340);
    ctx.font = "20px Courier New";
    if(yellow3==true)
         ctx.fillStyle = "#dbff4d";
     else if(yellow3==false)
         ctx.fillStyle = "#ffffff";
    ctx.rect(255,460, 100,25);
    ctx.fill();
    ctx.fillStyle = "#000000";
    ctx.fillText("Restart",260,480);
    ctx.closePath();
}
