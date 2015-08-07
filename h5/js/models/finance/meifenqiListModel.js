define([],function(){

    var meifenqiListModel = Backbone.Model.extend({

        url: Mayfle.xiaodouApi + "rest/v2.0/base/banners",

        defaults : {
            "discountInfoId" : 0
        }

    });

    return meifenqiListModel;
})