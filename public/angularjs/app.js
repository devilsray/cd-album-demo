'use strict';

$(document).ready (function(){
  $("#message").hide();
})
var app = angular.module('albumsApp', [ 'ngAnimate', 'ngRoute' ]).config(function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl : '/home.html'
  }).when('/albums', {
    templateUrl : 'angularjs/albums.html'
  }).when('/titles', {
    templateUrl : 'angularjs/titles.html'
  }).when('/artists', {
    templateUrl : 'angularjs/artists.html'
  }).otherwise({
    redirectTo : '/home'
  });
}).factory('Cart', function() {
  var items = [];
  return {
    getItems : function() {
      return items;
    },
    addArticle : function(article) {
      items.push(article);
    },
    sum : function() {
      return items.reduce(function(total, article) {
        return total + article.price;
      }, 0);
    }
  };
}).controller('AlbumsCtrl', function($scope, $http, CurrentAlbum) {
  $http.get('/albums?sort=label', {
    headers : {
      'Content-Type' : 'application/json; charset=UTF-8'
    }
  }).then(function(albumsResponse) {
    $scope.albums = albumsResponse.data._embedded.albums;
    $scope.selectedAlbum = undefined;
    CurrentAlbum.setAlbum(undefined);
    $scope.config = {
      itemsPerPage : albumsResponse.data.size,
      fillLastPage : true
    };
    $scope.isActive = function(album) {
      if (typeof ($scope.selectedAlbum) === 'undefined')
        return;
      var active = (album._links.self.href === $scope.selectedAlbum._links.self.href);
      return active;
    };
    $scope.loadAlbum = function(album) {
      $scope.selectedAlbum = album;
      CurrentAlbum.setAlbum(album);
      // TODO load album's titles / rename function
    };
  });
}).controller('TitlesCtrl', function($scope, $http) { // TODO ompimize to not
                                                      // spam the ram. Remove
                                                      // older emelemts from
                                                      // list
  $scope.page = -1;
  $scope.titles = [];
  $scope.activeTitle = {};
  $scope.loadMoreRecords = function() {
    $scope.page++;
    $http.get('/titles?sort=label&size=20&page=' + $scope.page).then(function(titlesResponse) {
      $scope.titles.push.apply($scope.titles, (titlesResponse.data._embedded.titles));
    });
  }
  $scope.loadMoreRecords();
  
  $scope.deleteTitle = function (title) {
    $http.delete(title._links.self.href)
    .success(function (data, status, headers) {
      var index = $scope.titles.indexOf(title);
      $scope.titles.splice(index, 1);
      $("#message").alert();
      $("#message").addClass("alert-success");
      $("#messageContent").html("Titel wurde gelöscht");
      $("#message").fadeTo(2000, 500).slideUp(500, function(){
      $("#message").slideUp(500);
      $("#message").removeClass("alert-success");
      });
    })
    .error(function (data, status, header, config) {
      console.log(data);
        $("#message").alert();
        $("#message").addClass("alert-error");
        $("#messageContent").html("Löschen des Titels nicht möglich. Fehler " + status + " Meldung: " + data.message);
        $("#message").fadeTo(2000, 500).slideUp(500, function(){
        $("#message").slideUp(500);
        $("#message").removeClass("alert-error");
        });
    });
  };
  
  $scope.saveTitle = function () {
    if (typeof($scope.activeTitle._links) === 'undefined') {
      $scope.createTitle();
    } else {
      $scope.updateTitle();
    }
  };
  
  $scope.createTitle = function () {
    $http.post("/titles", $scope.activeTitle)
    .success(function (data, status, headers) {
      $scope.titles.push(data);
      $("#message").alert();
      $("#message").addClass("alert-success");
      $("#messageContent").html("Titel wurde erstellt");
      $('#modalCreateTitle').modal('hide');
      $("#message").fadeTo(2000, 500).slideUp(500, function(){
        $("#message").slideUp(500);
        $("#message").removeClass("alert-success");
        $scope.$apply();
        $scope.activeTitle = {};
      });
    })
    .error(function (data, status, header, config) {
        $("#message").alert();
        $("#message").addClass("alert-error");
        $("#messageContent").html("Erstellen des Titels nicht möglich. Fehler " + status + " Meldung: " + data.message);
        $("#message").fadeTo(2000, 500).slideUp(500, function(){
        $("#message").slideUp(500);
        $("#message").removeClass("alert-error");
        });
    });
  };
  
  $scope.updateTitle = function () {
    $http.put($scope.activeTitle._links.self.href, $scope.activeTitle)
    .success(function (data, status, headers) {
      $scope.activeTitle = {};
      $("#message").alert();
      $("#message").addClass("alert-success");
      $("#messageContent").html("Titel wurde erstellt");
      $('#modalCreateTitle').modal('hide');
      $("#message").fadeTo(2000, 500).slideUp(500, function(){
        $("#message").slideUp(500);
        $("#message").removeClass("alert-success");
        $scope.$apply();
      });
    })
    .error(function (data, status, header, config) {
        $("#message").alert();
        $("#message").addClass("alert-error");
        $("#messageContent").html("Erstellen des Titels nicht möglich. Fehler " + status + " Meldung: " + data.message);
        $("#message").fadeTo(2000, 500).slideUp(500, function(){
        $("#message").slideUp(500);
        $("#message").removeClass("alert-error");
        });
    });
  };
}).controller('AlbumTitlesCtrl', function($scope, $http, CurrentAlbum) {
  $scope.$watch(function() {
    return CurrentAlbum.getAlbum();
  }, function(album) {
    if (typeof (album) === 'undefined')
      return;
    $scope.number = album;
    $http.get(album._links.titles.href).then(function(titlesResponse) {
      $scope.albumTitles = titlesResponse.data._embedded.titles;
    });
  });

}).controller('ArtistsCtrl', function($scope, $http) {
  $http.get('/artists?sort=label.dir=DESC').then(function(artistsResponse) {
    $scope.artists = artistsResponse.data._embedded.artists;
  });
  
  $scope.deleteArtist = function (artist) {
    $http.delete(artist._links.self.href)
    .success(function (data, status, headers) {
      var index = $scope.artists.indexOf(artist);
      $scope.artists.splice(index, 1);
      $("#message").alert();
      $("#message").addClass("alert-success");
      $("#messageContent").html("Künstler wurde gelöscht");
      $("#message").fadeTo(2000, 500).slideUp(500, function(){
      $("#message").slideUp(500);
      $("#message").removeClass("alert-success");
      });
    })
    .error(function (data, status, header, config) {
      console.log(data);
        $("#message").alert();
        $("#message").addClass("alert-danger");
        $("#messageContent").html("Löschen des Titels nicht möglich. Fehler " + status + " Meldung: " + data.message);
        $("#message").fadeTo(8000, 500).slideUp(500, function(){
        $("#message").slideUp(500);
        $("#message").removeClass("alert-danger");
        });
    });
  }
});
app.factory("CurrentAlbum", function() {
  var album;
  function getAlbum() {
    return album;
  }
  function setAlbum(newAlbum) {
    album = newAlbum;
  }
  return {
    getAlbum : getAlbum,
    setAlbum : setAlbum,
  }
});

app.directive('lazyLoad', function() {
  return {
    restrict : 'A',
    link : function(scope, elem) {
      var scroller = elem[0]
      $(scroller).bind('scroll', function() {
        if (scroller.scrollTop + scroller.offsetHeight >= scroller.scrollHeight) {
          scope.$apply('loadMoreRecords()')
        }
      })
    }
  }
});
