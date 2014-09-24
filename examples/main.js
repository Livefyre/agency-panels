require(['agency-panels'],
function (Panels) {
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

        window.panels = new Panels({
            'el': document.getElementById('panels'),
            'refreshCycle': 10
        });

        panels.$el.on('transitionEnter.panels', function (evt, panelIdx) {
            panelIdx = parseInt(panelIdx, 10)
            if (panelIdx == 0) {
                if (panels.whichCycle() === 0) {
                    var fn = function () {
                        panels.getPanel(panelIdx + 1).css('visibility', 'hidden').css('display', 'table');
                        wall.$el.trigger('resize');
                    };
                    setTimeout(fn, 3000);
                }

                wall.resume();
            }

            if (panelIdx == 1) {
                panels.getPanel(panelIdx).css('visibility', 'visible');
            }
        });

        panels.$el.on('transitionExit.panels', function (evt, panelIdx) {
            if (parseInt(panelIdx) == 1) {
                wall.pause();
            }
        });
    });    
});