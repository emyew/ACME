// this file describes all ui interaction functionality
var pathname = window.location.pathname;
var MAP = /list\/?[a-z0-9]+$/i;
var EXPLORE = "/explore";
var CREATE = "/create";

//////////////////// MAP ////////////////////
if (MAP.test(pathname) || pathname == CREATE) {
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
  if (MAP.test(pathname)) {
    Selectize.define('no-delete', function(options) {
      this.deleteSelection = function() {};
    });
    var trip_tag_list = $("#trip-tags").val();
    $("#trip-tags").val(trip_tag_list.substr(0, trip_tag_list.length-1));
    $('#trip-tags').selectize({
      plugins: {
        'no-delete': {}
      },
      delimiter: ',',
      persist: false,
      create: function(input) {
        return {
          value: input,
          text: input
        }
      }
    });
    document.getElementById('trip-tags-selectized').readOnly = true;
  }
  else if (pathname == CREATE) {
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
}
else if (pathname == EXPLORE) {
  var jets = new Jets({
    searchTag: '#search',
    contentTag: '#card-container',
    hideBy: 'opacity: 0; transition: all .2s ease-in-out;',
    searchSelector: '*'
  });
}

//reset window if resized to undo toggled states and changes
$(window).resize(function() {
  if($(window).width() > 900) {
    $(".navbar-lists").css({height: 0}, 200).addClass("hide");
    if(MAP.test(pathname) || pathname == CREATE) {
      $("#side-menu").css({"margin-top": 0}).addClass("show");
      $(".fa-caret-square-o-up").removeClass("fa-caret-square-o-up").addClass("fa-caret-square-o-down");
    }
  }
});
