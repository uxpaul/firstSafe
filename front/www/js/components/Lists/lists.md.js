((app)=>{

  app.config(['$stateProvider', ($stateProvider)=>{
    $stateProvider.state('app.lists', {
      url:'/home/{userID}',
      views: {
        'menuContent': {
          template:'<lists></lists>'
        }
      }
    })
  }])

})(angular.module('app.lists', []))
