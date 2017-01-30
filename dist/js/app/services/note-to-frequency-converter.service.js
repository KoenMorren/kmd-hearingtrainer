(function() {
'use strict';

    angular
        .module('kmd-hearingtrainer')
        .factory('NoteToFrequencyConverter', NoteToFrequencyConverter);

    NoteToFrequencyConverter.inject = [];
    function NoteToFrequencyConverter() {
        var service = {
            convertNote: convertNote
        };
        
        return service;

        ////////////////
        function convertNote(note) { 
			//www.phy.mtu.edu/~suits/notefreqs.html
            switch(note) {
                case 'c/4': return 261.63;
                case 'd/4': return 293.66;
                case 'e/4': return 329.63;
                case 'f/4': return 349.23;
                case 'g/4': return 392.00;
				case 'a/4': return 440.00;
                case 'b/4': return 493.88;
                case 'c/5': return 523.25;
                case 'd/5': return 587.33;
            }
        }
    }
})();