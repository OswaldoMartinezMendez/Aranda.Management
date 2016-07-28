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

            // RFC requirements: when clientid/secret are provided,
            // they must be sent through the Authorization header.
            // cfr:https://tools.ietf.org/html/rfc6749#section-4.3

            // encode the client id & client secret (btoa = built-in function
            // for Base64 encoding)
            //var encodedClientIdAndSecret = btoa("client_secret:secret");

            // the header
            var messageHeaders = {
                'Content-Type': 'application/x-www-form-urlencoded',
                //'Authorization': 'Basic ' + encodedClientIdAndSecret
            };

            //debugger;

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
                console.log(localStorage["access_token"]);
                window.location = window.location.protocol + "//" + window.location.host + "#/users";
                //login.$apply(function() { $location.path("/users"); });

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
