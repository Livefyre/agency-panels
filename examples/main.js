require([
    'jquery',
    'agency-panels'],
function ($, Panels) {
    window.panels = new Panels({
        'el': document.getElementById('panels'),
        'refreshCycle': 10
    });

    Livefyre.require([
        'streamhub-sdk#2',
        'streamhub-wall#3'],
    function (SDK, Wall) {
        var col = new SDK.Collection ({
            'network': 'umg.fyre.co',
            'siteId': '335799',
            'articleId': 'cashmoneyrecords_All'
        });
        var wall = new Wall({
            'el': document.getElementById('media-wall'),
            'collection': col
        });

        panels.$el.on('transitionEnter.panels', function (evt, panelIdx) {
            if (parseInt(panelIdx) == 0) {
                wall.resume();
                wall.$el.trigger('resize');
            }
        });

        panels.$el.on('transitionExit.panels', function (evt, panelIdx) {
            if (parseInt(panelIdx) == 0) {
                wall.pause();
            }
        });
    });    
});