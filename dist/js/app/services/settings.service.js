(function() {
'use strict';

    angular
        .module('kmd-hearingtrainer')
        .factory('SettingsFactory', SettingsFactory);

    SettingsFactory.inject = [];
    function SettingsFactory() {
        var _availableNotes = ['c/4', 'd/4', 'e/4', 'f/4', 'g/4', 'a/4', 'b/4', 'c/5'];
        var _exerciseNotes = ['c/4', 'd/4', 'e/4', 'f/4', 'g/4', 'a/4', 'b/4', 'c/5'];
        var _duration = 2000;
        var _interval = 500;

        var service = {
            getAvailableNotes: getAvailableNotes,
            setExerciseNotes: setExerciseNotes,
            getExerciseNotes: getExerciseNotes,

            getDuration: getDuration,
            setDuration: setDuration,
            getInterval: getInterval,
            setInterval: setInterval
        };
        
        return service;

        ////////////////
        function getAvailableNotes() {
            return _availableNotes.sort(notesSorter);
        }

        function setExerciseNotes(notes) {
            _exerciseNotes = notes;
        }

        function getExerciseNotes() {
            return _exerciseNotes.sort(notesSorter);
        }

        function getDuration() {
            return _duration;
        }
        function setDuration(duration) {
            _duration = duration;
        }

        function getInterval() {
            return _interval;
        }
        function setInterval(interval) {
            _interval = interval;
        }

        //helpers
        function notesSorter(a, b) {
            var _as = a.split('/');
            var _bs = b.split('/');

            if (_as[1] !== _bs[1]) {
                return _as[1] - _bs[1];
            } else {
                return getNoteValue(_as[0]) - getNoteValue(_bs[0]);
            }
        }
        function getNoteValue(note) {
            switch(note) {
                case 'c': return 0; break;
                case 'd': return 1; break;
                case 'e': return 2; break;
                case 'f': return 3; break;
                case 'g': return 4; break;
                case 'a': return 5; break;
                case 'b': return 6; break;
            }
        }
    }
})();