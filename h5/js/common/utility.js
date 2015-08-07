/*
    ** 公用方法封装
    ** author luliangshu(523994707@qq.com)
    ** 2015-06-03
*/

define([
    'appAgent'
],function(
    appAgent
){
    var utility = {

        //城市
        getCity: function(){
            return appAgent.isMayfle() ? mayfleJS.getCity() : "";
        },

        // 获取经纬度[lon,lat]
        getLonLat: function(){

            if(appAgent.isMayfle()){
                var lonlat = mayfleJS.getLonLat();
                var lon = lonlat.split(",")[0];
                var lat = lonlat.split(",")[1];
                return new Array(lon,lat);
            }else{
                if(navigator.geolocation){
                   //  navigator.geolocation.getCurrentPosition(function(position){
                   //      var lat=position.coords.latitude;
                   //      var lon=position.coords.longitude;
                   //      //var map = new BMap.Map("container");            // 创建Map实例
                   //      // var point = new BMap.Point(lon, lat);    // 创建点坐标
                   //      //map.centerAndZoom(point,15);                     //
                   //      //map.enableScrollWheelZoom();
                   //      // var gc = new BMap.Geocoder();
                   //      // gc.getLocation(point, function(rs){
                   //      // var addComp = rs.addressComponents;
                   //      //     localStorage['userAddress'] = addComp.city;
                   //      // });
                   //      return new Array(lon,lat);
                   // },function(){
                   //     // localStorage['userAddress'] = "上海市"
                   // });
                    return [200,200];
                }else{
                    // localStorage['userAddress'] = "上海市"
                }

            }


        },

        /* @params
            ** callbackUrl : 回调url  
            ** native端处理  如果有token直接传token 如果token不存在则调用native登录方法
        */
        getToken : function(callbackUrl){
            if(appAgent.isMayfle()){
                return mayfleJS.requestToken(callbackUrl);
            }else{
                
            }
        },

         /* @params
            ** callbackUrl : 回调url  
            ** native端处理  直接调用native登录方法
        */
        login : function(callbackUrl){
            if(appAgent.isMayfle()){
                return mayfleJS.nativeLogin(callbackUrl);
            }else{
                
            }
        },

        // 格式化金额(三位一个逗号)
        formatNumber : function(value) {
            value = value.toString();
            if (value.length <= 3) {
                return value;
            } else {
                return arguments.callee(value.substr(0, value.length - 3)) + ',' + value.substr(value.length - 3);
            }
        },

        /*
            * 获取事件元素
            * @options
            *     elem: 元素[默认是a]
        */
        getTarget: function (e, options) {
            var target = e.target,
                $that = '';

            var el = options && options.elem ? options.elem : 'a';

            if (target.nodeName !== el.toUpperCase()) {
                $that = $(target).closest(el);
            } else {
                $that = $(target);
            }
            return $that;
        },


        /*
        * 页面跳转
        * @params
        *     url: 数组【第一个值是H5 URL，第二个值APP URL，如果两个都一样就填一个】
        *     host: true(相对路径) fasle(绝对路径)  只针对H5地址
        *     tilte: 页面title
              targetModel: app中页面跳转类型 可选native & h5  默认h5
        */
        jumpTo : function(params){

            var self = this;

            var url = params && params.url ? params.url : '',
                host = params && params.host ? Mayfle.H5BaseUrl : '',
                targetModel = params.targetModel? params.targetModel : "h5";
            if (appAgent.isMayfle()) {
                if(targetModel == "native"){
                    if (url.length > 1) {
                        url = appAgent.customProtocol + url[1];

                    } else {
                        url = appAgent.customProtocol + url[0];

                    }

                }else{
                    url = host + url[0];
                }
            } else {
                url = host + url[0];
            }

            var title  = params.title && (url.indexOf("?") > 0 ? "&" : "?") + "title=" + encodeURI(params.title) || "";

            if(appAgent.isMayfle() && appAgent.isApple() &&  (targetModel == "native") ){ // IOS 不能通过location.href 直接跳转 使用hash方式

                window.location.hash = url + title;

            }else{

                location.href = url + title;
            }
        },

        // 评分转星级 (star-1 or star-1f)
        scoreToStar : function(score){
             var str;
             
             if(score % 1 == 0){
                 str = score
             }else if( score % 1 < 0.3 ){
                 str = Math.floor(score)
             }else if( score % 1 > 0.7 ){
                 str = Math.round(score)
             }else{
                 str = Math.floor(score) + "f"
             }
             return "star-" + str;
        },

        // 添加底部loading
        addLoading : function(){
            if($(".ui-loading-wrap").length){
                $(".ui-loading-wrap").html(
                    '<p>加载中</p>'+
                    '<i class="ui-loading"></i>');
            }else{
                $('body').append(
                    '<div class="ui-loading-wrap">' +
                    '<p>加载中</p>'+
                    '<i class="ui-loading"></i>'+
                '</div>');
            }
        },

        // 移除底部loading
        "removeLoading" :function(){
            $('.ui-loading-wrap').remove();
        },

        // 没有更多数据
        "noMoreData": function(msg){
            $('.ui-loading-wrap').html(msg || '亲，没有更多的数据了！');
        },

        fullScreenLoading : "",

        // 添加全屏loading
        addFullScreenLoading : function(msg){

            this.fullScreenLoading=$.loading({
                content: msg || '加载中...'
            })
        },

        // 移除全屏loading
        "removeFullScreenLoading" : function(){
            this.fullScreenLoading.loading("hide");
        },

        //拉取数据出错
        "errorMessage" : function(){
            $("body").html('<p style="padding:20px 10px; text-align:center;font-size:16px;">程序员哥哥正在抢修中，请稍后再试！</p>');
        }

    }

    return utility;
})