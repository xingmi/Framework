/*
    ** 浏览器UA判断
    ** author luliangshu(523994707@qq.com)
    ** 2015-06-03
*/
define(function(){

    var appAgent = {

        ua: navigator.userAgent.toLowerCase(),

        // 自定义协议
        customProtocol : "mayfle://",

        // 是否微信
        isWeixinBrowser:function(){
            return /micromessenger/.test(this.ua);
        },

        // 是否IOS
        isApple: function(){
            return /iphone|ipad|ipod/.test(this.ua);
        },

        // 是否Android
        isAndroid: function(){
            return /android/.test(this.ua);
        },

        // 是否美疯啦App
        isMayfle : function(){
            return /mayfle/.test(this.ua);
        }

    }

    return appAgent;

});