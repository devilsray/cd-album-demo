

function setAlbumsPage(page) {
  if (typeof (page) === 'undefined') {
    page = 0;
  }
  $
      .getJSON(
          "/albums?size=5&page=" + page,
          function(data) {
            var tbl_body = "";
            var odd_even = false;
            $
                .each(
                    data._embedded.albums,
                    function(index, value) {
                      var tbl_row = "<td align=\"center\"><a class=\"btn btn-default\" onclick=\"editAlbum('" + encodeURI(value._links.self.href) + "')\" data-toggle=\"modal\" data-target=\"#myModal\"><em class=\"glyphicon glyphicon-pencil\" onclick=\"setModal('/album-edit.html', 'Album anlegen', '/articles/1')\"></em></a>";
                      tbl_row += "<a class=\"btn btn-danger\" onclick=\"deleteAlbum('" + encodeURI(value._links.self.href) + "', '" + page + "')\"><em class=\"glyphicon glyphicon-trash\"></em></a></td>";
                      tbl_row += "<td class=\"hidden\" onclick=\"setModal('/album-edit.html', 'Album anlegen', '/articles')\">"
                          + value._links.self.href + "</td>";
                      tbl_row += "<td role=\"button\" data-toggle=\"modal\" data-target=\"#myModal\" onclick=\"setModal('/album.html', '"
                          + value.label
                          + "', '/articles')\">"
                          + value.label
                          + "</td>";
                      var titles = 0;
                      jQuery.ajax({
                        url : value._links.titles.href,
                        success : function(result) {
                          if (result.isOk == false) {
                            alert(result.message);
                          } else {
                            titles = result._embedded.titles.length;
                          }
                        },
                        async : false
                      });
                      tbl_row += "<td onclick=\"setModal('/album-edit.html', 'Album anlegen', '/articles')\">"
                          + titles + "</td>";
                      $.getJSON(value._links.titles.href, function(response) {
                        $(".albumsTable").html(tbl_body);
                      });
                      var year = (value.year === null ? "-" : value.year);
                      tbl_row += "<td onclick=\"setModal('/album-edit.html', 'Album anlegen', '/articles')\">"
                          + year + "</td>";
                      tbl_body += "<tr id=\"" + value._links.self.hre
                          + "\" data-id=\"" + value._links.self.href + "\">"
                          + tbl_row + "</tr>";
                    });
            $(".albumsTable").html(tbl_body);
            console.log(data.page);
            if (data.page.number === 0) {
              $('#albums-page-before').addClass('disabled');
              $('#albums-page-first').addClass('disabled');
            } else {
              $('#albums-page-before').attr('page', data.page.number - 1);
              $('#albums-page-before').removeClass('disabled');
              $('#albums-page-first').removeClass('disabled');
            }

            if (data.page.number == data.page.totalPages - 1 || data.page.totalElements === 0) {
              $('#albums-page-next').addClass('disabled');
              $('#albums-page-last').addClass('disabled');
            } else {
              $('#albums-page-next').attr('page', data.page.number + 1);
              $('#albums-page-next').removeClass('disabled');
              $('#albums-page-last').attr('page', data.page.totalPages - 1);
              $('#albums-page-last').removeClass('disabled');
            }
            $('[data-toggle=confirmation]').confirmation({
              rootSelector: '[data-toggle=confirmation]',
              container: 'body'
            });
          });
};

function editAlbum(albumId) {

  $.get("album-edit.html", function(data) {
    $('.modal-body').html(data);
    $('.modal-title').html("Album bearbeiten");
    $.get(albumId, function(data) {
      $('#album-edit-id').val(albumId);
      $('#album-edit-label').val(data.label);
      $('#album-edit-description').val(data.description);
      $('#album-edit-year').val(data.year);
    });
  });

}

function deleteAlbum(id, page) {
  $.ajax({
    url: id,
    type: 'DELETE',
    success: function(result) {
      setAlbumsPage(page);
    }
});
};

$(document).ready(function() {

  $('.albums-pagination').click(function(e) {

    var $this = $(this);
    setAlbumsPage($this.attr("page"));
  });
  setAlbumsPage(0);
});
