'use strict';

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
  $http.get('/albums?sort=label.dir=DESC', {
    headers : {
      'Content-Type' : 'application/json; charset=UTF-8'
    }
  }).then(function(albumsResponse) {
    $scope.albums = albumsResponse.data._embedded.albums;
    console.log(albumsResponse.data);
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
      console.log("setting album");
      $scope.selectedAlbum = album;
      CurrentAlbum.setAlbum(album);
      // TODO load album's titles / rename function
    };
  });
}).controller('TitlesCtrl', function($scope, $http) {
  $scope.page = -1;
  $scope.titles = [];
  $scope.loadMoreRecords = function() {
    console.log("loading records");
    $scope.page++;
    $http.get('/titles?sort=label.dir=DESC&size=5&page=' + $scope.page).then(function(titlesResponse) {
      console.log("Length before " + $scope.titles.length);
      console.log(titlesResponse);
      console.log($scope.page);
      $scope.titles.push.apply($scope.titles, (titlesResponse.data._embedded.titles));
      console.log("Length after " + $scope.titles.length);
    });
  }
  // };
  $scope.loadMoreRecords();
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
})
