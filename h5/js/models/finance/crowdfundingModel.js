define([],function(){

    var crowdfundingModel = Backbone.Model.extend({

        url: Mayfle.xiaodouApi + "product/crowd"

    });

    return crowdfundingModel;
})