(function() {
'use strict';

    angular
        .module('kmd-hearingtrainer')
        .controller('ExerciseController', ExerciseController);

    ExerciseController.inject = ['$location', '$scope', 'AudioFactory', 'ExerciseGenerator', 'RealEstateFactory', 'SettingsFactory', 'VF'];
    function ExerciseController($location, $scope, AudioFactory, ExerciseGenerator, RealEstateFactory, SettingsFactory, VF) {
        var vm = this;
        //rendering of the stave
        var renderer = null;
        var context = null;
        var stave = null;
        //audio
        var timeout = null;

        angular.extend(vm, {
            //variables
            activeNoteIndex: 1,
            availableNotes: SettingsFactory.getExerciseNotes(),
            correctness: [],
            exerciseIsPlaying: false,
            userNotes: [],

            //functions
            checkExerciseResult: checkExerciseResult,
            goBackToSettings: goBackToSettings,
            playExercise: playExercise,
            setActiveNoteIndex: setActiveNoteIndex,
            setNoteAtSelectedIndex: setNoteAtSelectedIndex
        });

        activate();

        ////////////////

        function activate() { 
            if (ExerciseGenerator.getExercise().length === 0) {
                $location.path('/');
            } else {
                var element = document.getElementById('stave-container');
                initialiseStave(element);

                vm.userNotes = [ExerciseGenerator.getExercise()[0]];
                draw();
                playExercise();
            }
        }

        function initialiseStave(element) {
            renderer = new VF.Renderer(element, VF.Renderer.Backends.SVG);
            renderer.resize(RealEstateFactory.getContainerSize(), 150);
            context = renderer.getContext();
            context.setFont("Arial", 10, "").setBackgroundFillStyle("#fff");
        }

        function draw() {
            resetCanvas();
            var notes = createNotesArray();

            // Create a voice in 4/4 and add above notes
            var voice = new VF.Voice({num_beats: notes.length,  beat_value: 4});
            voice.addTickables(notes);

            // Format and justify the notes to 400 pixels.
            var formatter = new VF.Formatter().joinVoices([voice]).format([voice], 400);

            // Render voice
            voice.draw(context, stave);
        }

        function resetCanvas() {
            //clear the canvas
            context.clearRect(0, 0, RealEstateFactory.getContainerSize(), 150);

            // Create a stave of width 400 at position 10, 40 on the canvas. 
            stave = new VF.Stave(10, 10, RealEstateFactory.getCanvasSize());
            // Add a clef and time signature. 
            stave.addClef("treble");
            //stave.addTimeSignature("4/4");
            
            // Connect it to the rendering context and draw! 
            stave.setContext(context).draw();
        }

        function setActiveNoteIndex(index) {
            vm.activeNoteIndex = index;
        }

        function setNoteAtSelectedIndex(note) {
            vm.userNotes[vm.activeNoteIndex] = note;
            draw();
        }

        function checkExerciseResult() {
            for(var i = 1; i < 8; i++) {
                vm.correctness[i - 1] = vm.userNotes[i] === ExerciseGenerator.getExercise()[i];
            }
        }

        function playExercise() {
            if (!vm.exerciseIsPlaying) {
                //stop from playing the exercise
                AudioFactory.stopPlayingNote();
                clearTimeout(timeout);
                //play the exercise
                vm.exerciseIsPlaying = true;
                playNote(0);
            }
        }
        function playNote(index) {
            var exercise = ExerciseGenerator.getExercise();

            if (index < exercise.length) {
                AudioFactory.playNote(exercise[index], SettingsFactory.getDuration());
                timeout = setTimeout(function() {
                    playNote(++index)
                }, (SettingsFactory.getDuration() + SettingsFactory.getInterval()));
            } else {
                vm.exerciseIsPlaying = false;
                $scope.$apply();
            }
        }

        function goBackToSettings() {
            AudioFactory.stopPlayingNote();
            clearTimeout(timeout);
            $location.path('/');
        }

        $scope.$on('$destroy', function() {
            clearTimeout(timeout);
        });

        //helpers
        function createNotesArray() {
            var arr = [];

            for(var i = 0; i < 8; i++) {
                if (vm.userNotes[i]) {
                    arr[i] = new VF.StaveNote({
                        clef: 'treble',
                        keys: [vm.userNotes[i]],
                        duration: 'q'
                    })
                } else {
                    arr[i] = new VF.StaveNote({
                        clef: 'treble',
                        keys: ['b/4'], 
                        duration: 'qr'
                    });
                }
            }

            return arr;
        }
    }
})();