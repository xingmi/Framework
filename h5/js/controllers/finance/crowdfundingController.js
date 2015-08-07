define([
    'bannerModel',
    'crowdfundingModel',
    'caseModel',
    'widget',
    'utility',


    'deferred'

],function(
    bannerModel,
    crowdfundingModel,
    caseModel,
    widget,
    utility

){
    
    var crowdfundingController = Backbone.View.extend({

        el                   : $(".crowdfunding"),

        bannerModel          : new bannerModel(), 

        crowdfundingModel    : new crowdfundingModel(),

        caseModel            : new caseModel(),

        bannerTemplate       : _.template($("#bannerTemplate").html()),

        crowdfundingTemplate : _.template($("#crowdfundingTemplate").html()),

        caseTemplate         : _.template($("#caseTemplate").html()),

        events : {
            "tap .current"               :"toBannerDetail",
            "tap .nav-tab"               : 'tab',
            "tap .show-more-product"     : 'showMore',
            "tap .toCrowdfundingDetail"  : 'toDetail',
            "tap .ui-border-t"           : 'toCaseDetail'
        },

        initialize: function(){
            var self = this;

            var newData = $.Deferred(),futureData = $.Deferred(),hotData = $.Deferred();

            // 拉取banner数据
            self.bannerModel.fetch({
                "data": {"module" : 3},
                success: function(result){
                    
                    self.$el.find("#banner").append( self.bannerTemplate(result.toJSON()) );

                    widget.bannerSlider();

                }
            });

            // 最新上线
            (function(){
                self.crowdfundingModel.fetch({
                    data  : {
                        "start": 0,
                         "limit" :2,
                        "news" : ""
                    },
                    success: function(result){
                        newData.resolve( result.toJSON() );
                    }
                });
            })();

            // 预热中
            (function(){
                self.crowdfundingModel.fetch({
                    data  : {
                        "start": 0,
                        "limit" :2,
                        "preheat" : ""
                    },
                    success: function(result){
                       futureData.resolve( result.toJSON() );
                    }
                });
            })();

            // 人气最旺
            (function(){
                self.crowdfundingModel.fetch({
                    data  : {
                        "start": 0,
                        "limit" :2,
                        "hot" : ""
                    },
                    success: function(result){
                        hotData.resolve( result.toJSON() );
                    }
                });
            })();
             
            // 保证 最新上线 预热中 人气最旺 数据都拉取成功后再显示到tab
            $.when( newData,futureData,hotData ).done(function (v1,v2,v3 ) {

                var dataList1 = {datas:v1,index:1};
                var dataList2 = {datas:v2,index:2};
                var dataList3 = {datas:v3,index:3};

                self.$el.find(".content1").prepend(self.crowdfundingTemplate(dataList1));
                self.$el.find(".content2").prepend(self.crowdfundingTemplate(dataList2));
                self.$el.find(".content3").prepend(self.crowdfundingTemplate(dataList3));

            });


            self.crowdfundingModel.fetch({
                data : {
                    "case" : ""
                },
                success: function(result){
                        self.$el.find("#case").append( self.caseTemplate(result.toJSON()) );
                }
            })
             
        },
        /*banner跳转*/
        toBannerDetail: function(e){
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
        //选项卡切换
        tab : function(e){

            var that = utility.getTarget(e,{
                elem : 'li'
            });

            $(that).addClass('current').siblings().removeClass('current');

            var $navLi = $('.nav-tab');

            var index = $navLi.index(that);
            $('.ui-tab-content>li').eq(index).addClass('display-block').siblings().removeClass('display-block');

        },
        //查看更多
        showMore : function(e){
             var that = utility.getTarget(e,{
                 elem: 'div'
             });

            var self = this;

            var index = $(that).attr("data-index");

            var limit = 10;
            
            switch(index){
                case '1':
                    that.count = $(that).attr("data-count");
                    that.count++;
                    $(that).attr("data-count",that.count);
                    var page = $(that).attr("data-count");
                    var start = limit * (page - 1);
                    this.crowdfundingModel.fetch({
                        data  : {
                            "start" : start,
                            "limit" : limit,
                            "news" : ""
                        },
                        success: function(result){
                            var datas = result.toJSON();
                            //console.log(datas);

                            var dataList = {datas:datas,index:1};

                            $(".crowdfunding").find(".content1").html(self.crowdfundingTemplate(dataList));
                            if(datas.items.length < 10){
                                $(that).html('没有更多数据了');
                                $.tips({
                                    content : "没有更多数据了",
                                    stayTime : 2000,
                                    type: "warn"
                                });
                            }
                        },
                        error : function(){
                            $.tips({
                                content : '出现错误,请稍后重试',
                                stayTime : 2000,
                                type : "warn"
                            });
                        }
                    });

                    break;
                case '2':
                    that.count = $(that).attr("data-count");
                    that.count++;
                    $(that).attr("data-count",that.count);
                    var page = $(that).attr("data-count");
                    var start = limit * (page - 1);
                    this.crowdfundingModel.fetch({
                        data  : {
                            "start" : start,
                            "limit" : limit,
                            "news" : ""
                        },
                        success: function(result){
                            var datas = result.toJSON();
                            //console.log(datas);

                            var dataList = {datas:datas,index:2};

                            $(".crowdfunding").find(".content2").html(self.crowdfundingTemplate(dataList));
                            if(datas.items.length < 10){
                                $(that).html('没有更多数据了');
                                $.tips({
                                    content : "没有更多数据了",
                                    stayTime : 2000,
                                    type: "warn"
                                });
                            }
                        },
                        error : function(){
                            $.tips({
                                content : '出现错误,请稍后重试',
                                stayTime : 2000,
                                type : "warn"
                            });
                        }
                    });

                    break;
                case '3':
                    that.count = $(that).attr("data-count");
                    that.count++;
                    $(that).attr("data-count",that.count);
                    var page = $(that).attr("data-count");
                    var start = limit * (page - 1);
                    this.crowdfundingModel.fetch({
                        data  : {
                            "start" : start,
                            "limit" : limit,
                            "news" : ""
                        },
                        success: function(result){
                            var datas = result.toJSON();
                            //console.log(datas);

                            var dataList = {datas:datas,index:3};

                            $(".crowdfunding").find(".content3").html(self.crowdfundingTemplate(dataList));
                            if(datas.items.length < 10){
                                $(that).html('没有更多数据了');
                                $.tips({
                                    content : "没有更多数据了",
                                    stayTime : 2000,
                                    type: "warn"
                                });
                            }
                        },
                        error : function(){
                            $.tips({
                                content : '出现错误,请稍后重试',
                                stayTime : 2000,
                                type : "warn"
                            });
                        }
                    });

                    break;
            }

        },

        //查看详情
        toDetail : function(e){
            var that = utility.getTarget(e,{
               elem : 'a'
            });

            var id = $(that).attr("data-id");

            var url = "webapp/finance/crowdfundingDetail.html?id="+id;

            utility.jumpTo({
                url : [url],
                host : true,
                targetModel : "h5"
            });
        },
        //查看成功案例
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

    return new crowdfundingController;

});