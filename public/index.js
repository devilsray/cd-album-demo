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
      })
    };
    function setModal(uri, title, id) {
      $.get(uri, function(data) {
        $('.modal-body').html(data);
        $('.modal-title').html(title);
      })
    };