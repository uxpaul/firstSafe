((app)=>{

  app.component('list', {
    templateUrl:'js/components/list/list.html',
    controller:["$stateParams","$http" ,function($stateParams, $http){
      angular.extend(this, {
        $onInit(){


        }
      })
    }]
  })
})(angular.module('app.list'))
