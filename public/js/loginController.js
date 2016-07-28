(function () {
    "use strict";
    angular
        .module("loginApp")
        .controller("loginController",
            ["$http", "tokenContainer",LoginController]);

    function LoginController($http,tokenContainer) {
        var login = this;

        login.loginError = "";
        login.credentials = {
            username: "",
            password: ""
        };

        login.submit = function () {
            login.loginError = "";
            // get the token, using the resource owner password
            // credentials flow

            // the message body
            var dataForBody = "grant_type=password&" +
                "username=" + encodeURI(login.credentials.username) + "&" +
                "password=" + encodeURI(login.credentials.password) + "&" +
                "scope=" + encodeURI("openid") + "&" +
                "client_secret=secret&client_id=Editor";

            // the header
            var messageHeaders = {
                'Content-Type': 'application/x-www-form-urlencoded',
                //'Authorization': 'Basic ' + encodedClientIdAndSecret
            };

            return $http({
                method: 'POST',
                url: "http://localhost:22711/connect/token",
                headers: messageHeaders,
                data: dataForBody
            }).success(function (data) {
                // set the access token
                localStorage["access_token"] = data.access_token;

                // clear un/pw
                login.credentials.username = "";
                login.credentials.password = "";

                // redirect to root
                window.location = window.location.protocol + "//" + window.location.host + "#/users";

            }).error(function (data) {
                // show error on screen
                login.loginError = data.error;

                // clear un/pw
                login.credentials.username = "";
                login.credentials.password = "";
            });
        }

        login.logOut = function(){
            tokenContainer.setToken("");
            localStorage.removeItem('jwtToken');
            localStorage.removeItem('access_token');
            window.location.href = "#/";
        }

        login.logOut();
    }
}());
