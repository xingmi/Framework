define([
    'investerListModel',
    'utility'
],function(
    investerListModel,
    utility
){

    var investerListController = Backbone.View.extend({

        el : $('body'),

        model : new investerListModel(),

        template : _.template($("#template1").html()),

        events : {
           
        },

        initialize : function() {
            var self = this;

            self.model.fetch({
                success: function(result){
                    var datas = result.toJSON();
                    
                    datas.count = Mayfle.P("count");
                    datas.amount = utility.formatNumber(Mayfle.P("amount"));

                    self.render(datas);
                }
            });
            
        },

        render : function(datas){
            this.$el.prepend(this.template(datas));
            return this;

        }

    });

    return new investerListController;


});