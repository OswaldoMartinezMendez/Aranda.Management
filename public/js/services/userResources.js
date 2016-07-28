(function () {
    "use strict";

    angular
        .module("common.services")
        .factory("userResource",
            ["$resource",
                "appSettings",
                userResource])

    function userResource($resource, appSettings) {
        return { currentUser : $resource(appSettings.userAPI + "/api/Users",null,{'get' : { method: 'GET' }}),
                 allUsers : $resource(appSettings.userAPI + "/api/allUsers")
                };
    };

}());