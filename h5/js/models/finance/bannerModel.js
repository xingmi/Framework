define([],function(){

    var bannerModel = Backbone.Model.extend({

        url: Mayfle.mayfleApi + "rest/v2.0/base/banners"

    });

    return bannerModel;
})