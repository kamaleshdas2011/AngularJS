var app = angular.module('app');
var customerDirective = function () {
    return {
        templateUrl: 'directive/customer-card.html',
        restrict: 'E',
        scope: {
            customer: '='
        },
        controller: function ($scope) {
            $scope.collapsed = true;
            $scope.collapse = function () {
                $scope.collapsed = !$scope.collapsed;
            }
        },
        compile: function (el, attr) {
            //console.log('compile');
        },

    };
}
var limitTo = function ($parse, $timeout) {
    return {
        restrict: 'A',
        scope: '=',
        templateUrl: '',
        link: function (scope, el, attr) {
            var limit = parseInt(attr.limitTo);
            angular.element(el).on('keypress', function (e) {
                if (!isIntegerChar())
                    e.preventDefault();

                function isIntegerChar() {
                    return /[0-9]|-/.test(
                        String.fromCharCode(e.which))
                }
                if (this.value.length === limit) {
                    e.preventDefault();
                }
            })
        }
    }
}
var carBox = function () {
    return {
        restrict: 'E',
        templateUrl: 'directive/car-box.html',
        scope: {
            car: '=',
            play: '@'
        },
        link: function (scope, elem, attr) {
            //var title = document.getElementById('title');
            //scope.setColor = function (color) {
            //    scope.color = {
            //        'color': car
            //    }
            //}
        },
        controller: function ($scope) {
            
        }
    }
}
var audioList = function () {
    return {
        restrict: 'A',
        scope: {
            //play: '&',
            //pause: '&',
        },
        controller: function ($scope) {

        },
        link: function (scope, elem, attr) {
            //console.log(elem[0]);
            const playList = [
                { url: '/media/Autumn-day-easy-listening-music.mp3' },
                { url: '/media/Simple-peaceful-piano-melody.mp3'},
                { url: '/media/audio-file.wav', },
                { url: '/media/Scary-thunder-sound-effect.mp3', },
                { url: '/media/Thunder-and-rain-sound-effect.mp3', }
            ]
            var audioElement = elem[0];
            audioElement.addEventListener('ended', playAudio);
            //console.log(document.getElementById('audio'));
            var i = 99;
            playAudio();
            
            function playAudio() {
                //console.log(this);
                i++
                if (i > playList.length - 1) {
                    i = 0;
                }
                audioElement.src = playList[i].url;
                audioElement.load();
                audioElement.play();
            }
        }
    }
}
var hiddenAudio = function () {
    return {
        restrict: 'E',
        templateUrl: 'directive/hidden-audio.html',
        scope: {

        },
        link: function (scope, elem, attr) {
            //console.log(elem[0]);
            //console.log(attr);
        },
        controller: function ($scope) {
            $scope.playing = true;
            $scope.play = function () {
                var audioElement = document.getElementById('audio');
                if (audioElement.paused) {
                    audioElement.play();
                }
                else {
                    audioElement.pause();
                }
                
                //console.log(audioElement.paused);
                //audioElement.play();
                $scope.playing = !$scope.playing;
                
            }
        }
    }
}
var ngFiles = function ($parse) {
    var fn_link = function (scope, el, attrs) {
        el.bind('change', function (event) {
            var files = event.target.files;
            //iterate files since 'multiple' may be specified on the element
            for (var i = 0; i < files.length; i++) {
                //emit event upward
                scope.$emit("fileSelected", { file: files[i] });
            }
        });
    };
    return {
        link:
            fn_link
    }
}
var modify = function () {
    return {
        //restrict: 'A',
        templateUrl: 'directive/update.html',
        scope: {
            //data: '@',
            update: '&updateitem',
            delete: '&deleteitem',
        },
        link: function (scope, elem, attr) {
            scope.updateStart = function () {
                scope.update();
            }
            scope.deleteStart = function (id) {
                //console.log(id);
                
                scope.delete();
            }
        },
        controller: function ($scope) {
            
            $scope.closeDialog = function () {
                console.log('close');
            }
        }
    }
} 
app.directive('modify', modify);
app.directive('ngFiles', ngFiles);
app.directive('carBox', carBox);
app.directive('customerCard', customerDirective);
app.directive('limitTo', limitTo);
app.directive('audioList', audioList);
app.directive('hiddenAudio', hiddenAudio);