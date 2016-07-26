(function () {
    "use strict";

    angular
        .module("common.services")
        .factory("userResource",
            ["$resource",
                "appSettings",
                userResource])

    function userResource($resource, appSettings) {
        return $resource(appSettings.userAPI + "/api/profiles",null,{
            'get' : { method: 'GET' }
        });
    };

    var createJsonPatchDocument = function (data) {

        // create a JsonPatchDocument for the resource - the only
        // thing that can be updated in this specific case is the
        // isPublic boolean.

        var dataToSend = "[{op: 'replace', path: '/isPublic', value: '" + !data["isPublic"] + "'}]";
        return dataToSend;
    }

}());