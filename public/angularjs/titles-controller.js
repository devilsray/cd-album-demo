'use strict';

var app = angular.module('albumsApp');

app.controller('TitlesCtrl', function($scope, $http) { // TODO ompimize to not
    // spam the ram. Remove
    // older emelemts from
    // list
    $scope.page = -1;
    $scope.titles = [];
    $scope.buffer = {};
    $scope.activeTitle = {}
    $scope.loadMoreRecords = function() {
        $scope.page++;
        $http.get('/titles?sort=label&size=200&page=' + $scope.page).then(function(titlesResponse) { // TODO
            // add
            // filtering
            // and
            // better
            // preloading
            $scope.titles.push.apply($scope.titles, (titlesResponse.data._embedded.titles));
        });
    }
    $scope.loadMoreRecords();

    $scope.showEditModal = function(title) {
        $scope.activeTitle = title;
        console.log($scope.activeTitle);
        $scope.showArtistAssignment = true;
        $('#modalCreateTitle').modal('show');
    }

    $scope.deleteTitle = function(title) {
        $http.delete(title._links.self.href)
            .success(function(data, status, headers) {
                var index = $scope.titles.indexOf(title);
                $scope.titles.splice(index, 1);
                $("#message").alert();
                $("#message").addClass("alert-success");
                $("#messageContent").html("Titel wurde gelöscht");
                $("#message").fadeTo(2000, 500).slideUp(500, function() {
                    $("#message").slideUp(500);
                    $("#message").removeClass("alert-success");
                });
            })
            .error(function(data, status, header, config) {
                console.log(data);
                $("#message").alert();
                $("#message").addClass("alert-error");
                $("#messageContent").html("Löschen des Titels nicht möglich. Fehler " + status + " Meldung: " + data.message);
                $("#message").fadeTo(2000, 500).slideUp(500, function() {
                    $("#message").slideUp(500);
                    $("#message").removeClass("alert-error");
                });
            });
    };

    $scope.getArtist = function(title) {
        $http.get(title._links.artist.href).then(function(titlesResponse) {
            title.artist = titlesResponse.data.label;
        });
    }

    $scope.saveTitle = function() {
        if (typeof($scope.activeTitle._links) === 'undefined') {
            $scope.createTitle();
        } else {
            $scope.updateTitle();
        }
    };

    $scope.createTitle = function() {
        $scope.search = $scope.activeTitle.label;
        $http.post("/titles", $scope.activeTitle)
            .success(function(data, status, headers) {
                $scope.titles.push(data);
                $("#message").alert();
                $("#message").addClass("alert-success");
                $("#messageContent").html("Titel wurde erstellt");
                $('#modalCreateTitle').modal('hide');
                $("#message").fadeTo(2000, 500).slideUp(500, function() {
                    $("#message").slideUp(500);
                    $("#message").removeClass("alert-success");
                    $scope.$apply();
                    $scope.activeTitle = {};
                });
            })
            .error(function(data, status, header, config) {
                $("#message").alert();
                $("#message").addClass("alert-error");
                $("#messageContent").html("Erstellen des Titels nicht möglich. Fehler " + status + " Meldung: " + data.message);
                $("#message").fadeTo(2000, 500).slideUp(500, function() {
                    $("#message").slideUp(500);
                    $("#message").removeClass("alert-error");
                });
            });
    };

    $scope.updateTitle = function() {
        $http.put($scope.activeTitle._links.self.href, $scope.activeTitle)
            .success(function(data, status, headers) {
                $scope.activeTitle = {};
                $("#message").alert();
                $("#message").addClass("alert-success");
                $("#messageContent").html("Titel wurde erstellt");
                $('#modalCreateTitle').modal('hide');
                $("#message").fadeTo(2000, 500).slideUp(500, function() {
                    $("#message").slideUp(500);
                    $("#message").removeClass("alert-success");
                    $scope.$apply();
                });
            })
            .error(function(data, status, header, config) {
                $("#message").alert();
                $("#message").addClass("alert-error");
                $("#messageContent").html("Erstellen des Titels nicht möglich. Fehler " + status + " Meldung: " + data.message);
                $("#message").fadeTo(2000, 500).slideUp(500, function() {
                    $("#message").slideUp(500);
                    $("#message").removeClass("alert-error");
                });
            });
    };

    $scope.isTitleInMap = function(title, titleNames) {
        return titleNames.indexOf(title._links.self.href) > -1;
    };

    $scope.assignTitleToAlbum = function(title, selectedAlbum, selectedAlbumTitles, selectedAlbumTitlesHrefs) {
        // $('#modalEditAlbum').modal('hide');
        $http({
            method: 'PATCH',
            url: selectedAlbum._links.titles.href,
            data: title._links.self.href,
            headers: {
                'Content-Type': 'text/uri-list; charset=utf-8'
            }
        }).then(function(result) {
            console.log(result); // TODO handle status
            selectedAlbumTitles.push(title);
            selectedAlbumTitlesHrefs.push(title._links.self.href);
        }, function(error) {
            console.log(error); // TODO handle status
        });
    }

    $scope.removeTitleFromAlbum = function(title, selectedAlbum, selectedAlbumTitles, selectedAlbumTitlesHrefs) {
        console.log(selectedAlbumTitles);
    // $('#modalEditAlbum').modal('hide');
    // TODO remove title from array
    var pieces = title._links.self.href.split('/');
    var deleteUri = selectedAlbum._links.titles.href + "/" + pieces[pieces.length - 1];
    $http({
        method: 'DELETE',
        url: deleteUri,
        data: title._links.self.href,
        headers: {
            'Content-Type': 'text/uri-list; charset=utf-8'
        }
    }).then(function(result) {
        console.log(result); // TODO handle status
        var index = -1;
        selectedAlbumTitles.forEach(function(selectedAlbumTitle) {
            if (selectedAlbumTitle._links.self.href === title._links.self.href) {
                index = selectedAlbumTitles.indexOf(selectedAlbumTitle);
            }
        });
        if (index > -1) {
          selectedAlbumTitles.splice(index, 1);
        }
        index = selectedAlbumTitlesHrefs.indexOf(title._links.self.href);
        if (index > -1) {
          selectedAlbumTitlesHrefs.splice(index, 1);
        }
    }, function(error) {
        console.log(error); // TODO handle status
    });
}
})
