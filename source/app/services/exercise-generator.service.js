(function() {
'use strict';

    angular
        .module('kmd-hearingtrainer')
        .factory('ExerciseGenerator', ExerciseGenerator);

    ExerciseGenerator.inject = ['SettingsFactory'];
    function ExerciseGenerator(SettingsFactory) {
        var _exercise = [];
        var service = {
            generateExercise: generateExercise,
            getExercise: getExercise
        };
        
        return service;

        ////////////////
        function generateExercise() {
            var exerciseNotes = SettingsFactory.getExerciseNotes();

            var exercise = [];
            
            for(var i = 0; i < 7; i++) {
                var index = (Math.floor(Math.random() * exerciseNotes.length) + 1) - 1;
                exercise[exercise.length] = exerciseNotes[index];
            }

            _exercise = exercise;
        }
        function getExercise() {
            return _exercise;   
        }
    }
})();