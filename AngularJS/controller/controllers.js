var module = angular.module('app');
const cars = [
    { id: 1, url: '../images/Audi-A4-Wallpapers-36.jpg', title: 'Audi A4', titleColor: 'white', textColor: 'white' },
    { id: 2, url: '../images/Camaro-wallpaper-55.jpg', title: 'Camaro', titleColor: 'white', textColor: 'white' },
    { id: 3, url: '../images/Police-Car-Wallpapers-23.jpg', title: 'Police', titleColor: 'white', textColor: 'white' },
    { id: 4, url: '../images/Audi-Wallpapers-34.jpg', title: 'Audi', titleColor: 'white', textColor: 'white' },
    { id: 5, url: '../images/Audi-Wallpapers-35.jpg', title: 'Audi TT', titleColor: 'grey', textColor: 'grey' },
    { id: 6, url: '../images/Car-Wallpapers-1920x1080-67.jpg', title: 'Police', titleColor: 'orange', textColor: 'orange' },
    { id: 6, url: '../images/Lamborghini-Veneno-wallpaper-77.jpg', title: 'Lamborghini-Veneno', titleColor: 'white', textColor: 'white' },

]
var carController = function ($scope, $rootScope) {
    $scope.cars = angular.copy(cars);
}

var customerController = function ($scope, customer) {
    var onCustomerComplete = function (data) {
        //console.log(data);
        $scope.customers = data;
    }
    var onError = function (error) {
        $scope.error = "Oops!"
        console.log(error);
    }
    customer.getCustomer().then(onCustomerComplete, onError);
}

var customerDetailsController = function ($scope, $stateParams, customer) {
    let id = $stateParams.id;
    let onCustomerComplete = function (data) {
        //console.log(data);
        $scope.customer = data;
    }
    let onError = function (error) {
        $scope.error = "Oops!"
        console.log(error);
    }
    customer.getCustomerById(id).then(onCustomerComplete, onError);
}
var addCustomerController = function ($scope, dataService, $element) {

    $scope.customer = {};
    let onStateComplete = function (data) {
        $scope.states = data;
    }
    let onCityComplete = function (data) {
        $scope.cities = data;
    }
    let onError = function (error) {
        $scope.error = "Oops!"
        console.log(error);
    }
    $scope.getCity = function () {
        dataService.getCity($scope.customer.selectedState.name).then(onCityComplete, onError);
    }
    dataService.getStates().then(onStateComplete, onError);
    $scope.formSubmit = function () {
        //console.log($scope.customer.addressType['billCheck']);
        console.log($scope.customer);
        console.log($scope.addressType);
    }
    $scope.addressTypes = [
        'Billing Address',
        'Shipping Address'
    ]
    $scope.selectedAddress = [];
    $scope.updateAddressValue = function (choice) {
        var index = $scope.selectedAddress.indexOf(choice);
        if (index == -1) {
            $scope.selectedAddress.push(choice);
        }
        else {
            $scope.selectedAddress.splice(index, 1);
        }
    };
}
var homeController = function ($scope, dataService) {
    let onTopPlaceComplete = function (data) {
        $scope.boxes = data;
        //console.log(data);
    }
    //dataService.getTopDest().then(onComplete, onError);
    dataService.getTopPlaces().then(onTopPlaceComplete, onError);
}
var topPlaceController = function ($scope, $stateParams, dataService) {
    $scope.code = $stateParams.code;
    
    let getPlacesById = function (data) {
        $scope.places = data;
        //console.log(data)
    }
    dataService.getPlacesById($scope.code).then(getPlacesById, onError);
}
var onError = function (error) {
    console.error(error);
};
var photoController = function ($scope, adminService, dataService) {
    $scope.photo = {};
    $scope.seeUpdate = false;
    let uploadPhoto = function (data) {
        dataService.getPhotos().then(onPhotoComplete, onError);
        $scope.photo = {};
        $scope.files = [];
        //$scope.photoUpload.$setPristine;
    }
    $scope.files = [];

    $scope.$on("fileSelected", function (event, args) {
        $scope.$apply(function () {
            //$scope.files = [];
            $scope.files.push(args.file);
            if ($scope.files.length > 1) {
                $scope.photo.Name = '';
                $scope.photo.Primary = false;
            }
            else {
                $scope.photo.Name = $scope.files[0].name;
            }
        });
    });
    $scope.UploadPhoto = function () {
        adminService.uploadPhoto($scope.files, $scope.photo).then(uploadPhoto, onError);
    }
    let onPhotoComplete = function (data) {
        $scope.photos = data;
    }
    let onPlaceComplete = function (data) {
        $scope.places = data;
    }
    let onDeletePhoto = function (data) {
        $scope.resetForm();
        dataService.getPhotos().then(onPhotoComplete, onError);
    }
    $scope.delete = function (photo) {
        adminService.deletePhoto(photo.Id).then(onDeletePhoto, onError);
    }
    $scope.update = function (photo) {
        $scope.seeUpdate = true;
        $scope.photo = photo;
    }
    $scope.startUpdate = function () {
        if ($scope.files.length > 0) {
            console.log('valid');
            adminService.updatePhoto($scope.files, $scope.photo).then(onDeletePhoto, onError);
        }
        else {
            console.log('not valid');
        }
    }
    $scope.download = function (img) {
        let filename = img.Name.split('.')[0];
        let element = document.createElement('a');
        element.setAttribute('href', 'data:image/jpeg;base64,' + encodeURIComponent(img.Photo));
        element.setAttribute('download', filename);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }
    $scope.resetForm = function () {
        $scope.photo = {};
        $scope.files = [];
        $scope.seeUpdate = false;
    }
    dataService.getPlaces().then(onPlaceComplete, onError);
    dataService.getPhotos().then(onPhotoComplete, onError);
}
var placeController = function ($scope, adminService, dataService) {
    $scope.place = {};
    $scope.seeUpdate = false;
    $scope.AddPlace = function () {
        adminService.addPlace($scope.place).then(onAddPlace, onError);
    }
    let onAddPlace = function (data) {
        dataService.getPlaces().then(onPlaceComplete, onError);
        $scope.place = {};
        //$scope.addPlace.$setPristine;
    }
    let onPlaceComplete = function (data) {
        $scope.places = data;
    }

    let onStateComplete = function (data) {
        $scope.states = data;
    }
    let onFontComplete = function (data) {
        $scope.fonts = data;
    }
    let onDeletePlace = function (data) {
        $scope.resetForm();
        dataService.getPlaces().then(onPlaceComplete, onError);
    }
    

    $scope.delete = function (place) {
        //console.log(place);
        adminService.deletePlace(place.Id).then(onDeletePlace, onError);
    }
    $scope.update = function (place) {
        $scope.place = place;
        $scope.seeUpdate = true;
    }
    $scope.startUpdate = function () {
        if ($scope.place) {
            console.log('valid');
            adminService.updatePlace($scope.place).then(onDeletePlace, onError);
        }
        else {
            console.log('not valid');
        }
    }
    $scope.resetForm = function () {
        $scope.place = {};
        $scope.seeUpdate = false;
    }
    dataService.getStates().then(onStateComplete, onError);
    dataService.getPlaces().then(onPlaceComplete, onError);
    dataService.getFonts().then(onFontComplete, onError);
}
var adminController = function ($scope, adminService, dataService) {
    
    
    
    
    
    
    

    

}
module.controller('placeController', placeController);
module.controller('photoController', photoController);
module.controller('homeController', homeController);
module.controller('customerController', customerController);
module.controller('customerDetailsController', customerDetailsController);
module.controller('addCustomerController', addCustomerController);
module.controller('carController', carController);
module.controller('topPlaceController', topPlaceController);
module.controller('adminController', adminController);