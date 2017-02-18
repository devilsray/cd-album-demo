$('.navbar li').click(function(e) {
  $('.navbar li.active').removeClass('active');
  var $this = $(this);
  if (!$this.hasClass('active')) {
    $this.addClass('active');
  }
  e.preventDefault();
});
function setContent(uri) {
  $.get(uri, function(data) {
    $('.container').html(data);
    console.log("content is updated from " + uri);
  })
};
function setModal(uri, title, id) {
  $.get(uri, function(data) {
    $('.modal-body').html(data);
    $('.modal-title').html(title);
  })
};

$(document).ready(function() {
  setContent("home.html");
});