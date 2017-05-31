// this file describes all ui interaction functionality
var pathname = window.location.pathname;
var search = window.location.search;
var MAP = /list\/?[a-z0-9]+$/i;
var EXPLORE = "/explore";
var CREATE = "/create";
var MYLISTS = "/mylists";
var FAVORITES = "/favorites";
var PROFILE = "/profile";
var EDIT = /edit\/?[a-z0-9]+$/i;

//////////////////// MAP ////////////////////
if (MAP.test(pathname) || EDIT.test(pathname) || pathname == CREATE) {
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
}

  //tagging functionality
  if (MAP.test(pathname)) {
    Selectize.define('no-delete', function(options) {
      this.deleteSelection = function() {};
    });
    var trip_tag_list = $("#trip-tags").val();
    if (trip_tag_list) {
      trip_tag_list = trip_tag_list.split('#').pop().join('#');
      $("#trip-tags").val(trip_tag_list);
      // $("#trip-tags").val(trip_tag_list.substr(0, trip_tag_list.length-1));
    }
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
  else if (EDIT.test(pathname)) {
    var trip_tag_list = $("#trip-tags").val();
    if (trip_tag_list) {
      trip_tag_list = trip_tag_list.split('#').pop().join('#');
      $("#trip-tags").val(trip_tag_list);
      // $("#trip-tags").val(trip_tag_list.substr(0, trip_tag_list.length-1));
    }
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
  else if (pathname == EXPLORE) {
    var cardlist = new List('explore-content', {
      valueNames: [
        'trip',
        'description',
        'tags',
        'author',
        'locations',
        'url',
        'favcount',
        'date-made',
        'date-update'
      ],
      insensitive: true,
      page: 9,
      pagination: [{
        name: "paginationTop",
        paginationClass: "paginationTop",
        outerWindow: 2
      }, {
        paginationClass: "paginationBottom",
        innerWindow: 3,
        left: 2,
        right: 4
      }]
    });
  }
  else if (pathname == PROFILE) {
    if (search == "?page=bio") {
      $("#edit-password-form").hide();
      $("#edit-email-form").hide();
    }
    else if (search == "?page=email") {
      $("#edit-bio-form").hide();
      $("#edit-password-form").hide();
    }
    else if (search == "?page=password") {
      $("#edit-bio-form").hide();
      $("#edit-email-form").hide();
    }
  }

  //reset window if resized to undo toggled states and changes
  $(window).resize(function() {
    if($(window).width() > 900) {
      if(MAP.test(pathname) || EDIT.test(pathname) || pathname == CREATE) {
        $("#side-menu").css({"margin-top": 0}).addClass("show");
        $(".fa-caret-square-o-up").removeClass("fa-caret-square-o-up").addClass("fa-caret-square-o-down");
      }
    }
  });
