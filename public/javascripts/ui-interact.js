// this file describes all ui interaction functionality

//modal functionality (show signin modal, show register modal, close modal)
$(".pop-signin").click(function () {
  $(".register").hide();
  $(".signin").show();
});
$(".pop-register").click(function () {
  $(".signin").hide();
  $(".register").show();
});
$(".close-link").click(function () {
  $(".modal").hide();
});

//prevent clicks on modal window from triggering modal close
$(".popup-content").click(function (e) {
  e.stopPropagation();
});

//toggle navigation
$(".navbar-menu").click(function () {
  if($(".navbar-lists").hasClass("hide")) {
    $(".navbar-lists").animate({height: "250px"}, 200).removeClass("hide");
  } else {
    $(".navbar-lists").animate({height: 0}, 200).addClass("hide");
  }
});

//toggle sidemenu
$("#side-menu-toggle-wrapper").click(function () {
  if($("#side-menu").hasClass("show")) {
    $("#side-menu").animate({"margin-top": "200%"}, 300).removeClass("show");
  } else {
    $("#side-menu").animate({"margin-top": 0}, 300).addClass("show");
  }
});

//reset window if resized to undo toggled states and changes
$(window).resize(function() {
  if($(window).width() > 750) {
    $("#side-menu").css({"margin-top": 0}).addClass("show");
    $(".navbar-lists").css({height: 0}, 200).addClass("hide");
  }
});
