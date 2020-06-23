function navBar(event) {
    var nav = $('nav ul');

    var active = nav.find('.active');
    var pos = 0;
    var wid = 0;
    var posTop = 0;

    var line = $('<div />').addClass('line');
    if ($('.line').length < 1) {
        line.appendTo(nav);
    } else {
        line = nav.find('.line');
    }

    if(active.length) {
      pos = active.position().left;
      posTop = active.position().top;
      wid = active.width();
      line.css({
        top: posTop + 12,
        left: pos,
        width: wid
      });
    }

    var scrollPos = $(document).scrollTop();
    $('nav ul li a').each(function () {
        var currLink = $(this);
        var refElement = $(currLink.attr("href"));
        if (refElement.position().top <= (scrollPos + 20)
            && refElement.position().top + refElement.height() > scrollPos) {
            if(!$(this).parent().hasClass('active') && !nav.hasClass('animate')) {

              nav.addClass('animate');

              var _this = $(this);

              nav.find('li').removeClass('active');

              var position = _this.parent().position();
              var width = _this.parent().width();

              if(position.left >= pos) {
                line.animate({
                  width: ((position.left - pos) + width)
              }, 150, function() {
                  line.animate({
                    width: width,
                    left: position.left,
                    top: position.top + 12
                  }, 50, function() {
                    nav.removeClass('animate');
                  });
                  _this.parent().addClass('active');
                });
              } else {
                line.animate({
                  top: position.top + 12,
                  left: position.left,
                  width: ((pos - position.left) + wid)
              }, 150, function() {
                  line.animate({
                    width: width
                  }, 50, function() {
                    nav.removeClass('animate');
                  });
                  _this.parent().addClass('active');
                });
              }

              posTop = position.top;
              pos = position.left;
              wid = width;
            }
        } else{
            currLink.removeClass("active");
        }
    });
}

function navBarScroll() {
    $(document).on("scroll", navBar);

    //smoothscroll
    $('a[href^="#"]').on('click', function (e) {
        e.preventDefault();
        $(document).off("scroll");

        var target = this.hash,
            menu = target;
        $target = $(target);
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top+2
        }, 500, 'swing', function () {
            window.location.hash = target;
            $(document).on("scroll", navBar);
        });
    });
}

function highlightText() {

    $('#CE-text').addClass('highlight');
    $("#Econ-text").addClass("highlight");
    setTimeout(
        function()
        {
            $('#CE-text').addClass('highlight-load');
        }, 500);
    setTimeout(
        function()
        {
            $("#Econ-text").addClass("highlight-load");
        }, 1000);
    setTimeout(
        function()
        {
            $('#CE-text').removeClass('highlight-load');
            $("#Econ-text").removeClass("highlight-load");
        }, 2000);


}

$(document).ready(function () {
    navBarScroll();
    setTimeout(highlightText, 1000);
})
