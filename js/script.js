

//fonction qui créer un cercle
function meteor1(x,y,r,c,id)
{
  ctx.fillStyle=c;
  ctx.beginPath();
  //ctx.arc(x, y, r, 0, Math.PI*2, true);
  var image = document.getElementById(id);
  ctx.drawImage(image, x, y);
  ctx.closePath();
  ctx.fill();
}

function meteor2(x,y,r,c,id)
{
  ctx.fillStyle=c;
  ctx.beginPath();
  var image = document.getElementById(id);
  ctx.drawImage(image, x, y);
  ctx.closePath();
  ctx.fill();
}


//fonction qui clear le canvas
function clear()
{
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
}

//déplacement et colision
function Colision(index)
{
  var atual = balls[index];  
  
  for(i=0; i<balls.length; i++){

    if(atual!==undefined && i!==index){ 

          if((atual.x+atual.dx >= balls[i].x && atual.y+atual.dy >= balls[i].y ) && (atual.x <= balls[i].x+balls[i].dx && atual.y <= balls[i].y+balls[i].dy )){

            return 2;
          }   
      }   
  }
  return 0;  
} 


//fonction qui dessine les meteorites
function draw()
{  
  var images=["source1","source2","source3","source4"];
  var indexImage=0;

  clear(); 
  for (var i = 0; i < balls.length; i++) {
    var ball = balls.shift();   
    var color = "hsl("+ball.hue+", 100%, 50%)"  ;
    ball.hue += 0.5;

    if (ball.idPack=="pack2") {
      indexImage=1;
    }else if(ball.idPack=="pack3"){
      indexImage=2;
    }else if(ball.idPack=="pack4"){
      indexImage=3;
    }

    // indexImage=Math.random() * 1;
    // if (indexImage<0.5) {
    //   indexImage=0;
    // }else{
    //   indexImage=1;
    // }

    meteor1(ball.x, ball.y, 5, color,images[indexImage]);
     
    if (ball.x + ball.dx > WIDTH || ball.x + ball.dx < 0 ){
      ball.dx = -ball.dx;
    }
    
    if (ball.y + ball.dy > HEIGHT || ball.y + ball.dy < 0){
        ball.dy = -ball.dy;
    }
  
    ball.x += ball.dx;
    ball.y += ball.dy;
   
    balls.push(ball);
  }

  window.requestAnimationFrame(draw);

}
 
//fonction qui genere les pack de météorites
function init(posX,posY,qtdBalls,idPack)
{  
  var idMeteor;

  for(var i = 0; i < qtdBalls; i++){

    idMeteor= idPack+i;

    balls.push({ x : posX,
                y : posY,
                dx : Math.random() * 1,
                dy : Math.random() * 1,
                hue : Math.random() * 360,
                idPack : idPack,
                idUnit : idMeteor
                }); 
  } 
 
  window.requestAnimationFrame(draw);
}


//BARRE QUI SE BLOQUE
function stickyBar() 
{
  if(window.pageYOffset > sticky) {
    navbar.classList.add("sticky");
    
    for(var i=0;i<listMenu.length;i++){
     listMenu[i].classList.add("fix");
    }
   
  }else{
    navbar.classList.remove("sticky");

    for(var i=0;i<listMenu.length;i++){
      listMenu[i].classList.remove("fix");
    }
    
  }
}


//récuperation de l'endroit ou on doit atterir apres le clique sur la fleche arrowDown 
function getWinHeight() 
{
  
  var winHeight;

  if( typeof( window.innerWidth ) == "number" ) {
    winHeight = window.innerHeight;
  } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
    winHeight = document.documentElement.clientHeight;
  } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
    winHeight = document.body.clientHeight;
  }
  return winHeight;
}
function scrolltoTheNav(){

  window.scrollTo(0, getWinHeight()-200);
};








// début du code

///////////////
// VARIABLES //
///////////////

var c = document.getElementById("c");
var ctx = c.getContext("2d");
var WIDTH = c.width = window.innerWidth;
var HEIGHT = c.height = window.innerHeight;

var balls = new Array();
var ctx;


var sticky; 

var arrows;
var burger;
var navBar;
var listMenu;

//création de pack d'asteroide
init(100,100,Math.random() *5,"pack1");
init(1000,800,Math.random() *5,"pack2");
init(500,600,Math.random() *5,"pack3");
init(200,500,Math.random() *5,"pack4");


//gestion pour fixé la navbar
navbar = document.querySelector(".navBar");
listMenu= document.getElementsByClassName("listMenu");
sticky = navbar.offsetTop;

document.onscroll = function() {
    stickyBar();
};



//FLECHE SUR LAQUEL ON CLIQUE POUR ATTERIR  A UN ENDROI DE LA PAGE
arrows=document.getElementsByClassName("arrows");

for(var i=0;i<arrows.length;i++){
    arrows[i].addEventListener('click', scrolltoTheNav);
}


console.log(balls);


burger=document.getElementsByClassName("burgerSlice");
navBar=document.querySelector(".navBar");

for(var i=0;i<burger.length;i++){
  
  burger[i].addEventListener('click', function(){
    navBar.classList.toggle("showFlex");
  });
}


