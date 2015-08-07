define([
    'bannerModel',
    'meilibaoListModel',
    'crowdfundingListModel',
    'widget',
    'utility',
    'nativejs'

],function(
    bannerModel,
    meilibaoListModel,
    crowdfundingListModel,
    widget,
    utility,
    nativejs
){
    

    var financeController = Backbone.View.extend({

        el : $('.finance'),

        bannerModel : new bannerModel(),

        meilibaoListModel : new meilibaoListModel(),

        crowdfundingListModel : new crowdfundingListModel(),

        bannerTemplate : _.template($("#bannerTemplate").html()),

        meifenqiTemplate : _.template($("#meifenqiTemplate").html()),

        meilibaoTemplate : _.template($("#meilibaoTemplate").html()),


        events : {
            "tap  .toImageUrl"           : "toProject",
            "tap  #applyNow"             : "toApply",
            "tap  .subscribeNow"         : "toSubscribe",
            "tap  #Crowdfunding"         : "toMoreCrowdfunding",
            "tap  .crowdfundingDetail"   : "toCrowdfundingDetail"
        },

        initialize : function() {

            var self = this;
            self.bannerModel.fetch({
                "data": {
                    "module" : 1
                },
                success: function(result){

                    self.$el.find("#banner").append( self.bannerTemplate(result.toJSON()) );
                    
                    widget.bannerSlider();

                }
            });

            self.$el.find("#meifenqi").append( self.meifenqiTemplate() );

            self.meilibaoListModel.fetch({
                success: function(result){
                    self.$el.find("#meilibao").append( self.meilibaoTemplate(result.toJSON()) );
                }
            });

        },

        toProject: function(e){
            var that = utility.getTarget(e,{
                elem:'li'
            });
            var type = $(that).attr("data-type");
            var target = $(that).attr("data-target");

            if($(that).attr("data-url") == ""){
                var url = "Null";
            }else{
                var url = $(that).attr("data-url");
            }
            var ptype = $(that).attr("data-ptype");
            var URL = "webapp/banner/target.html?ptype="+ptype+"&target="+target+"&type="+type+"&url="+url;
            utility.jumpTo({
                url : [URL],
                host:true,
                targetModel: 'native'
            });

        },

        toApply : function(){

            utility.jumpTo({
                url  : ["webapp/installment/apply_step_1.html"],
                host : true,
                title: "申请美丽分期",
                targetModel: "native"
            });

        },

        toSubscribe : function(e){
            
            var $that = utility.getTarget(e);
            var id    = $that.attr('data-id');

            utility.jumpTo({
                url  : ["webapp/finance/meilibao.html?id=" + id],
                host : true,
                title: "美丽宝",
                targetModel: "h5"
            });

        },

        toMoreCrowdfunding : function(){
            utility.jumpTo({
                url : ["webapp/finance/crowdfunding.html"],
                host : true,
                title : "美疯啦众筹",
                targetModel : "h5"
            });
        },

        toCrowdfundingDetail : function(e){

            var that  = utility.getTarget(e);
            var url    = $(that).attr('data-url');
            var title = $(that).attr('data-title');
            utility.jumpTo({
                url : [url],
                host : false,
                title : title,
                targetModel : "h5"
            });

        }

    });

    return new financeController;

});