define([],function(){

    var orderDetailModel = Backbone.Model.extend({

        url: Mayfle.mayfleApi + "rest/amc/orders/show"
    });

    return orderDetailModel;
});