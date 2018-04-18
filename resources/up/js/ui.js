var svg_width = 1080, svg_height = 1920,fps = 24, tween;
$(function(){
// Way to make document be ready.

// var paperfold = $('.fold-overlay').paperfold({
// duration:5000
// });
// paperfold.open();

// Elements to inject
var mySVGsToInject = document.querySelectorAll('img.inject-me');
MorphSVGPlugin.convertToPath("#start");
SVGInjector(mySVGsToInject);


// main page get- left data
var data_left = $.urlParam('data'), bar_height = 291.7*(data_left/100), bar_space = 291.7 - bar_height;
console.log(bar_space)

if($.between(0,19, data_left)){
    $('.current-data').addClass('level1');
    $('.cur_more').css('fill','#231f20');
    var jsonfile = "/dc2/Publish/trunk/resources/up/json/p_level1.json",AJAX_req;
    AJAX_JSON_Req(jsonfile);
}
else if($.between(20,49, data_left)){
    $('.current-data').addClass('level2');
    $('.cur_more').addClass('level2');
    var jsonfile = "/dc2/Publish/trunk/resources/up/json/p_level2.json",AJAX_req;
    AJAX_JSON_Req(jsonfile);
}
else if($.between(50,79, data_left)){
    $('.current-data').addClass('level3');
    $('.cur_more').css('stroke','#231f20');
    var jsonfile = "/dc2/Publish/trunk/resources/up/json/p_level3.json",AJAX_req;
    AJAX_JSON_Req(jsonfile);
}
else if($.between(80,100, data_left)){
    $('.current-data').addClass('level4');
    $('.cur_more').css('stroke','#0478a3');
    var jsonfile = "/dc2/Publish/trunk/resources/up/json/p_level4.json",AJAX_req;
    AJAX_JSON_Req(jsonfile);
}

var $nemo_curr = $('.nemo-bar'),tl = new TimelineMax(), tl2 = new TimelineLite();
CustomBounce.create('myBounce', {strength: 0.6, squash: 3, squashID: 'mySquash'});


// tl.to('rect', 4, {y: 250, ease: 'myBounce'}, 0);
// tl.to('rect', 4, {scaleX: 1.3, scaleY: 0.8, attr:{rx: 20, ry: 100}, ease: 'mySquash', transformOrigin: '50% 100%'}, 0);
tl2.to($nemo_curr, 1.5, {height:bar_height,y:bar_space, transformOrigin:"0 100%"});
// tl.to($nemo_curr, 4, {y: 250, ease: 'myBounce'}, 0);
// tl.to($nemo_curr, 4, {scaleX: 1.3, scaleY: 0.8, attr:{rx: 20, ry: 100}, ease: 'mySquash', transformOrigin: '50% 100%'}, 0);

// .to($nemo_curr, 0.5, {y:bar_space})
// var $nemo_curr = $('.nemo-bar'), $nemo_bg= $('.nemo-bg'),duration = 1, $sidenav = $('#mySidenav'),
// tl = new TimelineLite();
//
// tl.set($nemo_curr, {height:"290px"})
//     .set($nemo_bg, {height:"91px"}, "-=0.9")
//     .to($nemo_curr, 1.5, {height:"200px", ease:Bounce.easeOut})
//     .to("#mouse_start", 0.5, { morphSVG:"#mouse_middle", delay:0.5,transformOrigin:"0 0"},"-=1.5")
//     .to("#mouse_start", 0.5, {morphSVG:"#mouse_end", scale:1,transformOrigin:"50% 50%"}, "-=0.1");
//
//
//     window.odometerOptions = {
//         value:999,
//         format: '',
//         animation: 'count',
//         theme: 'minimal'
//     };
//     setTimeout(function(){
//       $('.odometer').html(650);
//     }, 1000);
//
//
//     setInterval(function(){
//         TweenMax.to($nemo_bg, duration / 4, {y:-10, ease:Power2.easeOut});
//         TweenMax.to($nemo_bg, duration / 2, {y:0, ease:Bounce.easeOut, delay:duration / 4,
//         onComplete:function(){
//             TweenMax.to($nemo_curr, duration / 4, {scaleX:1.02, y:5, x:-0.5, ease:Bounce.easeOut,transformOrigin: "center center"})
//             TweenMax.to($nemo_curr, duration / 2, {scaleX:1,y:0, delay:duration / 4,x:0,ease:Bounce.easeOut,transformOrigin: "center center"})
//         }
//         });
//     }, 10000);




    $('#nav-icon4').click(function(){
        if ( $( this ).hasClass( "open" ) ) {
            $(this).removeClass('open');

            //헤더 fixed 처리
            $(this).parents('.wrap_header').removeClass('gnb_open');

            // $('.fold-overlay').paperfold({
            //     duration:3000
            // }).close();

            var tl = new TimelineLite();
            tl.to('#mySidenav', 1.0, {top:"-100vh", ease:Power2.easeOut});
            // .to('.fold-wrapper', 0.7, {scaleY:0.1, transformOrigin:"50% 0"}, "-=0.5");


        }else if(!$(this).hasClass("open")){
            TweenMax.to('#mySidenav', 0.3, {css:{top:0}, ease:Bounce.easeOut});
            // TweenMax.to('.gnb_header_wrapper', 2.0, {css:{top:"51px",height:"68.7px"}, ease:Bounce.easeIn,transformOrigin: "center 100%"});

            $(this).toggleClass('open');
            //헤더 fixed 처리
            $(this).parents('.wrap_header').addClass('gnb_open');
            // $('.fold-overlay').paperfold({
            // duration:2000
            // }).open();
            // TweenLite.to('.fold-wrapper', 1.8, {scaleY:1, transformOrigin:"50% 0"});
            //
            //
            //
            //
            var tl = new TimelineMax({repeat:3}), $box2 = $('.gnb_mus_box2'), $box1 = $('.gnb_mus_box1'), $box3 = $('.gnb_mus_box3');
            tl.set($box1,{opacity:1}).set($box2,{opacity:1}).set($box3,{opacity:1})
            .to($box1, 1, {x:60, y:-80, ease:Power2.easeIn, opacity:1}, "go")
            .to($box1, 0.1, {opacity:0},"+=0.2")
            .to($box1, 0.1, {x:-60, y:80, ease:Power2.easeIn, opacity:0})

            .to($box3, 1, {x:-120, y:-80, ease:Power2.easeIn, opacity:1}, "go")
            .to($box3, 0, {opacity:0}, "-=0.1")
            .to($box3, 0.1, {x:120, y:80, ease:Power2.easeIn, opacity:0})

            .to($box2, 1, {x:60, y:-80, ease:Power2.easeIn, opacity:1}, "go")
            .to($box2, 0, {opacity:0}, "-=0.1")
            .to($box2, 0.1, {x:-60, y:80, ease:Power2.easeIn, opacity:0});
        }
        // $('#mySidenav').css('top', '0');


    });

    $('#check_box3').change(function(){
        if(this.checked) {
            $('.btn_bottom').removeClass('disabled');
    //Do stuff
        }else if(!this.checked){
            $('.btn_bottom').addClass('disabled');
        }
    })

});
//SVG Handle
function handle_AJAX_Complete() {
    if( AJAX_req.readyState == 4 && AJAX_req.status == 200 )
    {
        json = JSON.parse(AJAX_req.responseText);
        comp = new SVGAnim(
                       json,
                       svg_width,
                       svg_height,
                       fps
                       );

        // comp.mc.stop();
    }
}
function AJAX_JSON_Req( url )
{
    AJAX_req = new XMLHttpRequest();
    AJAX_req.open("GET", url, true);
    AJAX_req.setRequestHeader("Content-type", "application/json");

    AJAX_req.onreadystatechange = handle_AJAX_Complete;
    AJAX_req.send();
}

//TweenMax.to("#start",2,)
