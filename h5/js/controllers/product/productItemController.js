define([
    'productItemModel',
    'utility',
    'appAgent'
],function(
    productItemModel,
    utility,
    appAgent
){
    
    var productItemController = Backbone.View.extend({

        el: $("body"),

        productItemModel : new productItemModel(),

        productItemTemplate : _.template($("#productItemTemplate").html()),

        events :{
            "tap .nav-tab"                : 'tab',
            "tap .ui-grid-halve-img"      : 'toDetail',
            "tap .hospital-detail-jump"   : 'toOrgDetail',
            "tap .doctor-detail"          : 'toDoctorDetail',
            "tap .show-all-doctors"       : 'toAllDoctors'
        },

        initialize: function(){
            var self = this;

            var productId = Mayfle.P("productId");
            var lon = utility.getLonLat()[0];
            var lat =utility.getLonLat()[1];

            // 修复美疯啦app在安卓下 webview被nativebar盖住一部分的问题
            if(appAgent.isAndroid() && appAgent.isMayfle()){
                $(".object_goods").css("padding-bottom","115px");
            };

            self.productItemModel.fetch({
                "data" : {
                    "productId" : productId,
                    "lon"       : lon,
                    "lat"       :lat
                },

                success : function(result){
                    var datas  = result.toJSON();
                    if(datas.code == 900){
                        utility.errorMessage();
                        return;
                    };
                    if(datas.data.org){
                        datas.star = utility.scoreToStar(datas.data.org.points);
                    };

                    self.$el.find('.object_goods').append(self.productItemTemplate(datas));
                },

                error : function(){
                    utility.errorMessage();
                }
            });
        },

        tab : function(e){

            var that = utility.getTarget(e,{
                elem : "li"
            });

            $(that).addClass('current').siblings().removeClass('current');

            var $navLi = $('.nav-tab');
            var index = $navLi.index(that);
            $('.ui-tab-content>li').eq(index).addClass('display-block').siblings().removeClass('display-block');
        },

        toDetail: function(e){
            var that = utility.getTarget(e,{
                elem : "li"
            });

            var productId = $(that).attr("data-id");
            var pType = $(that).attr("data-type");
            var url = "webapp/product/item.html?productId="+productId+"&pType="+pType;

            utility.jumpTo({
                url : [url],
                host: true,
                targetModel : 'native'
            });

        },
        toOrgDetail: function(e){
            var that = utility.getTarget(e,{
                elem: "ul"
            });

            var orgId = $(that).attr("data-id");

            var url =  "webapp/merchant/home.html?orgId="+orgId;
            utility.jumpTo({
                url : [url],
                host : true,
                targetModel : 'native'
            });

        },
        toDoctorDetail : function(e){
            var that = utility.getTarget(e,{
                elem : "li"
            });

            var doctorId = $(that).attr("data-id");
            var url =  "webapp/doctor/home.html?doctorId="+doctorId;
            utility.jumpTo({
                url : [url],
                host : true,
                targetModel : 'native'
            });
        },
        toAllDoctors : function(e){

            var that = utility.getTarget(e,{
                elem : "ul"
            });
            var orgId =  Mayfle.P("productId");

            var url =  "webapp/doctor/list.html?orgId=" + orgId;

            utility.jumpTo({
                url : [url],
                host : true,
                targetModel : 'native'
            });
        }
    });

    return new productItemController;

});