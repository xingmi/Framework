define([],function(){

    var crowdfundingDetailModel = Backbone.Model.extend({

        url: Mayfle.xiaodouApi + "product/crowd/" + Mayfle.P("id"),

    });

    return crowdfundingDetailModel;
})