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