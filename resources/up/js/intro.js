$(function(){

  var mySVGsToInject = document.querySelectorAll('img.inject-me');
  SVGInjector(mySVGsToInject);
  // $('canvas#celebration').hide();
  console.log('cc')
    $('.sp_footer').click(function(){
      location.href = '../home/main.html?data=19&rate=type1&fam=y';
    });
  var swiper = new Swiper('.swiper-container', {
    direction: 'vertical',
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    autoHeight: true,
    preventIntercationOnTransition:true
  });
  swiper.on('slideChange', function (i) {
    var cupage = swiper.activeIndex,
    prevpage= swiper.previousIndex,dir;

    if(cupage > prevpage){
          dir = 'N';
    }else if(cupage < prevpage){
          dir = 'P';
    }
    goscene(cupage+1, dir);
  });


  goscene('1');




}); //END OF DEFAULT
var tl1, tl2, tl3, tl4;
function goscene(n, dirv){

  if(n=='1'){

    tl1 = new TimelineMax();
    if(dirv === 'P'){
      TweenLite.set('.scn2', {y:0});
      TweenLite.set('.objs01-1-wrapper',{x:0,y:0,opacity:1});
    }
    CustomBounce.create('myBounce', {strength: 0.6, squash: 3, squashID: 'mySquash'});
     tl1.to('.objs01-1-wrapper', 0.8, {bezier:[{x:70, y:20}, {x:27, y:60}], ease:Bounce.easeNone})
     .to('.objrock-wrapper', 0.7, {y:40, ease:Power2.easeNone}, '-=0.5')
     .to('.objbgst-wrapper', 0.8, {y:25, ease:Power2.easeNone}, '-=0.6')
     .to('.objs1-nemo-wrapper', 1.0, {y:-170, ease:'myBounce'}, '-=0.5')
     .to('.objs1-nemo-wrapper', 1.0, {scaleX: 1.3, scaleY: 0.8, attr:{rx: 20, ry: 100}, ease: 'mySquash', transformOrigin: '50% 100%'}, 0)
     .to("#OBJS1-NEMO-START-MOUTH", 0.5, {morphSVG:"#OBJS1-NEMO-END-MOUTH",transformOrigin:"50% 50%",ease:Linear.easeNone},"-=0.8");
  }
  else if(n =='2'){
    if(dirv === 'P'){
      TweenLite.set('.scn3', {y:0});
      // particles.killAll();
      // var bubbleContainer = document.getElementById("bubbleContainer");
      // TweenMax.set(bubbleContainer, {clearProps:"all"});

      if(particles !== undefined){
        particles.clear();
        $('#bubbleContainer').empty();
      }

      // TweenLite.set('.objs01-1-wrapper',{x:0,y:0,opacity:1});
    }
    tl2 = new TimelineMax(),counter = { var: 10000 },tal = document.getElementById("tal"),duration = 1;
       tl2.to('.objs1-nemo-wrapper', 1.0, {y:-500, ease:Power2.easeNone}, '-=0.5')
       .to('.objrock-wrapper', 1.0, {y:50, ease:Power2.easeNone}, '-=0.8')
       .to('.objbgst-wrapper', 0.8, {y:80, ease:Power2.easeNone}, '-=0.6')
       // .set('.objs01-1-wrapper', {ease:Power2.easeIn,opacity:0}) //우주선
       .to('.objs01-1-wrapper', 0.8, {bezier:{curviness:1.5, values:[{x:-50, y:50},{x:-100,y:0},{x:-50,y:-50}, {x:0, y:0}]}/*bezier end*/, ease:Linear.easeNone,opacity:0})
       .to('.scn2', 1.0, {y:-300, ease:Power2.easeNone}, '-=0.5')
       .to(counter, 1, {
          var: 8120,
          onUpdate: function () {
              var nwc = counter.var.numberFormat(0);
              tal.innerHTML = nwc;
          },
          ease:Circ.easeOut
        })
        .to('.sc2-nemo-face', 1.0, {y:50, ease:Bounce.easeNone}, '-=0.9')
        .to('#sunglass', duration / 8, {y:-20, ease:Bounce.easeOut})
        .to('#sunglass', duration / 2, {y:0, ease:Bounce.easeOut, delay:duration / 4})
        .to('#eyedrop', 1.0, {x:14, y:3,  opacity:1, ease:Bounce.easeOut, repeat:-1}, '-=0.5');
        function onRepeat() {
         TweenLite.set('#eyedrop', {x:-14, y:-3, opacity:0});
       }
  }
  else if(n =='3'){
    if(dirv === 'P'){
      TweenLite.set('.scn4', {y:20});
      TweenLite.to(".objs4-smk-ctrl", 0.5, {opacity:0,ease:Linear.easeNone},"-=0.8")
      // TweenLite.set('.objs01-1-wrapper',{x:0,y:0,opacity:1});
    }
      tl3 = new TimelineMax({
        onComplete: function(){
          bubble();
        }
      });
      // .set('#PAPER', {y:100, ease:Power2.easeNone}, '-=0.5')
        tl3.set('.env-paper', {y:700})
        .to('.objrock-wrapper', 1.0, {y:100, ease:Power2.easeNone}, '-=0.8')
        .to('.objbgst-wrapper', 0.8, {y:50, ease:Power2.easeNone}, '-=0.6')
        .to('.scn2', 1.0, {y:-1000, ease:Power2.easeNone},'-=0.5')
        .to('.scn3', 1.0, {y:-80, ease:Power2.easeNone}, '-=0.5')
        .to('.env-paper', 1.0, {y:0, ease:Power2.easeNone}, '-=0.5');
        // .to('#PAPER', 1.0, {y:-50, ease:Power2.easeNone}, '-=0.5');
  }
  else if(n =='4'){

        tl4 = new TimelineMax();
        tl4.to('.scn3', 1.0, {y:-500, ease:Power2.easeNone}, '-=0.5')
        .to('.objrock-wrapper', 1.0, {y:170, ease:Power2.easeNone}, '-=0.8')
         .to('.objbgst-wrapper', 1.0, {y:45, ease:Power2.easeNone}, '-=0.6')
          .to('.scn4', 1.0, {y:-210, ease:Power2.easeNone}, '-=0.5')
          .to('.sp_footer', 1.0, {y:-57, ease:Power2.easeNone}, '-=0.5')
          .to('.objs4-spcship-wrapper', tl4.duration(), {y:1, x:2, ease:RoughEase.ease.config({strength:5, points:100})}, 0)
          .to(".objs4-smk-ctrl", 0.5, {opacity:1,ease:Linear.easeNone},"-=0.8")
          .to('.objs4-spcship-wrapper', 1, {y:-40, ease:Power2.easeIn}, "go")
          .to('.objbgst-wrapper', 10.0, {y:400, ease:Power2.easeNone}, '-=0.6')
          .to('#objs4-smk-sizectrl', 5.0, {opacity:0.7, scale:1.2, ease:RoughEase.ease.config({strength:5, points:100})}, 0)
          .set('.objbgst-wrapper', {y:0})
          .to("#objs4-smk-step1", 0.5, {morphSVG:"#objs4-smk-step2",transformOrigin:"50% 50%",ease:Linear.easeNone},"-=0.8")
          .to("#objs4-smk-step2", 0.5, {morphSVG:"#objs4-smk-step3",transformOrigin:"50% 50%",ease:Linear.easeNone},"-=0.8")
          .to(".objs4-smk-ctrl", 0.5, {opacity:0,ease:Linear.easeNone},"-=0.8")
          .to('.objs4-spcship-wrapper', 30, {y:1, x:2, onRepeat:onRepeat, ease:RoughEase.ease.config({strength:5, points:100})}, 0)
          .to('.objbgst-wrapper', 30, {y:570, repeat:-1, onRepeat:onRepeat, ease:Power2.easeNone}, "-=30");
          function onRepeat() {
            TweenLite.set('.objbgst-wrapper', {y:0});
            TweenLite.to('.objs4-spcship-wrapper', 30, {y:1, x:2, onRepeat:onRepeat, ease:RoughEase.ease.config({strength:5, points:100})}, 0);
            TweenLite.to('.objbgst-wrapper', 30, {y:570, repeat:-1, onRepeat:onRepeat, ease:Power2.easeNone});
          }

  }

}
var particles;
function bubble(){
  //From 7 Hidden Gems of GSAP (Net Magazine)
//Read full article: https://medium.com/net-magazine/7-hidden-gems-of-the-greensock-animation-platform-4fb71389f6ca#.t6xniz19i
var sizes = ["small", "medium", "large"],
    bubbleContainer = document.getElementById("bubbleContainer"),
    // slowBtn = document.getElementById("slow"),
    // normalBtn = document.getElementById("normal"),
    // fastBtn = document.getElementById("fast"),
    startY = 250,
    endY = -50;


//build the timeline

particles = new TimelineMax();

for (var i = 0; i < 50; i++) {
  var sizeIndex = randomNumber(0,2); //get random number between 0 and 2
  var size = sizes[sizeIndex]; //get random size
  var speed = (3 - sizeIndex) //larger faster
  var bubble = $('<div class="bubble ' + size + 'Bubble"/>').appendTo(bubbleContainer); //create a bubble
  var angle = Math.random() * Math.PI * 2;
  var gravity = 1;
  particles.set(bubble, {y:startY, x:300}, 0) // place it at the bottom

  //create an animation at a random start time
  particles.to(bubble, 3.0, {y:endY, x:randomNumber(0, 600), repeatDelay:Math.random()*2, repeat:500,
    rotationZ:Math.random() * 360, rotationY:Math.random() * 360, rotationX:Math.random() * 360,
    physics2D:{
    angle:angle * 180 / Math.PI, //translate radians to degrees
    velocity:(100 + Math.random() * 300) * speed, //initial velocity
    gravity:700 * gravity
  }}, Math.random() * 2)

}

 // control the timeScale() of the timeline

// normal.onclick = function() {
//   TweenLite.to(particles, 2, {timeScale:1, ease:Linear.easeNone}); // normal speed
// }
//
// slow.onclick = function() {
//   TweenLite.to(particles, 2, {timeScale:0.1, ease:Linear.easeNone}); // 1/10th normal speed
// }
//
// fast.onclick = function() {
//   TweenLite.to(particles, 2, {timeScale:4, ease:Linear.easeNone}); // 4 times as fast
// }

function randomNumber(min, max){
	return Math.floor(Math.random() * (1 + max - min) + min);
}
}
