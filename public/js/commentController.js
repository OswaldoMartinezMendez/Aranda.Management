(function () {
    "use strict";
    angular
        .module("loginApp")
        .controller("commentController",
            ["$http", "appSettings", commentController]);

    function commentController($http, appSettings,$modalInstance) {
        var com = this;

        com.getComments = function () {
            $http({
                method: 'GET',
                url: appSettings.userAPI + "/api/Comment",
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
            }).success(function (data) {
                console.log(data);
                com.comments = data;
            }).error(function (err) {
                "ERR", console.log(err)
            })
        };

        com.removeComment = function (id) {
            $http({
                method: 'DELETE',
                url: appSettings.userAPI + "/api/Comment?idcomment=" + id,
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
            }).success(function (data) {
                com.getComments();
                console.log(data);
                com.comments = data;
            }).error(function (err) {
                "ERR", console.log(err)
            })
        };

        com.saveComment = function () {
            var rightNow = new Date();
            var res = rightNow.toISOString().slice(0,10).replace(/-/g,"/");
            $http({
                method: 'POST',
                data: $.param({
                    "Date": res,
                    "Subject": com.Subject,
                    "Phone": com.Phone,
                    "Description": com.Description,
                    "Approved": false
                }),
                url: appSettings.userAPI + "/api/Comment",
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
            }).success(function (data) {
                com.getComments();
                console.log(data);
            }).error(function (err) {
                "ERR", console.log(err)
            })
        };

        com.getComments();
    }
}());

