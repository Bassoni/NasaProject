/* Gestion Météors*/

//fonction qui créer un météorites
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


/*Gestion du menu qui se place en fixed*/
 
//BARRE QUI SE BLOQUE
function stickyBar() 
{
  if(window.pageYOffset > sticky) {
    navbar.classList.add("sticky"); 
    //ajout de la class CSS sticky sur l'element NavBar( le parent du menu ) afin de le mettre en position fixed des que le menu se retrouve au top de la fenetre
    
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

/*Gestion de scroller a une certaine hauteur au moment du clique sur les fleches indicatrices*/

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


/* Gestion de la map Google */

// Gestion fonction de Callback 

var callBackmeteor = function(data)
{
    var paris = {lat: 49.0317, lng: 2.062794};
    var map = new google.maps.Map(document.getElementById('map'), {zoom: 5, center: paris});
    
    var result="";

    // var meteor =document.querySelector("#source3");
    var meteor = {
        path: "M 243.2,179.2 v -76.8 c 0-7.1,5.7-12.8,12.8-12.8 c 7.1,0,12.8,5.7,12.8,12.8 c 0,0,0,0,0,0 v 76.8 c 0,7.1-5.7,12.8-12.8,12.8 C 248.9,192,243.2,186.3,243.2,179.2 L 243.2,179.2 z M 256,51.2 c 7.1,0,12.8-5.7,12.8-12.8V12.8 C 268.8,5.8,263.1,0,256,0 c -7.1,0-12.8,5.7-12.8,12.8 v 25.6 C 243.2,45.5,248.9,51.2,256,51.2 L 256,51.2 z M332.8,230.4 c 7.1,0,12.8-5.7,12.8-12.8v-44.8 c 0-7.1-5.7-12.8-12.8-12.8 c -7.1,0-12.8,5.7-12.8,12.8l0,0 v 44.8 C 320,224.7,325.7,230.4,332.8,230.4 C 332.8,230.4,332.8,230.4,332.8,230.4 z M 332.8,115.2 c 7.1,0,12.8-5.7,12.8-12.8v-64 c 0-7.1-5.7-12.8-12.8-12.8 c -7.1,0-12.8,5.7-12.8,12.8l0,0 v 64 C 320,109.5,325.7,115.2,332.8,115.2 C 332.8,115.2,332.8,115.2,332.8,115.2 z M 179.2,230.4 c 7.1,0,12.8-5.7,12.8-12.8l0,0V76.8c0-7.1-5.7-12.8-12.8-12.8s-12.8,5.7-12.8,12.8v140.8C166.4,224.7,172.1,230.4,179.2,230.4 L 179.2,230.4 z M 409.6,243.2 c -7.1,0-12.8,5.7-12.8,12.8 v 89.6 c -0.2,45.1-21.8,87.4-58.3,113.9 c -36.9,26.9-83.8,34-128.6,19.5 c -56.7-18.3-94.7-71.7-94.7-133 v -90 c 0-7.1-5.7-12.8-12.8 -12.8 c -7.1,0-12.8,5.7-12.8, 12.8 v 90 c 0,72.4,45.2,135.6,112.5,157.4 c 17.4,5.7,35.6,8.6,53.9,8.6 c 35.1,0.1,69.3-11.1,97.6-31.8 c 43.1-31.3,68.6-81.3,68.8-134.6 V 256 C 422.4,248.9,416.7,243.2,409.6,243.2 L 409.6,243.2 z M 153.6,345.6 c 0-56.6,45.8-102.4,102.4-102.4 S 358.4,289,358.4,345.6 c 0,56.6-45.8,102.4-102.4,102.4 c 0,0,0,0,0,0 C 199.5,448,153.6,402.2,153.6,345.6 L 153.6,345.6 z M281.6,288 c 0,10.6,8.6,19.2,19.2,19.2 c 6.4,0,12.4-3.2,15.9-8.5 c-8-10.2-18.4-18.3-30.2-23.5 C 283.3,278.8,281.6,283.3,281.6,288 L 281.6,288 z M 268.8,371.2 c 0,7.1,5.7,12.8,12.8,12.8 s 12.8-5.7,12.8-12.8 s-5.7-12.8-12.8-12.8 h 0 C 274.5,358.4,268.8,364.2,268.8,371.2 L 268.8,371.2 L 268.8,371.2 z M 230.4,403.2 c 0-10.6-8.6-19.2-19.2-19.2 c -6.4,0-12.4,3.2-15.9,8.5 c 8,10.2,18.4,18.3,30.2,23.5 C 228.7,412.5,230.4,407.9,230.4,403.2 L 230.4,403.2 z M 192,288 c 0,10.6,8.6,19.2,19.2,19.2 s 19.2-8.6,19.2-19.2 c 0-10.6-8.6-19.2-19.2-19.2 S 192,277.4,192,288 L 192,288 z M 19.2,76.8 C 8.6,76.8,0,85.4,0,96 s 8.6,19.2,19.2,19.2 s 19.2-8.6,19.2-19.2 c 0,0,0,0,0,0 C 38.4,85.4,29.8,76.8,19.2,76.8 z M 409.6,51.2 c-7.1,0-12.8,5.7-12.8,12.8 v 128 c 0,7.1,5.7,12.8,12.8,12.8 c 7.1,0,12.8-5.7,12.8-12.8 V 64 C 422.4,56.9,416.7,51.2,409.6,51.2 z M 492.8,332.8 c-10.6,0-19.2,8.6-19.2,19.2 c 0,10.6,8.6,19.2,19.2,19.2 c 10.6,0,19.2-8.6,19.2-19.2 c 0,0,0,0,0,0 C 512,341.4,503.4,332.8,492.8,332.8 z M 102.4,204.8 c 7.1,0,12.8-5.7,12.8-12.8 c 0,0,0,0,0,0 V 12.8 c 0-7.1-5.7-12.8-12.8-12.8 c-7.1,0-12.8,5.7-12.8,12.8 V 192 C 89.6,199.1,95.3,204.8,102.4,204.8 C 102.4,204.8,102.4,204.8,102.4,204.8 z",
        fillColor: "midnightblue",
        fillOpacity: 1,
        scale: 0.1,
    }

    for(let i = 0; i < data.length; i++)
    { 

        var realCoord = {lat : parseInt(data[i].geolocation.latitude), lng : parseInt(data[i].geolocation.longitude)};
        // console.log(data[i]);
        // if (data[i].geolocation != undefined) {
        //   console.log("Not undifined"+i);
        // }
         var latit =parseInt(data[i].geolocation.latitude);
         var longit =parseInt(data[i].geolocation.longitude);

        if ((latit<50.9 && latit>44.1)&&(longit<6.08 && longit>-0.5)) {
          result="France";
        }else if ((latit<43.5 && latit>37)&&(longit<2.17 && longit>-8.15)) {
          result="Span";
        }else if ((latit<36.2 && latit>-26.1)&&(longit<44.22 && longit>-11.3)) {
          result="Africa";
        }else if ((latit<31.7 && latit>20.8)&&(longit<87 && longit>71)) {
          result="India";
        }else if ((latit<54 && latit>16)&&(longit<-67.6 && longit>-117)) {
          result="USA";
        }else{
           result="other Country";
        }
        

        var marker = new google.maps.Marker(
            {
                position: realCoord,
                map: map,
                animation: google.maps.Animation.DROP,
                icon: meteor ,
                name: data[i].name,
                idCountry : result               

            });
        console.log(data[i]);
        //le remplissage des tableaux par pays
        if (marker.idCountry=="France") {
          resultFrance.push(data[i]);

        }else if (marker.idCountry=="Spain") {
          resultSpain.push(data[i]);

        }else if (marker.idCountry=="Africa") {
          resultAfrica.push(data[i]) ;

        }else if (marker.idCountry=="India") {
          resultIndia.push(data[i]);

        }else if (marker.idCountry=="USA") {
          resultUSA.push(data[i]) ;

        }else if (marker.idCountry=="other Country") {
          resultOther.push(data[i]) ;
        }



        var infowindow = new google.maps.InfoWindow();
        var detail = data[i].name;

        google.maps.event.addListener(marker, 'click', function() {
            infowindow.setContent('<div style="color:black"><strong>Name -> '+ data[i].name +'</strong></div>'  + '<div><img src='+img+" width='50px' height=' 34px' >"+'<div style="color:black"><strong>Lat,long -> '+ data[i].geolocation.latitude+' '+data[i].geolocation.longitude +'</strong></div>'+ '<div style="color:black"><p>Composition: '+ data[i].recclass+"</></div>"+'<p style="color:black">Pounds of meteorites: '+ data[i].mass+ ' (g)</p></div>' +'<p style="color:black">fell year: '+ data[i].year[0]+ data[i].year[1]+ data[i].year[2]+ data[i].year[3]);
            infowindow.open(map,this);
        });

    }
}

//fonction pour initialiser la Googlemap
function initMap()
{
    var paris = {lat: 43.528418, lng: 5.4549721};

    var map = new google.maps.Map(
        document.getElementById('map'), {zoom: 13, center: paris});

    var marker = new google.maps.Marker({position: paris, map: map});
}


// FONCTION PERMETTANT DE RECUPERER LES DONNEES JSON DE L'API //
function ButtonClickGET() {
    var url = "https://data.nasa.gov/resource/gh4g-9sfh.json"

    $.getJSON(url, callBackmeteor);
};

 
/*  Gestion du Tableau */

//Selectionne la colonne et parcours ses cellules
function getCelluleColonne(oEvent){ 
  var sMg = "", 
      oTd = oEvent.currentTarget,
      iPosTd = oTd.cellIndex, 
      aoTd = oTd.parentNode.parentNode.querySelectorAll("tbody tr td:nth-child("+(iPosTd+1)+")"),
      iNbTds = aoTd.length ;
  for(var i = 0 ;i < iNbTds; i++){
    if(aoTd[i].innerText!=""){
      sMg += aoTd[i].innerText+"-> 20 (g)"+"\n";
    }
    
  }
  sMg += i+" :meteorites.";

  alert(sMg); 
}

//Selectionne la colonne via un click sur une des cellules
function selecteColonne(oEvent){ 
  var sClass ="selectedCellule",
      oTd = oEvent.currentTarget,
      iPosTd = oTd.cellIndex,
      //oTd.parentNode.parentNode =  tbody
      aoTd = oTd.parentNode.parentNode.querySelectorAll("tbody tr td:nth-child("+(iPosTd+1)+")"),
      iNbTd = aoTd.length; 
  for(var i = 0; i < iNbTd; i++){ 
    // voir classList.toggle
    if(aoTd[i].classList.contains(sClass)){
      aoTd[i].classList.remove(sClass);
    }else{
      aoTd[i].classList.add(sClass);
    }
  }
}

// Selectionne la colonne via une checkbox
function checkboxColonne(oEvent){
  var sClass ="selectedCheckbox", 
      oCheckbox = oEvent.currentTarget,

      iValue = oCheckbox.value,
      
      aoTd = document.querySelectorAll("tbody td:nth-child("+(Number(iValue)+1)+")"), iNbTd = aoTd.length; 
  for(var i = 0; i < iNbTd; i++){ 
    if(oCheckbox.checked == true){ 
      aoTd[i].classList.add(sClass);
    }else{
      aoTd[i].classList.remove(sClass);
    }
  }
}
// selectione la colone au moment du hover sur une case de cette colonne
function setHoverColonne(oEvent){
  var sClass ="hoverColonne",
      oTd = oEvent.currentTarget, iPosTd = oTd.cellIndex,
      aoTd = oTd.parentNode.parentNode.querySelectorAll("tbody tr td:nth-child("+(iPosTd+1)+")"),
      iNbTd = aoTd.length;   
  for(var i = 0; i < iNbTd; i++){ 
    if(aoTd[i].classList.contains(sClass)){
      aoTd[i].classList.remove(sClass);
    }else{
      aoTd[i].classList.add(sClass);
      
    }
  }
  var qty=document.querySelector("#infoArray");
      if(oEvent.currentTarget.classList.contains(sClass)){
      qty.textContent=oEvent.currentTarget.textContent+" c'est la meteorite";
      console.log(oEvent.currentTarget)

    }else{
     qty.textContent="nop";
      
    }
  
}

// assigne le type de sélection 
function setConfig(oEvent){
  var oRadio = oEvent.currentTarget,
      iValue = oRadio.value,
      bSelected = oRadio.checked; 
  if(bSelected){
    if(iValue == 1){
      //par Checkbox
      if(oConfig.bUseCheckbox==false){
        initCheckbox(true);
        initColonne(false);
      }
    }else{

      if(oConfig.bUseCheckbox==true){
        initCheckbox(false);
        initColonne(true);
      }
    }
  } 
}
// Initialise/ Supprime la selection par ligne avec checkbox
function initCheckbox(bAdd){
  var aCheckbox = document.querySelectorAll(".checkbox-select-col"),
      iNbCheckbox = aCheckbox.length;
  oConfig.bUseCheckbox = bAdd; 
  for(var i = 0; i < iNbCheckbox; i++){
    if(oConfig.bUseCheckbox == true){ 
      aCheckbox[i].addEventListener(
        'click', checkboxColonne
      );
    }else{ 
      aCheckbox[i].removeEventListener(
        'click', checkboxColonne
      );
      aCheckbox[i].checked = false;
    }
  }
}
// Initialise/ Supprime  la selection par ligne
function initColonne(bAdd){
  var aoTd = document.querySelectorAll("tbody td"), iNb = aoTd.length;
  oConfig.bUseCell = bAdd;
  for(var i = 0; i < iNb; i++){
    aoTd[i].removeAttribute("class");
    if(oConfig.bUseCell == true){  
      aoTd[i].addEventListener(
        'click', selecteColonne
      );
    }else{ 
      aoTd[i].removeEventListener(
        'click', selecteColonne
      );
    }
  }
}
  

/* Gestion du graphique */
function getTotal(){
  var myTotal = 0;
  for (var j = 0; j < myData.length; j++) {
    myTotal += (typeof myData[j] == 'number') ? myData[j] : 0;
  }
  return myTotal;
}

function plotData() {
  var canvas;
  var ctx;
  var lastend = 0;
  var myTotal = getTotal();
  var doc;
  canvas = document.getElementById("canvas");
  var x = (canvas.width)/2;
  var y = (canvas.height)/2;
  var r = 150;
  
  ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (var i = 0; i < myData.length; i++) {
    ctx.fillStyle = myColor[i];
    ctx.beginPath();
    ctx.moveTo(x,y);
    ctx.arc(x,y,r,lastend,lastend+(Math.PI*2*(myData[i]/myTotal)),false);
    ctx.lineTo(x,y);
    ctx.fill();
    
    // Now the pointers
    ctx.beginPath();
    var start = [];
    var end = [];
    var last = 0;
    var flip = 0;
    var textOffset = 0;
    var precentage = (myData[i]/myTotal)*100;
    start = getPoint(x,y,r-20,(lastend+(Math.PI*2*(myData[i]/myTotal))/2));
    end = getPoint(x,y,r+20,(lastend+(Math.PI*2*(myData[i]/myTotal))/2));
    if(start[0] <= x)
    {
      flip = -1;
      textOffset = -110;
    }
    else
    {
      flip = 1;
      textOffset = 10;
    }
    ctx.moveTo(start[0],start[1]);
    ctx.lineTo(end[0],end[1]);
    ctx.lineTo(end[0]+120*flip,end[1]);
    ctx.strokeStyle = "#bdc3c7";
    ctx.lineWidth   = 2;
    ctx.stroke();
    // The labels
    ctx.font="17px Arial";
    ctx.fillText(myLabel[i]+" "+precentage.toFixed(2)+"%",end[0]+textOffset,end[1]-4); 
    // Increment Loop
    lastend += Math.PI*2*(myData[i]/myTotal);
    
  }
}
// Find that magical point
function getPoint(c1,c2,radius,angle) {
  return [c1+Math.cos(angle)*radius,c2+Math.sin(angle)*radius];
}






///////////////
//   CODE    //
///////////////

/*declaration pour les astéroides*/
var c = document.getElementById("c");
var ctx = c.getContext("2d");
var WIDTH = c.width = window.innerWidth;
var HEIGHT = c.height = window.innerHeight;
var balls = new Array();

/*image de la météorite dans la fenetre lors d'un clique sur une météorite sur la map*/
var img=("images/debris3.png");

/* declaration variables utiles pour le dynamisme du site*/
var sticky; 
var arrows;
var burger;
var navBar;
var listMenu;

/*déclaration pour le graph*/
var resultFrance=[]; 
var resultSpain=[];
var resultAfrica=[];
var resultIndia=[];
var resultUSA=[];
var resultOther=[];

var myColor = ["#39ca74","#e54d42","#f0c330","#3999d8","#d59931","#656b76"];
var myData = [10,20,30,40,50];
var myLabel = ["France","Spain","Africa","Russia","USA","other"];




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



//gestion des fleches d'indication de scrolldown
arrows=document.getElementsByClassName("arrows");

for(var i=0;i<arrows.length;i++){
    arrows[i].addEventListener('click', scrolltoTheNav);
}

//gestion du burger au moment du click
burger=document.getElementsByClassName("burgerSlice");
navBar=document.querySelector(".navBar");

for(var i=0;i<burger.length;i++){
  
  burger[i].addEventListener('click', function(){
    navBar.classList.toggle("showFlex");
  });
}





/* Tableau */
var oConfig ={
  bUseCheckbox: false,
  bUseCell: false
};

//Ajout de lignes dans le tableau

if (true) {}


var str= "";

for(var i =0;i< 20;i++){
  str=str+'<tr class="lines">'
    +'<td>'+resultFrance[i] +'</td>'
    +'<td>'+resultSpain[i] +'</td>'
    +'<td>'+resultAfrica[i] +'</td>'
    +'<td>'+resultIndia[i] +'</td>'
    +'<td>'+resultUSA[i] +'</td>'
    +'<td>'+resultOther[i] +'</td>'
}

document.getElementById("tbody").innerHTML = str;

document.addEventListener('DOMContentLoaded',function(){
  var aoTd = document.querySelectorAll("tbody td"), iNb = aoTd.length;
  for(var i = 0; i < iNb; i++){
    aoTd[i].addEventListener(
      'click', getCelluleColonne
    );
    aoTd[i].addEventListener(
      'mouseenter', setHoverColonne
    );
    aoTd[i].addEventListener(
      'mouseleave', setHoverColonne
    );

  }//for
  initCheckbox(true);
  initColonne(false);
});

// afficher le graph
plotData();