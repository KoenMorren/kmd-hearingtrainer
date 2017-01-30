(function() {
'use strict';

    angular
        .module('kmd-hearingtrainer')
        .factory('AudioFactory', AudioFactory);

    AudioFactory.inject = ['NoteToFrequencyConverter'];
    function AudioFactory(NoteToFrequencyConverter) {
        var _context = null;
        var _osc = null;

        var service = {
            playNote: playNote,
            stopPlayingNote: stopPlayingNote
        };
        
        activate();
        
        return service;

        ////////////////
        function activate() {
            _context = new window.AudioContext();
        }
        function playNote(note, duration) {
            var freq = NoteToFrequencyConverter.convertNote(note);

            //todo play note at received frequency for the specified duration
            _osc = _context.createOscillator();
            _osc.frequency.value = freq;
            _osc.connect(_context.destination);
            _osc.start(0);

            setTimeout(function() {
                _osc.stop();
            }, duration);
        }
        function stopPlayingNote() {
            if (_osc) {
                _osc.stop();
            }
        }
    }
})();