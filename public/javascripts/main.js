// assigning handlers to register button to test post
$("#register-submit").click(function() {
    // TODO: check passwords for confirmed
    var name = $("#register-name");
    var email = $("#register-email");
    var password = $("#register-password");


    $.ajax({
        url: '/register',
        type: 'POST',
        data: {
            name: $("#register-name").val(),
            email: $("#register-email").val(),
            password: $("#register-password").val()
        }
    })
    .done(function() {
        console.log("success");
    })
    .fail(function() {
        console.log("error");
    })
    .always(function() {
        console.log("complete");
    });
    ;
});