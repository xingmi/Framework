define([
    'meilibaoDetailModel',
    'utility'
],function(
    financeModel,
    utility
){

    var meilibaoDetailController = Backbone.View.extend({

        el : $('body'),

        model : new financeModel(),

        template : _.template($("#template1").html()),

        events : {
            "tap #investers"     : "toInvesters",
            "tap .moreIntro"     : "toIntro",
            "tap #buyNow"        : "toBuy",
            "tap .toPlayDetail"  : "toPlayDetail"
        },

        initialize : function() {

            var self = this;

            self.model.fetch({
                success: function(result){
                    var datas = result.toJSON();

                    datas.formatTotalAmount = utility.formatNumber(datas.total_amount);

                    datas.formatResiduaAmount = utility.formatNumber(datas.residual_amount);

                    datas.proportion = Math.round(((datas.total_amount - datas.residual_amount)/datas.total_amount)*10000)/100.00;
                    if(datas.proportion*3.6 >= 180){
                        datas.rotate1 = 180;
                        datas.rotate2 = datas.proportion*3.6 - 180;
                    }else{
                        datas.rotate1 = datas.proportion*3.6;
                        datas.rotate2 = 0;
                    }

                    self.render(datas);

                },
                error : function(){
                    utility.errorMessage();
                }
            });
            
        },

        render : function(datas){
            this.$el.prepend(this.template(datas));
            return this;
        },

        toIntro: function(e){
            var $that = utility.getTarget(e,{
                elem : ".ui-list"
            });
            $that.find(".text-hid-3").css("display","block").addClass('hideText');
            $that.find(".moreIntro").hide();

        },

        toInvesters : function(){

            var count = $("#investers").attr('data-count');
            var amount = $("#investers").attr('data-amount');

            utility.jumpTo({
                url  : ["webapp/finance/investers.html?id=" + Mayfle.P("id") + "&count=" + count + "&amount=" + amount],
                host : true,
                title: "加入记录",
                targetModel: "h5"
            });
        },

        toBuy : function(){
            var amount = $("#buyNow").attr('data-amount');

            utility.jumpTo({
                url  : ["webapp/orders/finance_order_post.html?type=1&productId=" + Mayfle.P("id") + "&amt=" + amount],
                host : true,
                title: "确认订单",
                targetModel: "native"
            });
        },

        toPlayDetail : function(){
            utility.jumpTo({
                url  : ["webapp/finance/plan.html"],
                host : true,
                title: "本金保障计划",
                targetModel: "false"
            });
        }

    });

    return new meilibaoDetailController;


});