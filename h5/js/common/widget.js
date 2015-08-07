define([],function(){

    var widget  = {

        bannerSlider : function(){
            var slider = new fz.Scroll('.ui-slider', {
                role: 'slider',
                indicator: true,
                autoplay: true,
                interval: 3000
            });
        }
    };

    return widget;

});