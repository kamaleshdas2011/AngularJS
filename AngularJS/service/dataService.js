var module = angular.module('app');

var dataService = function ($http) {
    var baseUrl = 'http://localhost:58120/api/values/';
    var getStates = function () {
        return $http.get(baseUrl + 'getstates')
            .then((response) => {
                return response.data;
            })
    }
    var getCity = function (state) {
        return $http.get(baseUrl + 'getcitybystate/' + state)
            .then((response) => {
                return response.data;
            })
    }
    var getPurulia = function (state) {
        return $http.get('data/purulia.json')
            .then((response) => {
                return response.data;
            })
    }
    var getPlaces = function () {
        return $http.get(baseUrl + 'getplaces')
            .then((response) => {
                //console.log(response.data);
                return response.data;
            })
    }
    var getPlacesById = function (id) {
        return $http.get(baseUrl + 'getplacesbyid/' + id)
            .then((response) => {
                return response.data;
            })
    }
    var getPhotos = function () {
        return $http.get(baseUrl + 'getphotos')
            .then((response) => {
                return response.data;
            })
    }
    var getTopPlaces = function () {
        return $http.get(baseUrl + 'gettopplaces')
            .then((response) => {
                return response.data;
            })
    }
    var getFonts = function () {
        return $http.get(baseUrl + 'getfonts')
            .then((response) => {
                return response.data;
            })
    }
    return {
        getStates: getStates,
        getCity: getCity,
        getPurulia: getPurulia,
        //getTopDest: getTopDest,
        getPlaces: getPlaces,
        getPhotos: getPhotos,
        getTopPlaces: getTopPlaces,
        getPlacesById: getPlacesById,
        getFonts: getFonts
    }

}
var adminService = function ($http) {
    
    var uploadPhoto = function (files, model) {
        return $http({
            method: 'POST',
            url: "http://localhost:58120/api/admin/uploadphoto",
            headers: { 'Content-Type': undefined },
            transformRequest: function (data) {
                var formData = new FormData();
                formData.append("model", angular.toJson(data.model));
                for (var i = 0; i < data.files.length; i++) {
                    formData.append("file" + i, data.files[i]);
                }
                return formData;
            },
            data: { model: model, files: files }
        })
        .then((res) => {
                return res;
            })
    }
    var addPlace = function (data) {
        return $http({
            url: "http://localhost:58120/api/admin/addplace",
            method: 'POST',
            data: data,
        })
            .then((res) => {
                return res;
            })
    }
    var deletePlace = function (data) {
        return $http({
            url: "http://localhost:58120/api/admin/deleteplace/" + data,
            method: 'POST',
        })
            .then((res) => {
                return res;
            })
    }
    var updatePlace = function (data) {
        return $http({
            url: "http://localhost:58120/api/admin/updateplace",
            method: 'POST',
            data: data,
        })
            .then((res) => {
                return res;
            })
    }
    var deletePhoto = function (data) {
        return $http({
            url: "http://localhost:58120/api/admin/deletephoto/" + data,
            method: 'POST',
        })
            .then((res) => {
                return res;
            })
    }

    var updatePhoto = function (files, model) {
        //console.log(files);
        //console.log(model);
        return $http({
            method: 'POST',
            url: "http://localhost:58120/api/admin/updatephoto",
            headers: { 'Content-Type': undefined },
            transformRequest: function (data) {
                var formData = new FormData();
                formData.append("model", angular.toJson(data.model));
                for (var i = 0; i < data.files.length; i++) {
                    formData.append("file" + i, data.files[i]);
                }
                return formData;
            },
            data: { model: model, files: files }
        })
            .then((res) => {
                return res;
            })
    }
    return {
        updatePlace: updatePlace,
        updatePhoto: updatePhoto,
        uploadPhoto: uploadPhoto,
        addPlace: addPlace,
        deletePlace: deletePlace,
        deletePhoto: deletePhoto,
    }
}

module.factory('dataService', dataService);
module.factory('adminService', adminService);