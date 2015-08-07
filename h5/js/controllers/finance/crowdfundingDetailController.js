define([
    'crowdfundingDetailModel',
    'crowdfundingModel',
    'utility'
],function(
    crowdfundingDetailModel,
    crowdfundingModel,
    utility
){
    
    var crowdfundingDetailController = Backbone.View.extend({

        el: $(".crowdfunding_goods"),

        crowdfundingDetailModel : new crowdfundingDetailModel(),

        crowdfundingModel   :    new crowdfundingModel(),

        crowdfundingDetailTemplate : _.template($("#crowdfundingDetailTemplate").html()),
        
        classicCaseTemplate : _.template($("#classicCaseTemplate").html()),

        events : {
            "tap .btn-support"     : 'toBuy',
            "tap .to-case-detail"  : 'toCaseDetail'
        },

        initialize: function(){

            var self = this;
            
            self.crowdfundingDetailModel.fetch({
                success: function(result){
                    var data = result.toJSON();

                    self.$el.append( self.crowdfundingDetailTemplate(data.item));

                }
            });

            self.crowdfundingModel.fetch({
                data : {
                    "case" : ""
                },
                success : function(result){
                    self.$el.append(self.classicCaseTemplate(result.toJSON()));
                }
            });
    
        },

        "toBuy" : function(e){
            var that = utility.getTarget(e,{
                elem : 'a'
            });

            var id = $(that).attr('data-id');
            var price = $(that).attr('data-price');
            var refoundId = $(that).attr('data-refundId');
            var url = "webapp/finance/crowdfunding_buy.html?type=3&id="+id+"&price="+price+"&refoundId="+refoundId;

            utility.jumpTo({
                url : [url],
                host : true,
                targetModel : 'native'
            });

        },

        toCaseDetail : function(e){
            var that = utility.getTarget(e,{
                elem : 'li'
            });

            var id = $(that).attr("data-id");

            var url = "webapp/finance/crowdfundingDetail.html?id="+id;
            utility.jumpTo({
                url : [url],
                host : true,
                targetModel : "h5"
            });
        }

    });

    return new crowdfundingDetailController;

});