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

    var createJsonPatchDocument = function (data) {

        // create a JsonPatchDocument for the resource - the only
        // thing that can be updated in this specific case is the
        // isPublic boolean.

        var dataToSend = "[{op: 'replace', path: '/isPublic', value: '" + !data["isPublic"] + "'}]";
        return dataToSend;
    }

}());