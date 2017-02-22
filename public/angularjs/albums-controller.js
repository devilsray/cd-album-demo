'use strict';

var app = angular.module('albumsApp');

app.controller('AlbumsCtrl', function($scope, $http) {
    $scope.selectedAlbumTitlesHrefs = [];
    $http.get('/albums?sort=label', {
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        }
    }).then(function(albumsResponse) {
        $scope.albums = albumsResponse.data._embedded.albums;
        $scope.selectedAlbum = undefined;
        $scope.config = {
            itemsPerPage: albumsResponse.data.size,
            fillLastPage: true
        };

        $scope.loadAlbum = function(album) {
            $scope.selectedAlbum = album;
            $scope.getAlbumTitles(album);
            // TODO load album's albums / rename function
        };
    });

    $scope.showEditModal = function(album) {
        $scope.showTitleAssignment = true;
        $('#modalEditAlbum').modal('show');
    }

    $scope.saveAlbum = function() {
console.log($scope.selectedAlbum);
        if (typeof($scope.selectedAlbum._links) === 'undefined') {
            $scope.createAlbum();
        } else {
            $scope.updateAlbum();
        }
    };

    $scope.createAlbum = function() {
        // $scope.search = $scope.selectedAlbum.label;
        $http.post("/albums", $scope.selectedAlbum)
            .success(function(data, status, headers) {
                $scope.albums.push(data);
                $("#message").alert();
                $("#message").addClass("alert-success");
                $("#messageContent").html("Album wurde erstellt");
                $scope.selectedAlbum = {};
                $scope.loadAlbum(data);
                $scope.showEditModal(data);
                // $('#modalEditAlbum').modal('hide');
                $("#message").fadeTo(2000, 500).slideUp(500, function() {
                    $("#message").slideUp(500);
                    $("#message").removeClass("alert-success");
                    $scope.$apply();
                });
            })
            .error(function(data, status, header, config) {
                $("#message").alert();
                $("#message").addClass("alert-error");
                $("#messageContent").html("Erstellen des Albums nicht möglich. Fehler " + status + " Meldung: " + data.message);
                $("#message").fadeTo(2000, 500).slideUp(500, function() {
                    $("#message").slideUp(500);
                    $("#message").removeClass("alert-error");
                });
            });
    };

    $scope.updateAlbum = function() {
        $http.put($scope.selectedAlbum._links.self.href, $scope.selectedAlbum)
            .success(function(data, status, headers) {
                $("#message").alert();
                $("#message").addClass("alert-success");
                $("#messageContent").html("Album wurde erstellt");
                $('#modalEditAlbum').modal('hide');
                $("#message").fadeTo(2000, 500).slideUp(500, function() {
                    $("#message").slideUp(500);
                    $("#message").removeClass("alert-success");
                });
            })
            .error(function(data, status, header, config) {
                $("#message").alert();
                $("#message").addClass("alert-error");
                $("#messageContent").html("Erstellen des Albums nicht möglich. Fehler " + status + " Meldung: " + data.message);
                $("#message").fadeTo(2000, 500).slideUp(500, function() {
                    $("#message").slideUp(500);
                    $("#message").removeClass("alert-error");
                });
            });
    };

    $scope.getAlbumTitles = function(album) {
        $http.get(album._links.titles.href).then(function(titlesResponse) {
          console.log(titlesResponse.data);
            $scope.selectedAlbumTitles = titlesResponse.data._embedded.titles;
              $scope.selectedAlbumTitlesHrefs = [];
              $scope.selectedAlbumTitles.forEach(function(title) {
                $scope.selectedAlbumTitlesHrefs.push(title._links.self.href);
            });
        });
    };
});
