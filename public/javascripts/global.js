console.log("This is a JS file global across all pages.");

// confirm password handler
var pw = $("#register-password");
var confirmpw = $("#register-confirm");
function confirmPassword() {
    if (pw.val() != confirmpw.val()) {
        confirmpw[0].setCustomValidity("Passwords don't match!");
    } else {
        confirmpw[0].setCustomValidity("");
    }
}
pw.on("change", confirmPassword);
confirmpw.on("keyup", confirmPassword);

/*********** Navbar Functionality ************/
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

/*********** Loader Functionality ************/
$(window).bind("load", function() {
  $.when( $(".loader").animate({"opacity":0}, 300) ).then(function () {
    $(".loader").hide();
  });
});
