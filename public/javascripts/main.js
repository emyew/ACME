var elem = document.getElementById("waypoints");
var editableList = Sortable.create(elem, {
  filter: '.remove-point',
  onFilter: function (evt) {
    var el = editableList.closest(evt.item); // get dragged item
    el && el.parentNode.removeChild(el);
  }
});
