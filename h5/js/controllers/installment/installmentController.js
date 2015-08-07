define([
    'utility',
    'installmentModel',
    'orderDetailModel',


    'serializejson'
],function(
    utility,
    installmentModel,
    orderDetailModel
){
    
    var installmentController = Backbone.View.extend({

        el: $("body"),

        installmentModel : new installmentModel(),

        orderDetailModel : new orderDetailModel(),

        installmentTemplate  : _.template($("#template1").html()),



        events : {
            "tap .next_step"  : "toNextStep"
        },

        initialize: function(){

            var self = this;
            var token;

            self.render();

            if($(".ui-tab").length){

                var tab = new fz.Scroll('.ui-tab', {
                    role: 'tab'
                });
            }


            if(localStorage['Installment_Apply_Step_2'] && localStorage['Installment_Apply_Step_2'].length > 0) {
                var json = JSON.parse(localStorage['Installment_Apply_Step_2']);
                for (var name in json) {
                    if(_.isObject(json[name])){
                        for(var key in json[name]){
                            $("input[name='"+name+"["+ key +"]']").attr('value', json[name][key]);
                        }
                    }else{
                        $("input[name='"+name+"']").attr('value', json[name]);
                    }

                }
            }


            if(Mayfle.P("orderId") && Mayfle.P("orderId") != 'null' && location.href.indexOf("apply_step_3") != -1){
                token = utility.getToken(window.location.href); // 调用native方法获取token
                alert(token)
                var orderId = Mayfle.P("orderId");
                self.orderDetailModel.fetch({
                    data: {
                        "token" : token,
                        "ordersId" : Mayfle.P("orderId")
                    },
                    success : function(result){
                        alert(orderId)
                        alert(JSON.stringify(result))
                        var orderDetail = result.toJSON();
                        if(orderDetail.code == 108){
                            utility.login(window.location.href);
                            return false;
                        }

                        $("input[name=orderId]").attr({'value':orderDetail.data.orderObj.id,"disabled":true});
                        $("input[name=order_code]").attr({'value':orderDetail.data.orderObj.ordersCode,"disabled":true});
                        $("input[name=organization_name]").attr({'value':orderDetail.data.orderObj.orgName,"disabled":true});
                        $("input[name=project_name]").attr({'value':orderDetail.data.orderObj.ordersItems[0].productName,"disabled":true});
                        $("input[name=organization_phone]").attr({'value':orderDetail.data.orderObj.orgMobile,"disabled":true});
                        $("input[name=loan_amount]").attr({'value':orderDetail.data.orderObj.price,"disabled":true});


                    }
                })
            }else{
                $("#orderCode").css("display","none");

            }

        },

        render : function(){
            var self = this;

            self.$el.prepend(self.installmentTemplate());

            return self;
        },

        toNextStep : function(e){

            var self  = this;
            var $that = utility.getTarget(e);
            var orderIdParams = Mayfle.P("orderId") && Mayfle.P("orderId") != 'null'  ? "&orderId=" + Mayfle.P("orderId") : "";

            var toNextUrl = {
                "step1" : function(){

                    utility.jumpTo({
                        url: ["webapp/installment/apply_step_2.html"],
                        host: true,
                        title: "申请美丽分期",
                        targetModel: "h5"
                    });

                },
                "step2" : function(){

                    //校验表单
                    var form = $(".ui-tab-nav").find(".current").text();
                    if(form == "学生"){
                        self.installmentModel.save({
                            "career" : "student",
                            "school" : $("#schoolName").val().trim(),
                            "professionName" : $("#professionName").val().trim(),
                            "graduationTime" : $("#graduationTime").val().trim(),
                            "dormitoryAddress" : $("#dormitoryAddress").val().trim(),
                            "dormitoryTelephone" : $("#dormitoryTelephone").val().trim(),
                            "parentName" : $("#parentName").val().trim(),
                            "parentTelephone" : $("#parentTelephone").val().trim()
                        });
                    }else {

                        self.installmentModel.save({
                            "career" : "white",
                            "education" : $("#education").val().trim(),
                            "companyName" : $("#companyName").val().trim(),
                            "companyAddr" : $("#companyAddr").val().trim(),
                            "companyTel" : $("#companyTel").val().trim(),
                            "position" : $("#position").val().trim(),
                            "creditCard" : $("#creditCard").val().trim(),
                            "familyName" : $("#familyName").val().trim(),
                            "familyTelephone" : $("#familyTelephone").val().trim(),
                            "familyAddress" : $("#familyAddress").val().trim(),
                            "emergencyConcatName" : $("#emergencyConcatName").val().trim(),
                            "emergencyConcatTel" : $("#emergencyConcatTel").val().trim(),
                            "emergencyConcatAddress" : $("#emergencyConcatAddress").val().trim()
                        });
                    }
                    var id = $that.attr('id');

                    if(id == "getForm1Data"){
                        localStorage['Installment_Apply_Step_2'] = JSON.stringify( _.extend( {"type":1},$("#form1").serializeJSON() ) );
                    }else if(id == "getForm2Data"){
                        localStorage['Installment_Apply_Step_2'] = JSON.stringify( _.extend( {"type":2},$("#form2").serializeJSON() ) );
                    }

                    utility.jumpTo({
                        url  : ["webapp/installment/apply_step_3.html?applyId=" + Mayfle.P("applyId") + orderIdParams],
                        host : true,
                        title: "申请美丽分期",
                        targetModel: "h5"
                    });
                },
                "step3" : function(){


                    if(!Mayfle.P("orderId") || Mayfle.P("orderId") == 'null'){
                        //验证
                        if($("#organizationName").val().trim() == ""){
                             $.tips({
                                 content : "请填写机构名称",
                                 stayTime : 1000,
                                 type: "warn"
                             });
                         }

                         if($("#projectName").val().trim() == ""){
                             $.tips({
                                 content : "请填写项目名称",
                                 stayTime : 1000,
                                 type: "warn"
                             });
                         }

                         if($("#organizationPhone").val().trim() == "" || !numReg.test($("#organizationPhone").val().trim())){
                             $.tips({
                                 content : "请填写正确的机构电话",
                                 stayTime : 1000,
                                 type: "warn"
                             });
                         }

                         if($("#loanAmount").val().trim() == "" || !numReg.test($("#loanAmount").val().trim())){
                             $.tips({
                                 content : "请填写申请金额",
                                 stayTime : 1000,
                                 type: "warn"
                             });
                         }
                        var formData = $("#form3").serializeJSON();
                    }else{
                        var formData = {};
                        formData["orderId"] = $("#orderId").val();
                        formData["organization_name"] = $("#organizationName").val();
                        formData["project_name"] = $("#projectName").val();
                        formData["organization_phone"] = $("#organizationPhone").val();
                        formData["loan_amount"] = $("#loanAmount").val();

                    }
                    var applyData,token;
                        
                    token = utility.getToken(window.location.href); // 调用native方法获取token

                    if(token){
                        applyData = _.extend({"stage_id":Mayfle.P("applyId"),"token":token},formData,JSON.parse(localStorage['Installment_Apply_Step_2']));
                    }

                    self.installmentModel.fetch({

                        data: JSON.stringify(applyData),

                        type: 'POST',

                        contentType: "application/json",

                        success: function(result) {
                            alert(JSON.stringify(result))
                            var resultJson = result.toJSON();
                            if(resultJson.code == "0000"){
                                delete localStorage['Installment_Apply_Step_2'];
                                utility.jumpTo({
                                    url  : ["webapp/installment/finish.html"],
                                    host : true,
                                    title: "申请美丽分期",
                                    targetModel: "h5"
                                });

                            }else if(resultJson.code == "1010"){ // token错误

                                utility.login(window.location.href);
                                
                            }else{
                                $.tips({
                                    content: resultJson.message,
                                    stayTime: 2000,
                                    type: "warn"
                                });
                            }


                        },
                        error: function(){
                            $.tips({
                                content : "出现未知错误,稍后重试!",
                                stayTime : 2000,
                                type : "warn"
                            });
                        }
                    });

                }
            };

            for(key in toNextUrl){

                $that.hasClass(key) && toNextUrl[key]();

            }

        }


    });

    return new installmentController;

});