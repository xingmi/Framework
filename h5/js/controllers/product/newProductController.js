/**
 * Created by sun.xin on 2015/6/25.
 */
define([
    'newProductModel',
    'bannerModel',
    'widget',
    'utility'
],function(
    newProductModel,
    bannerModel,
    widget,
    utility){

    var newProductController = Backbone.View.extend({

        el: $("body"),

        newProductModel : new newProductModel(),

        bannerModel  : new bannerModel(),

        bannerTemplate : _.template($("#bannerTemplate").html()),

        newProductTemplate : _.template($("#newProductTemplate").html()),

        events:{
            "tap .current"            : "toBannerDetail",
            "tap .ui-grid-halve-img"  : "toDetail"
        },

        initialize: function(){

            var self = this;
            var lon = utility.getLonLat()[0];
            var lat =utility.getLonLat()[1];
            
            self.newProductModel.fetch({
                "data" : {
                    'lon' : lon,
                    'lat' : lat
                },
                success: function(result){
                    self.$el.find('#newproduct').append( self.newProductTemplate(result.toJSON()) );
                }
            });
            self.bannerModel.fetch({
                "data": {
                    "module" : 1
                },
                success:function(result){
                    self.$el.find('#banner').append( self.bannerTemplate(result.toJSON()) );
                    widget.bannerSlider();
                }
            });
        },


         /*banner跳转*/
         toBannerDetail: function(e) {

             var that = utility.getTarget(e, {
                 elem: 'li'
             });

             var type = $(that).attr("data-type");
             var target = $(that).attr("data-target");
             if ($(that).attr("data-url") == "") {
                 var url = "Null";
             } else {
                 var url = $(that).attr("data-url");
             }
             var ptype = $(that).attr("data-ptype");
             var URL = "webapp/banner/target.html?ptype=" + ptype + "&target=" + target + "&type=" + type + "&url=" + url;
             utility.jumpTo({
                 url: [URL],
                 host: true,
                 targetModel: 'native'
             });

         },

        /*新品详情跳转*/
        toDetail:function(e){
            var that = utility.getTarget(e,{
                elem:'li'
            });

            var productId = $(that).attr('data-id');

            if(!$(that).attr('data-type')){
                var pType = 0;
            }else{
                var pType = $(that).attr('data-type');
            }

            var url = "webapp/product/item.html?productId="+productId+"&pType="+pType;
            utility.jumpTo({
                url  : [url],
                host : true,
                targetModel: "native"
            });

        }
    });
    return new newProductController;
});