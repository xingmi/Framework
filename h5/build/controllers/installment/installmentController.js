define("appAgent",[],function(){var e={ua:navigator.userAgent.toLowerCase(),customProtocol:"mayfle://",isWeixinBrowser:function(){return/micromessenger/.test(this.ua)},isApple:function(){return/iphone|ipad|ipod/.test(this.ua)},isAndroid:function(){return/android/.test(this.ua)},isMayfle:function(){return/mayfle/.test(this.ua)}};return e}),define("utility",["appAgent"],function(e){var t={getCity:function(){return e.isMayfle()?mayfleJS.getCity():""},getLonLat:function(){if(e.isMayfle()){var t=mayfleJS.getLonLat(),n=t.split(",")[0],r=t.split(",")[1];return new Array(n,r)}if(navigator.geolocation)return[200,200]},getToken:function(t){if(e.isMayfle())return mayfleJS.requestToken(t)},login:function(t){if(e.isMayfle())return mayfleJS.nativeLogin(t)},formatNumber:function(e){return e=e.toString(),e.length<=3?e:arguments.callee(e.substr(0,e.length-3))+","+e.substr(e.length-3)},getTarget:function(e,t){var n=e.target,r="",i=t&&t.elem?t.elem:"a";return n.nodeName!==i.toUpperCase()?r=$(n).closest(i):r=$(n),r},jumpTo:function(t){var n=this,r=t&&t.url?t.url:"",i=t&&t.host?Mayfle.H5BaseUrl:"",s=t.targetModel?t.targetModel:"h5";e.isMayfle()?s=="native"?r.length>1?r=e.customProtocol+r[1]:r=e.customProtocol+r[0]:r=i+r[0]:r=i+r[0];var o=t.title&&(r.indexOf("?")>0?"&":"?")+"title="+encodeURI(t.title)||"";e.isMayfle()&&e.isApple()&&s=="native"?window.location.hash=r+o:location.href=r+o},scoreToStar:function(e){var t;return e%1==0?t=e:e%1<.3?t=Math.floor(e):e%1>.7?t=Math.round(e):t=Math.floor(e)+"f","star-"+t},addLoading:function(){$(".ui-loading-wrap").length?$(".ui-loading-wrap").html('<p>加载中</p><i class="ui-loading"></i>'):$("body").append('<div class="ui-loading-wrap"><p>加载中</p><i class="ui-loading"></i></div>')},removeLoading:function(){$(".ui-loading-wrap").remove()},noMoreData:function(e){$(".ui-loading-wrap").html(e||"亲，没有更多的数据了！")},fullScreenLoading:"",addFullScreenLoading:function(e){this.fullScreenLoading=$.loading({content:e||"加载中..."})},removeFullScreenLoading:function(){this.fullScreenLoading.loading("hide")},errorMessage:function(){$("body").html('<p style="padding:20px 10px; text-align:center;font-size:16px;">程序员哥哥正在抢修中，请稍后再试！</p>')}};return t}),define("installmentModel",[],function(){var e=Backbone.Model.extend({url:Mayfle.xiaodouApi+"staging/apply?token="+localStorage.token,validate:function(e){var t=/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,n=/^1\d{10}$/,r=/^0\d{2,3}-?\d{7,8}$/,i=/^[0-9]*$/,s=/^20\d{2}[0-1]\d[0-3]\d$/;e.career=="student"?(e.school==""&&$.tips({content:"请输入学校名",stayTime:1e3,type:"warn"}),e.professionName==""&&$.tips({content:"请填写专业名",stayTime:1e3,type:"warn"}),(e.graduationTime==""||!s.test(e.graduationTime))&&$.tips({content:"请填写正确的毕业时间",stayTime:1e3,type:"warn"}),e.dormitoryAddress==""&&$.tips({content:"请填写宿舍地址",stayTime:1e3,type:"warn"}),e.parentName==""&&$.tips({content:"请填写家长姓名",stayTime:1e3,type:"warn"}),(e.parentTelephone==""||!n.test(e.parentTelephone))&&$.tips({content:"请填写正确的家长电话",stayTime:1e3,type:"warn"})):(e.education==""&&$.tips({content:"请填写学历",stayTime:1e3,type:"warn"}),e.companyName==""&&$.tips({content:"请填写公司名",stayTime:1e3,type:"warn"}),e.companyAddr==""&&$.tips({content:"请填写公司地址",stayTime:1e3,type:"warn"}),(e.companyTel==""||!r.test(e.companyTel))&&$.tips({content:"请填写正确的公司电话",stayTime:1e3,type:"warn"}),e.position==""&&$.tips({content:"请填写职位",stayTime:1e3,type:"warn"}),e.creditCard==""&&$.tips({content:"请填写信用卡号",stayTime:1e3,type:"warn"}),e.familyName==""&&$.tips({content:"请填写亲属姓名",stayTime:1e3,type:"warn"}),(e.familyTelephone==""||!n.test(e.familyTelephone))&&$.tips({content:"请填写正确的亲属电话",stayTime:1e3,type:"warn"}),e.familyAddress==""&&$.tips({content:"请填写亲属地址",stayTime:1e3,type:"warn"}),e.emergencyConcatName==""&&$.tips({content:"请填写紧急联系人姓名",stayTime:1e3,type:"warn"}),(e.emergencyConcatTel==""||!n.test(e.emergencyConcatTel))&&$.tips({content:"请填写正确的紧急联系人电话",stayTime:1e3,type:"warn"}),e.emergencyConcatAddress==""&&$.tips({content:"请填写紧急联系人地址",stayTime:1e3,type:"warn"}))}});return e}),define("orderDetailModel",[],function(){var e=Backbone.Model.extend({url:Mayfle.mayfleApi+"rest/amc/orders/show"});return e}),!function(e){"use strict";e.fn.serializeJSON=function(t){var n,r,i,s,o,u,a;return u=e.serializeJSON,a=u.setupOpts(t),r=this.serializeArray(),u.readCheckboxUncheckedValues(r,this,a),n={},e.each(r,function(e,t){i=u.splitInputNameIntoKeysArray(t.name,a),s=i.pop(),"skip"!==s&&(o=u.parseValue(t.value,s,a),a.parseWithFunction&&"_"===s&&(o=a.parseWithFunction(o,t.name)),u.deepSet(n,i,o,a))}),n},e.serializeJSON={defaultOptions:{checkboxUncheckedValue:void 0,parseNumbers:!1,parseBooleans:!1,parseNulls:!1,parseAll:!1,parseWithFunction:null,customTypes:{},defaultTypes:{string:function(e){return String(e)},number:function(e){return Number(e)},"boolean":function(e){var t=["false","null","undefined","","0"];return-1===t.indexOf(e)},"null":function(e){var t=["false","null","undefined","","0"];return-1===t.indexOf(e)?e:null},array:function(e){return JSON.parse(e)},object:function(e){return JSON.parse(e)},auto:function(t){return e.serializeJSON.parseValue(t,null,{parseNumbers:!0,parseBooleans:!0,parseNulls:!0})}},useIntKeysAsArrayIndex:!1},setupOpts:function(t){var n,r,i,s,o,u;u=e.serializeJSON,null==t&&(t={}),i=u.defaultOptions||{},r=["checkboxUncheckedValue","parseNumbers","parseBooleans","parseNulls","parseAll","parseWithFunction","customTypes","defaultTypes","useIntKeysAsArrayIndex"];for(n in t)if(-1===r.indexOf(n))throw new Error("serializeJSON ERROR: invalid option '"+n+"'. Please use one of "+r.join(", "));return s=function(e){return t[e]!==!1&&""!==t[e]&&(t[e]||i[e])},o=s("parseAll"),{checkboxUncheckedValue:s("checkboxUncheckedValue"),parseNumbers:o||s("parseNumbers"),parseBooleans:o||s("parseBooleans"),parseNulls:o||s("parseNulls"),parseWithFunction:s("parseWithFunction"),typeFunctions:e.extend({},s("defaultTypes"),s("customTypes")),useIntKeysAsArrayIndex:s("useIntKeysAsArrayIndex")}},parseValue:function(t,n,r){var i,s;return s=e.serializeJSON,i=r.typeFunctions&&r.typeFunctions[n],i?i(t):r.parseNumbers&&s.isNumeric(t)?Number(t):!r.parseBooleans||"true"!==t&&"false"!==t?r.parseNulls&&"null"==t?null:t:"true"===t},isObject:function(e){return e===Object(e)},isUndefined:function(e){return void 0===e},isValidArrayIndex:function(e){return/^[0-9]+$/.test(String(e))},isNumeric:function(e){return e-parseFloat(e)>=0},optionKeys:function(e){if(Object.keys)return Object.keys(e);var t,n=[];for(t in e)n.push(t);return n},splitInputNameIntoKeysArray:function(t,n){var r,i,s,o,u;return u=e.serializeJSON,o=u.extractTypeFromInputName(t,n),i=o[0],s=o[1],r=i.split("["),r=e.map(r,function(e){return e.replace(/\]/g,"")}),""===r[0]&&r.shift(),r.push(s),r},extractTypeFromInputName:function(t,n){var r,i,s;if(r=t.match(/(.*):([^:]+)$/)){if(s=e.serializeJSON,i=s.optionKeys(n?n.typeFunctions:s.defaultOptions.defaultTypes),i.push("skip"),-1!==i.indexOf(r[2]))return[r[1],r[2]];throw new Error("serializeJSON ERROR: Invalid type "+r[2]+" found in input name '"+t+"', please use one of "+i.join(", "))}return[t,"_"]},deepSet:function(t,n,r,i){var s,o,u,a,f,l;if(null==i&&(i={}),l=e.serializeJSON,l.isUndefined(t))throw new Error("ArgumentError: param 'o' expected to be an object or array, found undefined");if(!n||0===n.length)throw new Error("ArgumentError: param 'keys' expected to be an array with least one element");s=n[0],1===n.length?""===s?t.push(r):t[s]=r:(o=n[1],""===s&&(a=t.length-1,f=t[a],s=l.isObject(f)&&(l.isUndefined(f[o])||n.length>2)?a:a+1),""===o?(l.isUndefined(t[s])||!e.isArray(t[s]))&&(t[s]=[]):i.useIntKeysAsArrayIndex&&l.isValidArrayIndex(o)?(l.isUndefined(t[s])||!e.isArray(t[s]))&&(t[s]=[]):(l.isUndefined(t[s])||!l.isObject(t[s]))&&(t[s]={}),u=n.slice(1),l.deepSet(t[s],u,r,i))},readCheckboxUncheckedValues:function(t,n,r){var i,s,o,u,a;null==r&&(r={}),a=e.serializeJSON,i="input[type=checkbox][name]:not(:checked):not([disabled])",s=n.find(i).add(n.filter(i)),s.each(function(n,i){o=e(i),u=o.attr("data-unchecked-value"),u?t.push({name:i.name,value:u}):a.isUndefined(r.checkboxUncheckedValue)||t.push({name:i.name,value:r.checkboxUncheckedValue})})}}}(window.jQuery||window.Zepto||window.$),define("serializejson",function(){}),define("installmentController",["utility","installmentModel","orderDetailModel","serializejson"],function(e,t,n){var r=Backbone.View.extend({el:$("body"),installmentModel:new t,orderDetailModel:new n,installmentTemplate:_.template($("#template1").html()),events:{"tap .next_step":"toNextStep"},initialize:function(){var t=this,n;t.render();if($(".ui-tab").length)var r=new fz.Scroll(".ui-tab",{role:"tab"});if(localStorage.Installment_Apply_Step_2&&localStorage.Installment_Apply_Step_2.length>0){var i=JSON.parse(localStorage.Installment_Apply_Step_2);for(var s in i)if(_.isObject(i[s]))for(var o in i[s])$("input[name='"+s+"["+o+"]']").attr("value",i[s][o]);else $("input[name='"+s+"']").attr("value",i[s])}if(Mayfle.P("orderId")&&Mayfle.P("orderId")!="null"&&location.href.indexOf("apply_step_3")!=-1){n=e.getToken(window.location.href);var u=Mayfle.P("orderId");t.orderDetailModel.fetch({data:{token:n,ordersId:Mayfle.P("orderId")},success:function(t){var n=t.toJSON();if(n.code==108)return e.login(window.location.href),!1;$("input[name=orderId]").attr({value:n.data.orderObj.id,disabled:!0}),$("input[name=order_code]").attr({value:n.data.orderObj.ordersCode,disabled:!0}),$("input[name=organization_name]").attr({value:n.data.orderObj.orgName,disabled:!0}),$("input[name=project_name]").attr({value:n.data.orderObj.ordersItems[0].productName,disabled:!0}),$("input[name=organization_phone]").attr({value:n.data.orderObj.orgMobile,disabled:!0}),$("input[name=loan_amount]").attr({value:n.data.orderObj.price,disabled:!0})}})}else $("#orderCode").css("display","none")},render:function(){var e=this;return e.$el.prepend(e.installmentTemplate()),e},toNextStep:function(t){var n=this,r=e.getTarget(t),i=Mayfle.P("orderId")&&Mayfle.P("orderId")!="null"?"&orderId="+Mayfle.P("orderId"):"",s={step1:function(){e.jumpTo({url:["webapp/installment/apply_step_2.html"],host:!0,title:"申请美丽分期",targetModel:"h5"})},step2:function(){var t=$(".ui-tab-nav").find(".current").text();t=="学生"?n.installmentModel.save({career:"student",school:$("#schoolName").val().trim(),professionName:$("#professionName").val().trim(),graduationTime:$("#graduationTime").val().trim(),dormitoryAddress:$("#dormitoryAddress").val().trim(),dormitoryTelephone:$("#dormitoryTelephone").val().trim(),parentName:$("#parentName").val().trim(),parentTelephone:$("#parentTelephone").val().trim()}):n.installmentModel.save({career:"white",education:$("#education").val().trim(),companyName:$("#companyName").val().trim(),companyAddr:$("#companyAddr").val().trim(),companyTel:$("#companyTel").val().trim(),position:$("#position").val().trim(),creditCard:$("#creditCard").val().trim(),familyName:$("#familyName").val().trim(),familyTelephone:$("#familyTelephone").val().trim(),familyAddress:$("#familyAddress").val().trim(),emergencyConcatName:$("#emergencyConcatName").val().trim(),emergencyConcatTel:$("#emergencyConcatTel").val().trim(),emergencyConcatAddress:$("#emergencyConcatAddress").val().trim()});var s=r.attr("id");s=="getForm1Data"?localStorage.Installment_Apply_Step_2=JSON.stringify(_.extend({type:1},$("#form1").serializeJSON())):s=="getForm2Data"&&(localStorage.Installment_Apply_Step_2=JSON.stringify(_.extend({type:2},$("#form2").serializeJSON()))),e.jumpTo({url:["webapp/installment/apply_step_3.html?applyId="+Mayfle.P("applyId")+i],host:!0,title:"申请美丽分期",targetModel:"h5"})},step3:function(){if(!Mayfle.P("orderId")||Mayfle.P("orderId")=="null"){$("#organizationName").val().trim()==""&&$.tips({content:"请填写机构名称",stayTime:1e3,type:"warn"}),$("#projectName").val().trim()==""&&$.tips({content:"请填写项目名称",stayTime:1e3,type:"warn"}),($("#organizationPhone").val().trim()==""||!numReg.test($("#organizationPhone").val().trim()))&&$.tips({content:"请填写正确的机构电话",stayTime:1e3,type:"warn"}),($("#loanAmount").val().trim()==""||!numReg.test($("#loanAmount").val().trim()))&&$.tips({content:"请填写申请金额",stayTime:1e3,type:"warn"});var t=$("#form3").serializeJSON()}else{var t={};t.orderId=$("#orderId").val(),t.organization_name=$("#organizationName").val(),t.project_name=$("#projectName").val(),t.organization_phone=$("#organizationPhone").val(),t.loan_amount=$("#loanAmount").val()}var r,i;i=e.getToken(window.location.href),i&&(r=_.extend({stage_id:Mayfle.P("applyId"),token:i},t,JSON.parse(localStorage.Installment_Apply_Step_2))),n.installmentModel.fetch({data:JSON.stringify(r),type:"POST",contentType:"application/json",success:function(t){var n=t.toJSON();n.code=="0000"?(delete localStorage.Installment_Apply_Step_2,e.jumpTo({url:["webapp/installment/finish.html"],host:!0,title:"申请美丽分期",targetModel:"h5"})):n.code=="1010"?e.login(window.location.href):$.tips({content:n.message,stayTime:2e3,type:"warn"})},error:function(){$.tips({content:"出现未知错误,稍后重试!",stayTime:2e3,type:"warn"})}})}};for(key in s)r.hasClass(key)&&s[key]()}});return new r});