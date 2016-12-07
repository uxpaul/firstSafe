((app) => {
    'use strict'
    app.service('usersService', function($http) {
    return {
        get() {
            return $http.get('/api/users')
        },
        add(newUser) {
            return $http.post('/api/users', newUser)
        },
        edit(selectedUser) {
            return $http.put('/api/users/' + selectedUser._id, selectedUser)
        },
        delete(selectedUser) {
            return $http.delete('/api/users/' + selectedUser._id)
        }
    }
    })
})(angular.module('app.services'))
