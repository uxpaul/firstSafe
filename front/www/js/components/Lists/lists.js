((app)=>{

  app.component('lists', {
    templateUrl:'js/components/lists/lists.html',
    controller:["$stateParams","$scope","$http" ,function($stateParams, $http, $scope){
      angular.extend(this, {
        $onInit(){

          $scope.playlists = [
            { title: 'Reggae', id: 1 },
            { title: 'Chill', id: 2 },
            { title: 'Dubstep', id: 3 },
            { title: 'Indie', id: 4 },
            { title: 'Rap', id: 5 },
            { title: 'Cowbell', id: 6 }
          ];

        }
      })
    }]
  })
})(angular.module('app.lists'))
