((app) => {
    'use strict'
    app.service('articlesService', function($http) {
    return {
        get() {
            return $http.get('/api/articles')
        },
        add(newArticle) {
            return $http.post('/api/articles', newArticle)
        },
        edit(selectedArticle) {
            return $http.put('/api/articles/' + selectedArticle._id, selectedArticle)
        },
        delete(selectedArticle) {
            return $http.delete('/api/articles/' + selectedArticle._id)
        }
    }
    })
})(angular.module('app.services'))
