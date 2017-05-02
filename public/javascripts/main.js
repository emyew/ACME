console.log("Hello world!");

// login link opens login modal
$("#navbar-login").click(function() {
    openModal($("#modal-login"));
});

$("#link-register").click(function() {
    openModal($("#modal-register"));
})