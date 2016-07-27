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


        reg.submitForm = function () {
            var user = {
                "Address": reg.Address,
                "Email": reg.Email,
                "Phone": reg.Phone,
                "Subject": reg.Subject,
                "Name": reg.Name,
                "Password": reg.Password,
                "Username": reg.Email
            };

            console.log(user);

            $http({
                method: 'POST',
                url: appSettings.userAPI + "/api/users",
                data: {
                    "Address": reg.Address,
                    "Email": reg.Email,
                    "Phone": reg.Phone,
                    "Subject": reg.Subject,
                    "Name": reg.Name,
                    "Password": reg.Password,
                    "Username": reg.Email
                },
                headers: $.param({
                    "cache-control": "no-cache",
                    "postman-token": "e15774c8-4b2c-1eb8-d705-05eeebcfc517",
                    "content-type": "application/x-www-form-urlencoded"
                })

            }).success(function (data) {

                console.log("OK", data)

            }).error(function (err) {
                "ERR", console.log(err)
            })
        };
    }
}());

