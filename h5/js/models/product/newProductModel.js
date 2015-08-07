/**
 * Created by sun.xin on 2015/6/25.
 */
define([],function(){

    var newProductModel = Backbone.Model.extend({

        url: Mayfle.mayfleApi + "rest/v2.0/base/product/new"
    });

    return newProductModel;
});