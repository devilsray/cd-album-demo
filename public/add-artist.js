

function setArtistsPage(page) {
  if (typeof (page) === 'undefined') {
    page = 0;
  }
  $
      .getJSON(
          "/artists?size=5&page=" + page,
          function(data) {
            var tbl_body = "";
            var odd_even = false;
            $
                .each(
                    data._embedded.artists,
                    function(index, value) {
                      var tbl_row = "<td align=\"center\"><a class=\"btn btn-default\" onclick=\"setArtistToTitle('" + encodeURI(value._links.self.href) + "')\" data-toggle=\"modal\" data-target=\"#myModal\"><em class=\"glyphicon glyphicon-plus-sign\" onclick=\"setModal('/artist-edit.html', 'Künstler anlegen', '/articles/1')\"></em></a>";
                      tbl_row += "</td>";
                      tbl_row += "<td>" + value.label + "</td>";
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
                      tbl_row += "<td>"
                          + titles + "</td>";
                      $.getJSON(value._links.titles.href, function(response) {
                        $(".artistsTable").html(tbl_body);
                      });
                      tbl_body += "<tr id=\"" + value._links.self.hre
                          + "\" data-id=\"" + value._links.self.href + "\">"
                          + tbl_row + "</tr>";
                    });
            $(".artistsTable").html(tbl_body);
            console.log(data.page);
            if (data.page.number === 0) {
              $('#artists-page-before').addClass('disabled');
              $('#artists-page-first').addClass('disabled');
            } else {
              $('#artists-page-before').attr('page', data.page.number - 1);
              $('#artists-page-before').removeClass('disabled');
              $('#artists-page-first').removeClass('disabled');
            }

            if (data.page.number == data.page.totalPages - 1 || data.page.totalElements === 0) {
              $('#artists-page-next').addClass('disabled');
              $('#artists-page-last').addClass('disabled');
            } else {
              $('#artists-page-next').attr('page', data.page.number + 1);
              $('#artists-page-next').removeClass('disabled');
              $('#artists-page-last').attr('page', data.page.totalPages - 1);
              $('#artists-page-last').removeClass('disabled');
            }
            $('[data-toggle=confirmation]').confirmation({
              rootSelector: '[data-toggle=confirmation]',
              container: 'body'
            });
          });
};

function setArtistToTitle(artistId) {
  // Get form values from elements on the page:
  var $form = $(this);
    url = $(".title-artist-id").val();
    $.ajax({
      type : "PUT",
      url : url,
      data : artistId,
      contentType : "text/uri-list; charset=utf-8",
      dataType : "json",
      success : function(data) {
        setContent("/titles.html");
        $('#myModal').modal('hide');
      },
      failure : function(errMsg) {
        alert("Failed generating item"); // some dirty debug
      }
    });
}

function deleteArtist(id, page) {
  $.ajax({
    url: id,
    type: 'DELETE',
    success: function(result) {
      setArtistsPage(page);
    }
});
};

$(document).ready(function() {

  $('.artists-pagination').click(function(e) {

    var $this = $(this);
    setArtistsPage($this.attr("page"));
  });
  setArtistsPage(0);
});
