define([],function(){

    var installmentModel = Backbone.Model.extend({

        url: Mayfle.xiaodouApi + "staging/apply?token=" + localStorage['token'],



        validate : function(attrs){

            var userIdReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
            var telReg =  /^1\d{10}$/;
            var phoneReg = /^0\d{2,3}-?\d{7,8}$/;
            var numReg = /^[0-9]*$/;
            var graduationTimeReg = /^20\d{2}[0-1]\d[0-3]\d$/;

            if(attrs.career =="student"){
                if(attrs.school ==""){

                    $.tips({
                        content : "请输入学校名",
                        stayTime : 1000,
                        type: "warn"
                    });
                }
                if(attrs.professionName ==""){
                    $.tips({
                        content : "请填写专业名",
                        stayTime : 1000,
                        type: "warn"
                    });
                }
                if(attrs.graduationTime ==""|| !graduationTimeReg.test(attrs.graduationTime)){
                    $.tips({
                        content : "请填写正确的毕业时间",
                        stayTime : 1000,
                        type: "warn"
                    });
                }

                if(attrs.dormitoryAddress ==""){
                    $.tips({
                        content : "请填写宿舍地址",
                        stayTime : 1000,
                        type: "warn"
                    });
                }



                if(attrs.parentName== ""){
                    $.tips({
                        content : "请填写家长姓名",
                        stayTime : 1000,
                        type: "warn"
                    });
                }

                if(attrs.parentTelephone== "" || !telReg.test(attrs.parentTelephone) ){
                    $.tips({
                        content : "请填写正确的家长电话",
                        stayTime : 1000,
                        type: "warn"
                    });
                }
            }else{
                if(attrs.education== "" ){
                    $.tips({
                        content : "请填写学历",
                        stayTime : 1000,
                        type: "warn"
                    });
                }
                if(attrs.companyName== ""){
                    $.tips({
                        content : "请填写公司名",
                        stayTime : 1000,
                        type: "warn"
                    });
                }
                if(attrs.companyAddr== ""){
                    $.tips({
                        content : "请填写公司地址",
                        stayTime : 1000,
                        type: "warn"
                    });
                }
                if(attrs.companyTel == "" ||  !phoneReg.test(attrs.companyTel)){
                    $.tips({
                        content : "请填写正确的公司电话",
                        stayTime : 1000,
                        type: "warn"
                    });
                }
                if(attrs.position== ""){
                    $.tips({
                        content : "请填写职位",
                        stayTime : 1000,
                        type: "warn"
                    });
                }
                if(attrs.creditCard  == ""){
                    $.tips({
                        content : "请填写信用卡号",
                        stayTime : 1000,
                        type: "warn"
                    });
                }
                if(attrs.familyName == ""){
                    $.tips({
                        content : "请填写亲属姓名",
                        stayTime : 1000,
                        type: "warn"
                    });
                }
                if(attrs.familyTelephone == "" || !telReg.test(attrs.familyTelephone)){
                    $.tips({
                        content : "请填写正确的亲属电话",
                        stayTime : 1000,
                        type: "warn"
                    });
                }

                if(attrs.familyAddress == ""){
                    $.tips({
                        content : "请填写亲属地址",
                        stayTime : 1000,
                        type: "warn"
                    });
                }
                if(attrs.emergencyConcatName == ""){
                    $.tips({
                        content : "请填写紧急联系人姓名",
                        stayTime : 1000,
                        type: "warn"
                    });
                }
                if(attrs.emergencyConcatTel == "" || !telReg.test(attrs.emergencyConcatTel)){
                    $.tips({
                        content : "请填写正确的紧急联系人电话",
                        stayTime : 1000,
                        type: "warn"
                    });
                }
                if(attrs.emergencyConcatAddress == ""){
                    $.tips({
                        content : "请填写紧急联系人地址",
                        stayTime : 1000,
                        type: "warn"
                    });
                }
            }

        }

    });

    return installmentModel;
});