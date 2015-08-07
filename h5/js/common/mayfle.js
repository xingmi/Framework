/*
    ** 美疯啦定制方法(Mayfle -> 全局) 支持amd模式
    ** author luliangshu(523994707@qq.com)
    ** 2015-06-03
*/

;(function (root, factory) {
  if(typeof define === "function" && define.amd) {

    define(["mayfle"], function(Mayfle){
      return (root.Mayfle = factory(Mayfle));
    });

  } else {

    root.Mayfle = factory(root.Mayfle);

  }
}(this, function(Mayfle) {

    // 静止页面所有的默认跳转行为 请使用js跳转，为了SEO href地址也要填写
    $("body").on("click","a",function(e){

        e.preventDefault();

        return false;
    });

    var Mayfle = {

        // Mayfle版本
        version : "1.0",

        // 美疯啦app主接口
        mayfleApi : document.getElementsByName("mayfleApi")[0].content,

        // 美疯啦理财相关接口(小豆理财)
        xiaodouApi : document.getElementsByName("xiaodouApi")[0].content,

        // H5资源路径地址
        H5BaseUrl : document.getElementsByName("H5BaseUrl")[0].content,

        // 获取url参数
        P : function(name){
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]); return null;
        },

        // 格式化时间 
        formatTime : function(time){

            var time = parseFloat(time);

            if (null!= time &&""!= time) {

                if (time >60&& time <60*60) {

                    time = parseInt(time /60.0) +"分"+ parseInt((parseFloat(time /60.0) -

                            parseInt(time /60.0)) *60) +"秒";

                }else if (time >=60*60&& time <60*60*24) {

                    time = parseInt(time /3600.0) +"时"+ parseInt((parseFloat(time /3600.0) -

                            parseInt(time /3600.0)) *60) +"分"+

                            parseInt((parseFloat((parseFloat(time /3600.0) - parseInt(time /3600.0)) *60) -

                            parseInt((parseFloat(time /3600.0) - parseInt(time /3600.0)) *60)) *60) +"秒";

                }else if (time >=60*60*24&& time <60*60*24*30) {

                    time = parseInt(time /3600.0/24.0) +"天"+

                            parseInt((parseFloat(time /3600.0) - parseInt(time /3600.0)) *24) +"时"+

                            parseInt((parseFloat(time /3600.0) - parseInt(time /3600.0)) *60) +"分"+

                            parseInt((parseFloat((parseFloat(time /3600.0) - parseInt(time /3600.0)) *60) -

                            parseInt((parseFloat(time /3600.0) - parseInt(time /3600.0)) *60)) *60) +"秒";

                }else {

                    time = parseInt(time) +"秒";

                }

            }else{

                time = "0 时 0 分0 秒";

            }

            return time;

        },

        // 提供给h5&native 设置token使用(不可删除)
        saveToken : function(token){
            localStorage['token'] = token;
        }

    }

    return Mayfle;

}));
