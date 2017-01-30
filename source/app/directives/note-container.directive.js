(function() {
    'use strict';

    angular
        .module('kmd-hearingtrainer')
        .directive('noteContainer', noteContainer);

    noteContainer.inject = ['VF'];
    function noteContainer(VF) {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;
        
        function link(scope, element, attrs) {
            var width = element[0].offsetWidth;
            var height = element[0].offsetHeight;

            var renderer = new VF.Renderer(element[0], VF.Renderer.Backends.SVG);
            renderer.resize(width, height);

            var context = renderer.getContext();
            context.setFont("Arial", 10, "").setBackgroundFillStyle("#eed");

            var stave = new VF.Stave(-1, -15, width);
            stave.setContext(context).draw();

            var notes = [new VF.StaveNote({
                clef: 'treble',
                keys: [scope.note],
                duration: 'q'
            })];

            var voice = new VF.Voice({num_beats: notes.length,  beat_value: 4});
            voice.addTickables(notes);

            var formatter = new VF.Formatter().joinVoices([voice]).format([voice], width);

            // Render voice
            voice.draw(context, stave);
        }
    }
})();