var svg_width = 1080, svg_height = 1920,fps = 24, tween, $facetype;
$(function(){
// Way to make document be ready.

// Elements to inject
var mySVGsToInject = document.querySelectorAll('.inject-me');
// MorphSVGPlugin.convertToPath("#start");
SVGInjector(mySVGsToInject);


// main page get- left data
var data_left = $.urlParam('data'), rate_type = $.urlParam('rate'),bar_height,bar_space,face_po,
tlbg = new TimelineMax(), fam = $.urlParam('fam');

console.log(fam)



if(fam == 'y'){
    $('div.wrap_area').addClass('wrap_area_family');
    $('.icn-vp-wrapper').addClass('family');
    $('.wrap_family_list').show();

    var sc_h = (window.innerHeight * 0.73) - 106;

    bar_height = sc_h *(data_left/100), bar_space = sc_h - bar_height, face_po = bar_space - 120;

}else if(fam == 'n' || fam== undefined){
    bar_height = 320*(data_left/100), bar_space = 320 - bar_height
    face_po = bar_space;

}

if (rate_type == 'type1'){
//    TweenLite.to($('.nemoface.typ1') , 0.3, {autoAlpha: 1, display:'block'});

    $facetype = $('.nemoface.typ1');
}else if (rate_type == 'type2'){
    $facetype = $('.nemoface.typ2');
}else if (rate_type == 'type3'){
    $facetype = $('.nemoface.typ3');
}else if (rate_type == 'type4'){
    $facetype = $('.nemoface.typ4');
}
if($.between(0,19, data_left)){
    $('.usage_data').addClass('level1');
    $('i.arrow').addClass('level1');

    $('#request_btn').show();
    $('.main-nemo-wrapper').attr('fill','#ee6647');
    var jsonfile = "/dc2/Publish/trunk/resources/up/json/p_level1.json",AJAX_req;
    AJAX_JSON_Req(jsonfile);

    tlbg.to("#basicmouth", 3, { morphSVG:"#btstp4mth", delay:0.5,transformOrigin:"0 0"},"-=0.5")
        .to($('.bgstp5.eye') , 0.3, {autoAlpha: 1, display:'block'})
            .to("#typ1basicmth", 3, { morphSVG:"#typ1stp3mth", delay:0.5,transformOrigin:"0 0"},"-=1.5")
            .to($('.typ1stp4eye') , 0.3, {autoAlpha: 1, display:'block'},"-2.0");

}
else if($.between(20,49, data_left)){
    $('.usage_data').addClass('level2');
    $('i.arrow').addClass('level2');

    $('.main-nemo-wrapper').attr('fill','#fedf76');

    var jsonfile = "/dc2/Publish/trunk/resources/up/json/p_level2.json",AJAX_req;
    AJAX_JSON_Req(jsonfile);

    tlbg.to("#basicmouth", 3, { morphSVG:"#btstp4mth", delay:0.5,transformOrigin:"0 0"},"+=1.5")
    .to("#typ1basicmth", 3, { morphSVG:"#typ1stp3mth", delay:0.5,transformOrigin:"0 0"},"-=0.5");
}
else if($.between(50,79, data_left)){
    $('.usage_data').addClass('level3');
    $('i.arrow').addClass('level3');


    $('.main-nemo-wrapper').attr('fill','#85c27a');

    var jsonfile = "/dc2/Publish/trunk/resources/up/json/p_level3.json",AJAX_req;
    AJAX_JSON_Req(jsonfile);
    tlbg.to("#basicmouth", 3, { morphSVG:"#bgstp2mth", delay:0.5,transformOrigin:"0 0"});
}
else if($.between(80,100, data_left)){
    $('.usage_data').addClass('level4');

    $('i.arrow').addClass('level4');
    $('.main-nemo-wrapper').attr('fill','#73beda');
    var jsonfile = "/dc2/Publish/trunk/resources/up/json/p_level4.json",AJAX_req;
    AJAX_JSON_Req(jsonfile);

    tlbg.to("#basicmouth", 1, { morphSVG:"#bgstp2mth", delay:0.5,transformOrigin:"0 0"})
        .to("#typ1basicmth", 3, { morphSVG:"#typ1stp1mth", delay:0.5,transformOrigin:"0 0"},"-=1.5");
    // .to("#typ1basicmth", 3, { morphSVG:"#typ1stp1mth", delay:0.5,transformOrigin:"0 0"},"-=3.0");
    //눈물흘리는 것 넣어야함.

}

var $nemo_curr = $('.main-nemo-wrapper'),tl = new TimelineMax();
// , tl2 = new TimelineLite();
// $('.main-nemo-wrapper').attr('height',bar_height );
CustomBounce.create('myBounce', {strength: 0.3, squash: 2, squashID: 'mySquash'});

    tl.set($facetype , {y: face_po+15})
    .to($nemo_curr, 1, {y: face_po, height:bar_height, width:'160px', ease: 'myBounce'}, 0)
    .to('.nemo-eye',0.5,{y:-12, ease: 'myBounce'},0)
    .to($nemo_curr, 1, {y:0, scaleX: 1.05, scaleY: 0.9, attr:{rx: 50, ry: 100}, ease: 'mySquash', transformOrigin: '50% 100%'}, 0)
    .to($facetype , 0.3, {y: face_po+10,autoAlpha: 1, display:'block'}, '-=0.3')

    .to('.nemo-eye',0.5,{y:0, ease: 'myBounce'}, '+=0.5');


    setInterval(function(){
        var duration = 1;
        TweenMax.to('#bgnemo-wrapper', duration / 4, {y:-10, ease:Power2.easeOut});
        TweenMax.to('#bgnemo-wrapper', duration / 2, {y:0, ease:Bounce.easeOut, delay:duration / 4,
        onComplete:function(){
            // TweenMax.to($nemo_curr, duration / 4, {scaleX:1.02, y:5, x:-0.5, ease:Bounce.easeOut,transformOrigin: "center center"})
            // TweenMax.to($nemo_curr, duration / 2, {scaleX:1,y:0, delay:duration / 4,x:0,ease:Bounce.easeOut,transformOrigin: "center center"})
        }
        });
    }, 1000);


    // var tl_vp = new TimelineMax({repeat:-1});
    // tlvp.to("#objs4-smk-step1", 0.5, {morphSVG:"#objs4-smk-step2",transformOrigin:"50% 50%",ease:Linear.easeNone},"-=0.8")

    $('#click').click(function(){
        $('.vp_popup').show();
        var tl = new TimelineMax();

        tl.to("#pop-playbtn", 0.2, {morphSVG:"#pop-octa",transformOrigin:"50% 50%",ease:Linear.easeNone},"+=0.1")
        .to($('#pop-logo') , 0.3, {autoAlpha: 1, display:'none'}, '-=0.5')
        .to($('.vp_pop_cont') , 0.3, {autoAlpha: 1, display:'block'}, '-=0.1');ååå

    });
    $('.vp_popup').click(function(){
        // $(this).hide();
        var tl = new TimelineMax();
        tl.to($('.vp_pop_cont') , 0.3, {autoAlpha: 0, display:'none'}, '-=0.1')
        .to("#pop-octa", 0.2, {morphSVG:"#pop-playbtn",transformOrigin:"50% 50%",ease:Linear.easeNone},"-=0.3")
        .to($('#pop-logo') , 0.3, {autoAlpha: 1, display:'block'}, '-=0.1')
        .to($(this) , 0.3, {autoAlpha: 1, display:'none'}, '-=0.5');

    });
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
