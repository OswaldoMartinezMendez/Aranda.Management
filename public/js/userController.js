(function () {
    "use strict";
    angular
        .module("loginApp")
        .controller("userController",
            ["userResource", userController]);

    function userController(userResource) {
        var user = this;
        user.loadUsers = function () {
            userResource.get(function (value) {
                user.user = value;
            },function (error) {
                user.users = error;
                window.location = window.location.protocol + "//" + window.location.host + "#/";
            });


            console.log(user.users);
        }

        user.loadUsers();
    }
}());
