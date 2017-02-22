'use strict';

var app = angular.module('albumsApp');

app.controller('ArtistsCtrl', function($scope, $http) {
    $http.get('/artists?sort=label.dir=DESC').then(function(artistsResponse) {
        $scope.artists = artistsResponse.data._embedded.artists;
    });
    $scope.assignArtistToTitle = function(artist, activeTitle) {
        $('#modalCreateTitle').modal('hide');
        $http({
            method: 'PUT',
            url: activeTitle._links.artist.href,
            data: artist._links.self.href,
            headers: {
                'Content-Type': 'text/uri-list; charset=utf-8'
            }
        }).then(function(result) {
            console.log(result); // TODO handle status
            activeTitle.artist = artist.label;
        }, function(error) {
            console.log(error); // TODO handle status
        });
    };

    $scope.deleteArtist = function(artist) {
        $http.delete(artist._links.self.href)
            .success(function(data, status, headers) {
                var index = $scope.artists.indexOf(artist);
                $scope.artists.splice(index, 1);
                $("#message").alert();
                $("#message").addClass("alert-success");
                $("#messageContent").html("Künstler wurde gelöscht");
                $("#message").fadeTo(2000, 500).slideUp(500, function() {
                    $("#message").slideUp(500);
                    $("#message").removeClass("alert-success");
                });
            })
            .error(function(data, status, header, config) {
                console.log(data);
                $("#message").alert();
                $("#message").addClass("alert-danger");
                $("#messageContent").html("Löschen des Titels nicht möglich. Fehler " + status + " Meldung: " + data.message);
                $("#message").fadeTo(8000, 500).slideUp(500, function() {
                    $("#message").slideUp(500);
                    $("#message").removeClass("alert-danger");
                });
            });
    }
})
