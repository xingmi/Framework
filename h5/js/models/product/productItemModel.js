/**
 * Created by sun.xin on 2015/6/29.
 */
define([],function(){
    var productItemModel = Backbone.Model.extend({

        url : Mayfle.mayfleApi + "rest/v2.0/product/detailByHtml5"

    });

    return productItemModel;

});