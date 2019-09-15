$('document').ready(function(){
    var transEffect = Barba.BaseTransition.extend({
        start: function(){
          this.newContainerLoading.then(val => this.finish($(this.newContainer)));
          $("html, body").animate({ scrollTop: 0 }, "slow");
          cursor.classList.add("bg-primary");
          $(".cursor").css({
              "position": "fixed",
              "width": "100%",
              "height": "100vh",
              "top": "0",
              "left": "0",
              "border-radius": 0,
              "border": "3px solid transparent"  // boreder
          });
          // cursor.classList.add("expand");     // untuk background
        },
        finish: function(nc) {
          nc.hide();
          var _this = this;        
          $(this.oldContainer).fadeOut(500).promise().done(() => { 
            nc.css('visibility','visible');
            // cursor.classList.remove("expand");     // untuk background
            nc.fadeIn(500, function(){
                $(".cursor").css({
                    "top": "50%",
                    "left": "50%",
                    "position": "absolute",
                    "width": "20px",
                    "height": "20px",
                    "border-radius": "50%",
                    "border": "3px solid gray"    // boreder
                });
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





  const cursor = document.querySelector('.cursor');
  const cursors = document.querySelector('.cursor-follow');
  document.addEventListener('mousemove', e => {
      cursors.setAttribute("style", "top: "+(e.pageY - 2.5)+"px; left: "+(e.pageX - 2)+"px;");
      cursor.setAttribute("style", "top: "+(e.pageY - 20)+"px; left: "+(e.pageX - 20)+"px;");
  })

  document.addEventListener('click', () => {
      cursor.classList.add("expand-click");
      setTimeout(() => {
          cursor.classList.remove("expand-click");
      }, 500)
  })

  document.getElementById("demo").onmouseover = function() {mouseOver()};
  document.getElementById("logo").onmouseout = function() {mouseOut()};

  function mouseOver() {
    cursor.classList.add("expand-hover");
  }
  function mouseOut() {
    cursor.classList.remove("expand-hover");
  }

