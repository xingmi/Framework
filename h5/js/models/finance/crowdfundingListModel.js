define([],function(){

    var crowdfundingListModel = Backbone.Model.extend({

        url: Mayfle.xiaodouApi + "product/crowd"

    });

    return crowdfundingListModel;
})