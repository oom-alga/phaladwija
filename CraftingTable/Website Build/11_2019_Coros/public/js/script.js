owl();
text();
itemSlide();
menus();
parallax();
item();
// owl Slider
function owl() {
  var menus = $('.owl-carousel-indexBottomMenu');
  $('.owl-carousel-indexHeader').owlCarousel({
    loop:true,
    margin:10,
    items:1,
    nav:true,
    navText: ['Next', 'Prev']
  });
  menus.owlCarousel({
    items:4,
    center:true,
    autoWidth:true,
  });
  
}

function text(){
  $(".textBigTitle").fitText(0.97);
  $(".textTitle").fitText(0.3);
}

function itemSlide() {
  var controller = new ScrollMagic.Controller();
  var horizontalSlide = new TimelineMax()
  // animate panels
  .to("#itemSlide", 1,   {x: "-20%"})	
  .to("#itemSlide", 1,   {x: "-40%"})
  .to("#itemSlide", 1,   {x: "-60%"})
  .to("#itemSlide", 1,   {x: "-80%"})

  // create scene to pin and link animation
  new ScrollMagic.Scene({triggerElement: "#projectItem.one",triggerHook: "onLeave",duration: "500%"})
  .setPin("#projectItem.one").setTween(horizontalSlide).addIndicators({name: "1 (duration: 300)"}).addTo(controller);

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
    tk.from(outer, 0.5, {scaleX: 0, ease: Expo.easeOut});
    new ScrollMagic.Scene({
      triggerElement: this,
      triggerHook: "onCenter",
    })
      .setTween(tk)
      .addIndicators() 
      .addTo(ctrl);
  });
}