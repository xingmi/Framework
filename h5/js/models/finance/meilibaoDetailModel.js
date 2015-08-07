define([],function(){

    var financeModel = Backbone.Model.extend({

        url: Mayfle.xiaodouApi + "product/meili/" + Mayfle.P("id"),

    });

    return financeModel;
})