(function() {
'use strict';

    angular
        .module('kmd-hearingtrainer')
        .controller('SettingsController', SettingsController);

    SettingsController.inject = ['$location', 'ExerciseGenerator', 'SettingsFactory'];
    function SettingsController($location, ExerciseGenerator, SettingsFactory) {
        var vm = this;
        
        angular.extend(vm, {
            //variables
            possibleNotes: null,
            activeNotes: [],

            //functions
            startExercise: startExercise,
            toggleNote: toggleNote,
        });

        activate();

        ////////////////

        function activate() { 
            vm.possibleNotes = SettingsFactory.getAvailableNotes();
            vm.activeNotes = SettingsFactory.getExerciseNotes();
            vm.duration = SettingsFactory.getDuration() / 1000;
            vm.interval = SettingsFactory.getInterval() / 1000;
        }

        function startExercise() {
            SettingsFactory.setExerciseNotes(vm.activeNotes);
            SettingsFactory.setDuration(vm.duration.toString().replace(',', '.') * 1000);
            SettingsFactory.setInterval(vm.interval.toString().replace(',', '.') * 1000);
            ExerciseGenerator.generateExercise();

            $location.path('/exercise');
        }

        function toggleNote(note) {
            var index = vm.activeNotes.indexOf(note);
            if (index !== -1) {
                vm.activeNotes.splice(index, 1);
            } else {
                vm.activeNotes[vm.activeNotes.length] = note;
            }
        }
    }
})();