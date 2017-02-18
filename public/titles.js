

function setTitlesPage(page) {
  if (typeof (page) === 'undefined') {
    page = 0;
  }
  $
      .getJSON(
          "/titles?size=5&page=" + page,
          function(data) {
            var tbl_body = "";
            var odd_even = false;
            $
                .each(
                    data._embedded.titles,
                    function(index, value) {
                      var tbl_row = "<td align=\"center\"><a class=\"btn btn-default\" onclick=\"editTitle('" + encodeURI(value._links.self.href) + "')\" data-toggle=\"modal\" data-target=\"#myModal\"><em class=\"glyphicon glyphicon-pencil\" onclick=\"setModal('/title-edit.html', 'Title anlegen', '/articles/1')\"></em></a>";
                      tbl_row += "<a class=\"btn btn-danger\" onclick=\"deleteTitle('" + encodeURI(value._links.self.href) + "', '" + page + "')\"><em class=\"glyphicon glyphicon-trash\"></em></a></td>";
                      tbl_row += "<td class=\"hidden\" onclick=\"setModal('/title-edit.html', 'Titel anlegen', '/titles')\">"
                          + value._links.self.href + "</td>";
                      tbl_row += "<td>"
                        + value.label
                        + "</td>";
                      var artist = "-";
                      if (value._links.artist !== null){
                        jQuery.ajax({
                          url : value._links.artist.href,
                          success : function(result) {
                            if (result.isOk == false) {
                              alert(result.message);
                            } else {
                              artist = result.label;
                            }
                          },
                          async : false
                        });
                      }
                      tbl_row += "<td role=\"button\" data-toggle=\"modal\" data-target=\"#myModal\" onclick=\"showAddArtistModal('/add-artist.html', '"
                        + value.label
                        + "', '" + value._links.artist.href + "')\">"
                        + artist
                        + "</td>";
                      tbl_body += "<tr id=\"" + value._links.self.hre
                          + "\" data-id=\"" + value._links.self.href + "\">"
                          + tbl_row + "</tr>";
                    });
            $(".titlesTable").html(tbl_body);
            console.log(data.page);
            if (data.page.number === 0) {
              $('#titles-page-before').addClass('disabled');
              $('#titles-page-first').addClass('disabled');
            } else {
              $('#titles-page-before').attr('page', data.page.number - 1);
              $('#titles-page-before').removeClass('disabled');
              $('#titles-page-first').removeClass('disabled');
            }

            if (data.page.number == data.page.totalPages - 1 || data.page.totalElements === 0) {
              $('#titles-page-next').addClass('disabled');
              $('#titles-page-last').addClass('disabled');
            } else {
              $('#titles-page-next').attr('page', data.page.number + 1);
              $('#titles-page-next').removeClass('disabled');
              $('#titles-page-last').attr('page', data.page.totalPages - 1);
              $('#titles-page-last').removeClass('disabled');
            }
            $('[data-toggle=confirmation]').confirmation({
              rootSelector: '[data-toggle=confirmation]',
              container: 'body'
            });
          });
};

function showAddArtistModal(uri, title, titleArtistId) {
  $.get(uri, function(data) {
    $('.modal-body').html(data);
    $('.modal-title').html(title);
    $('.title-artist-id').val(titleArtistId);
    
  })
};

function editTitle(titleId) {

  $.get("title-edit.html", function(data) {
    $('.modal-body').html(data);
    $('.modal-title').html("Titel bearbeiten");
    $.get(titleId, function(data) {
      $('#title-edit-id').val(titleId);
      $('#title-edit-label').val(data.label);
      $('#title-edit-description').val(data.description);
      $('#title-edit-year').val(data.year);
    });
  });

}

function deleteTitle(id, page) {
  $.ajax({
    url: id,
    type: 'DELETE',
    success: function(result) {
      setTitlesPage(page);
    }
});
};

$(document).ready(function() {

  $('.titles-pagination').click(function(e) {

    var $this = $(this);
    setTitlesPage($this.attr("page"));
  });
  setTitlesPage(0);
});
