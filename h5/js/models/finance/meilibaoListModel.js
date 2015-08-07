define([],function(){

    var meilibaoListModel = Backbone.Model.extend({

        url: Mayfle.xiaodouApi + "product/meili",

    });

    return meilibaoListModel;
})