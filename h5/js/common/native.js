/*
    ** 封装native注入到js的方法 
    ** author luliangshu(523994707@qq.com)
    ** 2015-06-03
*/
define([
    'appAgent'
],function(
    appAgent
){

    var nativejs = {

        call: function(num){
            // appAgent.isAndroid() &&  appAgent.isMayfle() ? mayfleJS.call(num) : location.href = "tel:" + num;
            mayfleJS.call(num)
        },

        appVersion: function(){
            return mayfleJS.versionName(); //app版本号
        },

    };

    return nativejs;

});
