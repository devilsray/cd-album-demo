

function setTitlesPage(page) {
  knownIds.length = 0;
  if (typeof (page) === 'undefined') {
    page = 0;
  }
  $.getJSON(
          "/titles?size=5&page=" + page,
          function(data) {
            console.log("processing data");
            var tbl_body = "";
            var odd_even = false;
            $       .each(
                    data._embedded.titles,
                    function(index, value) {
                      knownIds.push(value._links.self.href);
                      var tbl_row = "<td id=\"title-" + (knownIds.length -1) + "\" align=\"center\"><a class=\"btn btn-default\" onclick=\"addTitleToTarget('" + encodeURI(value._links.self.href) + "')\" data-toggle=\"modal\" data-target=\"#myModal\"><em class=\"glyphicon glyphicon-plus-sign\" onclick=\"setModal('/artist-edit.html', 'Künstler anlegen', '/articles/1')\"></em></a>";
                      tbl_row += "</td>";
                          + value._links.self.href + "</td>";
                      tbl_row += "<td role=\"button\" data-toggle=\"modal\" data-target=\"#myModal\" onclick=\"setModal('/title.html', '"
                        + value.label
                        + "', '/titles')\">"
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
                      tbl_body += "<tr data-id=\"" + value._links.self.href + "\">"
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
            $.getJSON($(".target-uri").val(),
                function(data) {
                  var tbl_body = "";
                  var odd_even = false;
                  $       .each(
                          data._embedded.titles,
                          function(index, value) {
                            console.log("searching for id " +value._links.self.href);
                            index = $.inArray(value._links.self.href, knownIds);
                            if (index > -1) {
                               pieces = value._links.self.href.split('/');
                               console.log(pieces);
                              deleteUri = $(".target-uri").val() + "/" + pieces[pieces.length -1];
                              $("#title-" + index).html("<a class=\"btn btn-default\" onclick=\"removeTitleFromTarget('" + encodeURI(deleteUri) + "')\"><em class=\"glyphicon glyphicon-minus-sign\" onclick=\"setModal('/artist-edit.html', 'Künstler anlegen', '/articles/1')\"></em></a>");
                              console.log(typeof(row));
                            }
                          });
                });
          });
};


function addTitleToTarget(artistId) {
  // Get form values from elements on the page:
  var $form = $(this);
  uri = $(".target-uri").val();
  sourceUri = $(".source-uri").val();
    $.ajax({
      type : "PATCH",
      url : uri,
      data : artistId,
      contentType : "text/uri-list; charset=utf-8",
      dataType : "text",
      success : function(data) {
        setContent(sourceUri);
        $('#myModal').modal('hide');
      },
      failure : function(errMsg) {
        alert("Failed generating item"); // some dirty debug
      }
    });
}
function removeTitleFromTarget(uri) {
  // Get form values from elements on the page:
  sourceUri = $(".source-uri").val();
    $.ajax({
      type : "DELETE",
      url : uri,
      contentType : "text/uri-list; charset=utf-8",
      dataType : "text",
      success : function(data) {
        setContent(sourceUri);
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

var knownIds = [];

