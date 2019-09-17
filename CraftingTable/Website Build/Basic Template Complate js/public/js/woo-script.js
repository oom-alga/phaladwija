$('document').ready(function(){
    var transEffect = Barba.BaseTransition.extend({
        start: function(){
          this.newContainerLoading.then(val => this.finish($(this.newContainer)));
          $("html, body").animate({ scrollTop: 0 }, "slow");
          cursor.classList.add("bg-primary");
          cursor.classList.add("expand"); 
          $(".cursor").css({
              "position": "fixed",
              "width": "100%",
              "height": "100vh",
              "top": "0",
              "left": "0",
              "border-radius": 0,
              "border": "3px solid transparent" 
          });
        },
        finish: function(nc) {
          nc.hide();
          var _this = this;        
          $(this.oldContainer).fadeOut(500).promise().done(() => { 
            nc.css('visibility','visible');
            nc.fadeIn(500, function(){
                $(".cursor").css({
                    "top": "50%",
                    "left": "50%",
                    "position": "absolute",
                    "width": "20px",
                    "height": "20px",
                    "border-radius": "50%",
                    "border": "3px solid gray"
                });
                cursor.classList.remove("expand"); 
                cursor.classList.remove("bg-primary"); 
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




  // var swiper = new Swiper('.swiper-container');
  var swiper = new Swiper('.swiper-container', {
    slidesPerView: 5,
    spaceBetween: 50,
    // init: false,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      1024: {
        slidesPerView: 4,
        spaceBetween: 40,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      640: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      320: {
        slidesPerView: 1,
        spaceBetween: 10,
      }
    }
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
