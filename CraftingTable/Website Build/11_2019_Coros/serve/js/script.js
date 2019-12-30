owl();
text();
itemSlide();
menus();
parallax();
item();
woow();
hoverTransition();
// owl Slider
function owl() {
  $('.owl-carousel-indexHeader').owlCarousel({
    loop:true,
    margin:10,
    items:1,
    nav:false
  });
  $('.owl-carousel-indexBottomMenu').owlCarousel({
    items:4,
    center:true,
    autoWidth:true,
  });

  $('.owl-carousel-indexHeaderTwo').owlCarousel({
    loop:true,
    margin:0,
    items:1,
    nav:false
  });

  $('.owl-carousel-indexItemThree').owlCarousel({
    loop:true,
    margin:0,
    items:2,
    center:true,
    nav:false
  });
  
  
}

function text(){
  $(".textBigTitle").fitText(0.999);
  $(".textTitle").fitText(0.3);
}

function itemSlide() {
  var controller = new ScrollMagic.Controller();
  var horizontalSlide = new TimelineMax()
  // animate panels
  .to("#itemSlide", 1,   {x: "-20%"})	
  .to("#itemSlide", 1,   {x: "-40%"})
  .to("#itemSlide", 1,   {x: "-60%"})
  .to("#itemSlide", 1,   {x: "-80%"});

  // var tween = TweenMax.to("#header.four", 0.5, {css:{color:"#ff0004", ease: Linear.easeNone}});
  var tween = TweenMax.to("#header.four", 1, {className: "+=animateScroll"});

  // create scene to pin and link animation
  new ScrollMagic.Scene({triggerElement: "#projectItem.one, #projectItem.three",triggerHook: "onLeave",duration: "500%"})
  .setPin("#projectItem.one, #projectItem.three").setTween(horizontalSlide).addIndicators({name: "1 (duration: 300)"}).addTo(controller);

  new ScrollMagic.Scene({triggerElement: "#header.four", duration: 500, offset: -50,triggerHook: "onLeave"})
  .setTween(tween).addIndicators({name: "Header (duration: 500)"}).addTo(controller);
}
 
function menus(){
  $("nav.three h3").mouseenter(function() {
    $this = $(this);
    $("nav.three").css('background-color', function() {
      return $this.data('bgcolor');
    });
    $("nav.three").css("background-image", "url(" + $(this).data("bg") + ")");
  });
}

function parallax(){
  $.fn.parallax = function(resistance, mouse) {
    $el = $(this);
    TweenLite.to($el, 0.2, {
      x: -((mouse.clientX - window.innerWidth / 2) / resistance),
      y: -((mouse.clientY - window.innerHeight / 2) / resistance)
    });
  };
  $(".wrap-parallax").mousemove(function(e) {
    $(".background", this).parallax(-10, e);
    $(".title", this).parallax(10, e);
    $(".desc", this).parallax(15, e);
  });
}

function item(){
  var ctrl = new ScrollMagic.Controller();
  $(".wrapItemScroll").each(function(i) {
    var outer = $(this).find('.background-Scroll');
    var tk = new TimelineMax();
    tk.from(outer, 0.1, {scaleX: 0, ease: Expo.easeOut});
    new ScrollMagic.Scene({
      triggerElement: this,
      triggerHook: "onCenter",
    })
      .setTween(tk)
      .addIndicators() 
      .addTo(ctrl);
  });

  $(".animate").each(function(i) {
    var tk = new TimelineMax();
    tk.to(this, 0.5, {css:{className:'+=show wow'}});
    new ScrollMagic.Scene({
      triggerElement: this,
      triggerHook: "onCenter",
      // triggerHook: 0.75,
    })
      .setTween(tk)
      .reverse(false)
      .addIndicators({name: "animate", colorEnd: "#FFFFFF"}) 
      .addTo(ctrl);
  });
}

function woow(){
  $(function() {
    shuffleRows($('#shuffle .row'))
  })
  
  function shuffleMe(o) {
    for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
  }
  function shuffleRows($rows) {
    console.log($rows)
    var $items = $rows.children(),
      num_cols = $rows.eq(0).children().length;
      shuffleMe($items);
    for (var i = 0, j = 0; i < $items.length; i += num_cols, j++) {
      $rows.eq(j).append($items.slice(i, i + num_cols + 1))
    }

  }
}

function hoverTransition(){
  const lineEq = (y2, y1, x2, x1, currentVal) => {
    var m = (y2 - y1) / (x2 - x1), b = y1 - m * x1;
    return m * currentVal + b;
  };

  const gridItems = Array.from(document.querySelectorAll('.itemTransition'));
  const distanceThreshold = {min: 0, max: 250};
  const grayscaleInterval = {from: 1, to: 0};

  gridItems.forEach((item) => {
    const img = item.querySelector('.hoverTransition');

    new Nearby(img, {
        onProgress: (distance) => {
            const bw = lineEq(grayscaleInterval.from, grayscaleInterval.to, distanceThreshold.max, distanceThreshold.min, distance);
            
            TweenMax.to(img, 1, {
                ease: Power2.easeOut,
                filter: `grayscale(${Math.min(bw,grayscaleInterval.from)})`
            });

        }
    });
  });
}
