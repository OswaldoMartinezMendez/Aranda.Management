(function () {
    "use strict";
    angular
        .module("loginApp")
        .controller("regController",
            ["$http", "appSettings", regController]);

    function regController($http, appSettings) {
        var reg = this;

        // reg.Name = "";
        // reg.Address = "";
        // reg.Phone = "";
        // reg.Subject = "";
        // reg.Email = "";
        // reg.Password = "";

        reg.getComments = function () {
            $http({
                method: 'POST',
                url: appSettings.userAPI + "/api/users",
                data: $.param({
                    "Address": reg.Address,
                    "Email": reg.Email,
                    "Phone": reg.Phone,
                    "Subject": reg.Subject,
                    "Name": reg.Name,
                    "Password": reg.Password,
                    "Username": reg.Email
                }),
                headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
            }).success(function (data) {
                console.log("OK", data);
                window.location = window.location.protocol + "//" + window.location.host + "#/users";
            }).error(function (err) {
                "ERR", console.log(err)
            })
        };
    }
}());

