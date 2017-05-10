// this file describes all ui interaction functionality

//make list able to be reordered by dragging
var elem = document.getElementById("waypoints");
var editableList = Sortable.create(elem, {
  filter: '.remove-point',
  onFilter: function (evt) {
    var el = editableList.closest(evt.item); // get dragged item
    el && el.parentNode.removeChild(el);
  }
});

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
    $(".fa-caret-square-o-down").removeClass("fa-caret-square-o-down").addClass("fa-caret-square-o-up");
  } else {
    $("#side-menu").animate({"margin-top": 0}, 300).addClass("show");
    $(".fa-caret-square-o-up").removeClass("fa-caret-square-o-up").addClass("fa-caret-square-o-down");
  }
});

//reset window if resized to undo toggled states and changes
$(window).resize(function() {
  if($(window).width() > 750) {
    $("#side-menu").css({"margin-top": 0}).addClass("show");
    $(".fa-caret-square-o-up").removeClass("fa-caret-square-o-up").addClass("fa-caret-square-o-down");
    $(".navbar-lists").css({height: 0}, 200).addClass("hide");
  }
});

$(window).bind("load", function() {
  $(".loader").hide();
  $("#map").animate({opacity:1}, 300);
});
