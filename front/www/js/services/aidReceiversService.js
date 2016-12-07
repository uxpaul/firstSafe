((app) => {
    'use strict'
    app.service('aidReceiversService', function($http) {
    return {
        get() {
            return $http.get('/api/receivers')
        },
        add(newUser) {
            return $http.post('/api/receivers', newUser)
        },
        edit(selectedUser) {
            return $http.put('/api/receivers/' + selectedUser._id, selectedUser)
        },
        delete(selectedUser) {
            return $http.delete('/api/receivers/' + selectedUser._id)
        }
    }
    })
})(angular.module('app.services'))
