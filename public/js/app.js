//app.js
(function () {
    "use strict";
    var module = angular.module("loginApp", ["ngRoute", "common.services"]);

    module.config(function ($routeProvider, $httpProvider) {
        $routeProvider.when('/', {
            templateUrl: 'templates/login.tmpl.html',
            controller: 'loginController',
            controllerAs: 'login'
        });

        $routeProvider.when('/users', {
            templateUrl: 'templates/users.tmpl.html',
            controller: 'userController',
            controllerAs: 'user'
        });

        $routeProvider.when('/newUser', {
            templateUrl: 'templates/newUser.html',
            controller: 'regController',
            controllerAs: 'reg'
        });

        $routeProvider.otherwise({redirectTo: '/'});

        $routeProvider.when('/comments', {
            templateUrl: 'templates/Comments.html',
            controller: 'commentController',
            controllerAs: 'com'
        });

        $httpProvider.interceptors.push(function (appSettings, tokenContainer) {
            return {
                'request': function (config) {

                    // if it's a request to the API, we need to provide the
                    // access token as bearer token.
                    if (config.url.indexOf(appSettings.userAPI) === 0) {
                        config.headers.Authorization = 'Bearer ' + tokenContainer.getToken().token;
                    }

                    return config;
                }

            };
        });

    });
})();
