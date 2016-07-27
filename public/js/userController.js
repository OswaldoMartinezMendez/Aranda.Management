(function () {
    "use strict";
    angular
        .module("loginApp")
        .controller("userController",
            ["userResource", userController]);

    function userController(userResource) {
        var user = this;
        user.user = "Anybody";
        user.current = function () {
            userResource.currentUser.get(function (value) {
                user.user = value;
                console.log("intentanto log");
                //user.loadUsers();
            }, function (error) {
                user.user = error;
                //window.location = window.location.protocol + "//" + window.location.host + "#/Users";
            });
        };

        user.loadUsers = function () {
            userResource.allUsers.get({},function (value) {
                debugger;
                console.log(value);
                user.all = value;
            });
        };

        user.current();
    }
}());
