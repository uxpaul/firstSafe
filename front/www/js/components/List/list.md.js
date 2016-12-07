((app)=>{

  app.config(['$stateProvider', ($stateProvider)=>{
    $stateProvider.state('app.list', {
      url:'/home/{userID}',
      views: {
        'menuContent': {
          template:'<list></list>'
        }
      }
    })
  }])

})(angular.module('app.list', []))
