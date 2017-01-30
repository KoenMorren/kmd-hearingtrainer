(function() {
'use strict';

    angular
        .module('kmd-hearingtrainer')
        .factory('RealEstateFactory', RealEstateFactory);

    RealEstateFactory.inject = ['$window'];
    function RealEstateFactory($window) {
        var _canvasSize = 0;
        var _containerSize = 0;

        var service = {
            getCanvasSize: getCanvasSize,
            getContainerSize: getContainerSize
        };
        
        initialize();

        return service;

        ////////////////
        function initialize() {
            if($window.innerWidth > 1200) {
                _containerSize = 500;
                _canvasSize = 500;
            } else if($window.innerWidth > 979) {
                _containerSize = 500;
                _canvasSize = 500;
            } else if($window.innerWidth > 767) {
                _containerSize = 500;
                _canvasSize = 500;
            } else if($window.innerWidth > 480) {
                _containerSize = $window.innerWidth;
                _canvasSize = $window.innerWidth - 30;
            } else if($window.innerWidth > 320) {
                _containerSize = $window.innerWidth;
                _canvasSize = $window.innerWidth - 30;
            }
        }
        function getCanvasSize() { 
            return _canvasSize;
        }
        function getContainerSize() {
            return _containerSize;          
        }
    }
})();
