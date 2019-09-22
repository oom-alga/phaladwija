$('document').ready(function(){
  var transEffect = Barba.BaseTransition.extend({
      start: function(){
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
    return transEffect;
  }
  Barba.Pjax.start();
});




const cursor = document.querySelector('.cursor');
const cursors = document.querySelector('.cursor-follow');

document.addEventListener('mousemove', e => {
  cursor.setAttribute("style", "top: "+(e.pageY - 20)+"px; left: "+(e.pageX - 20)+"px;");
  cursors.setAttribute("style", "top: "+(e.pageY - 2.5)+"px; left: "+(e.pageX - 2)+"px;");
})

document.addEventListener('drag', e => {
  cursor.classList.add("expand-click");
})

document.addEventListener('click', () => {
    cursor.classList.add("expand-click");
    setTimeout(() => {
        cursor.classList.remove("expand-click");
    }, 500)
})

$('.owl-carousel').owlCarousel({
  loop:true,
  margin:10,
  nav:true,
  responsive:{
      0:{
          items:1
      },
      600:{
          items:3
      },
      1000:{
          items:5
      }
  }
})