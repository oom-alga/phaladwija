initBarba();

// SmoothScroll

new SmoothScroll(document,50,15)  // new SmoothScroll(document,50,20)
function SmoothScroll(target, speed, smooth) {
	if (target === document)
		target = (document.scrollingElement 
              || document.documentElement 
              || document.body.parentNode 
              || document.body)
      
	var moving = false
	var pos = target.scrollTop
  var frame = target === document.body 
              && document.documentElement 
              ? document.documentElement 
              : target
  
	target.addEventListener('mousewheel', scrolled, { passive: false })
	target.addEventListener('DOMMouseScroll', scrolled, { passive: false })

	function scrolled(e) {
		e.preventDefault();
		var delta = normalizeWheelDelta(e)
		pos += -delta * speed
		pos = Math.max(0, Math.min(pos, target.scrollHeight - frame.clientHeight))
		if (!moving) update()
	}

	function normalizeWheelDelta(e){
		if(e.detail){
			if(e.wheelDelta)
				return e.wheelDelta/e.detail/40 * (e.detail>0 ? 1 : -1)
			else
				return -e.detail/3
		}else
			return e.wheelDelta/120
	}

	function update() {
		moving = true
		var delta = (pos - target.scrollTop) / smooth
		target.scrollTop += delta
		if (Math.abs(delta) > 0.5)
			requestFrame(update)
		else
			moving = false
  }
  
	var requestFrame = function() {
		return (
			window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.oRequestAnimationFrame ||
			window.msRequestAnimationFrame ||
			function(func) {
				window.setTimeout(func, 1000 / 50);
			}
		);
	}()
}
// progressBarScroll
function progressBarScroll() {
  let winScroll   = document.body.scrollTop || document.documentElement.scrollTop,
      height      = document.documentElement.scrollHeight - document.documentElement.clientHeight,
      scrolled    = (winScroll / height) * 100;
  document.getElementById("progressBar").style.height = scrolled + "%";
}
window.onscroll = function () {
  progressBarScroll();
};

// owl Slider
function owl() {
  $('.owl-carousel-index-header').owlCarousel({
    loop:true,
    nav:true,
    items:1
  });
  $('.owl-carousel-work').owlCarousel({
    loop:true,
    nav:true,
    items:1
  });
  $('.owl-carousel-basic').owlCarousel({
    loop:false,
    margin:10,
    nav:true,
    center: true,
    items:2
  });
  $('.owl-carousel-services').owlCarousel({
    loop:false,
    margin:30,
    nav:false,
    items:3
  });
}

// parallax image
function parallax(){
  $.fn.parallax = function(resistance, mouse) {
    $el = $(this);
    TweenLite.to($el, 0.2, {
      x: -((mouse.clientX - window.innerWidth / 2) / resistance),
      y: -((mouse.clientY - window.innerHeight / 2) / resistance)
    });
  };
  $(".wrap-parallax").mousemove(function(e) {
    $(".background", this).parallax(-30, e);
    $(".title", this).parallax(30, e);
    $(".desc", this).parallax(25, e);
  });
} 


// scrollMagic
function scrollMagic() {
  var ctrl = new ScrollMagic.Controller();
  $("header").each(function(i) {
    var title = $(this).find('.title');
    var desc = $(this).find('.desc');
    var tk = new TimelineMax();
    tk.from(title, 1, { yPercent: 300, ease: Back.easeNone });
    tk.from(desc, 1, { yPercent: 100, ease: Back.easeNone });
    new ScrollMagic.Scene({
      triggerElement: this,
      triggerHook: 0.5,
      duration: 350,
      offset: 250
    })
      .setTween(tk)
      .addIndicators() 
      .addTo(ctrl);
  });

  $("#about").each(function(i){
    var title = $(this).find('.title');
    var tk = new TimelineMax();
    // tk.from(title, 1, { yPercent: 300, ease: Back.easeNone });
    tk.from(title, 1, {width: "25%"});
    new ScrollMagic.Scene({
      triggerElement: this,
      triggerHook: 0.5,
      duration: 350,
      offset: 250
    })
      .setTween(tk)
      .addIndicators() 
      .addTo(ctrl);
  });
}


function handleAnimations() {
  var Homepage = Barba.BaseView.extend({
    namespace: 'homepage',
    onEnter: function() {
      parallax();
      owl();
      scrollMagic();
      console.log("onEnter");
    },
    onEnterCompleted: function() {
      console.log("onEnterCompleted");
    },
    onLeave: function() {
      console.log("onLeave");
    },
    onLeaveCompleted: function() {
      console.log("onLeaveCompleted");
    }
  });
  
  Homepage.init();
}

// Barba
function initBarba() {
  var FadeTransition = Barba.BaseTransition.extend({
      start: function(){
        console.log("slow");
        this.newContainerLoading.then(val => this.finish($(this.newContainer)));
        $("html, body").animate({ scrollTop: 0 }, "slow");
        $(".load-page img").css({
          "opacity": "1",
        }, "slow");
      },
      finish: function(nc) {
        nc.hide();
        var _this = this;        
        $(this.oldContainer).fadeOut(500).promise().done(() => { 
          nc.css('visibility','visible');
          nc.fadeIn(500, function(){
              $(".load-page img").css({
                "opacity": "0",
              }, "slow");
            _this.done();
          })
        });
      }
  });
  Barba.Pjax.getTransition = function() {
      return FadeTransition;
  };

  handleAnimations();
  Barba.Pjax.cacheEnabled = false;
  Barba.Pjax.start();
}
