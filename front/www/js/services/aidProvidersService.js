((app) => {
    'use strict'
    app.service('aidProvidersService', function($http) {
    return {
        get() {
            return $http.get('/api/providers')
        },
        add(newArticle) {
            return $http.post('/api/providers', newArticle)
        },
        edit(selectedArticle) {
            return $http.put('/api/providers/' + selectedArticle._id, selectedArticle)
        },
        delete(selectedArticle) {
            return $http.delete('/api/providers/' + selectedArticle._id)
        }
    }
    })
})(angular.module('app.services'))
