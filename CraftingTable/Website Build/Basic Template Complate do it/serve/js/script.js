initBarba();

var html = document.documentElement;
var body = document.body;

var scroller = {
  target: document.querySelector("#scroll-container"),
  ease: 0.05, // <= scroll speed
  endY: 0,
  y: 0,
  resizeRequest: 1,
  scrollRequest: 0,
};

var requestId = null;

TweenLite.set(scroller.target, {
  rotation: 0.01,
  force3D: true
});

window.addEventListener("load", onLoad);

function onLoad() {    
  updateScroller();  
  window.focus();
  window.addEventListener("resize", onResize);
  document.addEventListener("scroll", onScroll); 
}

function updateScroller() {
  
  var resized = scroller.resizeRequest > 0;
    
  if (resized) {    
    var height = scroller.target.clientHeight;
    body.style.height = height + "px";
    scroller.resizeRequest = 0;
  }
      
  var scrollY = window.pageYOffset || html.scrollTop || body.scrollTop || 0;

  scroller.endY = scrollY;
  scroller.y += (scrollY - scroller.y) * scroller.ease;

  if (Math.abs(scrollY - scroller.y) < 0.05 || resized) {
    scroller.y = scrollY;
    scroller.scrollRequest = 0;
  }
  
  TweenLite.set(scroller.target, { 
    y: -scroller.y 
  });
  
  requestId = scroller.scrollRequest > 0 ? requestAnimationFrame(updateScroller) : null;
}

function onScroll() {
  scroller.scrollRequest++;
  if (!requestId) {
    requestId = requestAnimationFrame(updateScroller);
  }
}

function onResize() {
  scroller.resizeRequest++;
  if (!requestId) {
    requestId = requestAnimationFrame(updateScroller);
  }
}

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
      .addIndicators() 
      .addTo(ctrl);
  });
  
}
function handleAnimations() {
  var Homepage = Barba.BaseView.extend({
    namespace: 'homepage',
    onEnter: function() {
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