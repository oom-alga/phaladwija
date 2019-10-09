initBarba();

// SmoothScroll
// new SmoothScroll(document,50,20)
new SmoothScroll(document,50,15)
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
  $('.owl-carousel-basic').owlCarousel({
    loop:true,
    margin:30,
    nav:true,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:2
        }
    }
  });
}


// scrollMagic
function scrollMagic() {
  var ctrl = new ScrollMagic.Controller();
  $(".items-scroll").each(function(i) {
    var inner = $(this).find(".inner");
    var outer = $(this).find(".outer");
    var tl = new TimelineMax();
    tl.from(outer, 0.25, { scaleX: 0 });
    tl.from(inner, 0.65, { yPercent: 100, ease: Back.easeOut });
    new ScrollMagic.Scene({
      triggerElement: this,
      triggerHook: 0.15
    })
      .setTween(tl)
      // .addIndicators() 
      .addTo(ctrl);
  });
  $(".wrap-parallax").each(function(i) {
    var outer = $(this).find('.background');
    var tk = new TimelineMax();
    tk.from(outer, 0.5, {scaleX: 0, ease: Expo.easeOut});
    new ScrollMagic.Scene({
      triggerElement: this,
      triggerHook: 0.75
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

  var OwlCarousel = Barba.BaseView.extend({
    namespace: 'OwlCarousel',
    onEnter: function() {
      owl();
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

  var ScrollMagic = Barba.BaseView.extend({
    namespace: 'ScrollMagic',
    onEnter: function() {
      scrollMagic();
      parallax();
      console.log("onEnter ScrollMagic");
    },
    onEnterCompleted: function() {
      console.log("onEnterCompleted ScrollMagic");
    },
    onLeave: function() {
      console.log("onLeave ScrollMagic");
    },
    onLeaveCompleted: function() {
      console.log("onLeaveCompleted ScrollMagic");
    }
  });
  
  Homepage.init();
  OwlCarousel.init();
  ScrollMagic.init();

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
    $(".background", this).parallax(-10, e);
    $(".title", this).parallax(10, e);
    $(".desc", this).parallax(15, e);
  });
}