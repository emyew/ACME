// this file describes all ui interaction functionality
var pathname = window.location.pathname;
var MAP = "/";
var EXPLORE = "/explore";
var CREATE = "/create";

//////////////////// MAP ////////////////////
if (pathname == MAP || pathname == CREATE) {
  //make list able to be reordered by dragging
  if ($("#waypoints").hasClass("sortable-waypoints")) {
    var elem = document.getElementById("waypoints");
    var editableList = Sortable.create(elem, {
      filter: '.remove-point',
      onFilter: function (evt) {
        var el = editableList.closest(evt.item); // get dragged item
        el && el.parentNode.removeChild(el);
      }
    });
  }

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

  //tagging functionality
  $('#trip-tags').selectize({
      plugins: ['remove_button'],
      delimiter: ',',
      persist: false,
      maxItems: 12,
      create: function(input) {
          return {
              value: input,
              text: input
          }
      }
  });
}

//reset window if resized to undo toggled states and changes
$(window).resize(function() {
  if($(window).width() > 750) {
    $(".navbar-lists").css({height: 0}, 200).addClass("hide");
    if(pathname == MAP) {
      $("#side-menu").css({"margin-top": 0}).addClass("show");
      $(".fa-caret-square-o-up").removeClass("fa-caret-square-o-up").addClass("fa-caret-square-o-down");
    }
  }
});
