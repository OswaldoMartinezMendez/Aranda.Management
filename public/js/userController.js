(function () {
    "use strict";
    angular
        .module("loginApp")
        .controller("userController",
            ["userResource", "$http", "appSettings", userController]);

    function userController(userResource, $http, appSettings) {
        var user = this;
        user.user = "Anybody";
        user.current = function () {
            userResource.currentUser.get(function (value) {
                user.user = value;
            }, function (error) {
                user.user = error;
                //window.location = window.location.protocol + "//" + window.location.host + "#/Users";
            });
        };

        user.loadUsers = function () {
            $http({
                async: true,
                crossDomain: true,
                method: 'GET',
                url: appSettings.userAPI + "/api/allUsers",
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
            }).success(function (data) {
                user.Users = data;
            }).error(function (err) {
                "ERR", console.log(err)
            });
        };

        user.removeUser = function (id) {
            $http({
                async: true,
                crossDomain: true,
                method: 'DELETE',
                url: appSettings.userAPI + "/api/users?iduser=" + id,
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
            }).success(function (data) {
                user.Users = data;
                user.loadUsers();
            }).error(function (err) {
                "ERR", console.log(err)
            });
        };

        user.current();
        user.loadUsers();
    };

}());
