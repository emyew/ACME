// create list and send to database
$("#create-list").click(function() {
  // gather data
  var title = $("#trip-name").val();
  var desc = $("#trip-desc").val();
  var locations = [];
  $("#waypoints").children().each(function() {
    locations.push({
      name: $(this).attr("name"),
      address: $(this).attr("data-value")
    });
  });
  var tags = $("#trip-tags").val().split(",");

  // create payload
  var postObj = {
    title: title,
    description: desc,
    locations: locations,
    tags: tags
  };

  // send post req
  $.ajax('/newList', {
    data: JSON.stringify(postObj),
    contentType: 'application/json',
    type: 'POST'
  }).done(function(res) {
    // TODO SHOW SUCCESS FEEDBACK
    window.location.replace(res);
  }).fail(function() {
    // TODO SHOW FAILURE FEEDBACK
    console.log("fail!");
  }).always(function(res) {
    console.log(res.responseText);
  });
});
