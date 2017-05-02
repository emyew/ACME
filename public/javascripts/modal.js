// this file describes all modal functionality

// function for opening modals
function openModal(modal) {
    $(".modal").removeClass("modal-open");
    modal.addClass("modal-open");
}

// close button handlers
$(".close-modal").click(function() {
    $(".modal").removeClass("modal-open");
})

// close on clicking modal background
$(".modal-inner").click(function() {
    $(".modal").removeClass("modal-open");
});

// prevent modal child from closing
$(".modal-content").click(function(e) {
    e.stopPropagation();
});