define([],function(){

    var investerListModel = Backbone.Model.extend({

        url: Mayfle.xiaodouApi + "product/meili/"+Mayfle.P('id')+"/investers"

    });

    return investerListModel;
});