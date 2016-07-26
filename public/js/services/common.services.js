(function () {
    "use strict";

    angular.module("common.services",
        ["ngResource"])
        .constant("appSettings",
            {
                userAPI: "http://localhost:3468"
            });
}());
