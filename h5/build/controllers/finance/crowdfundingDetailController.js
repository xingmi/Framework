define("crowdfundingDetailModel",[],function(){var e=Backbone.Model.extend({url:Mayfle.xiaodouApi+"product/crowd/"+Mayfle.P("id")});return e}),define("crowdfundingModel",[],function(){var e=Backbone.Model.extend({url:Mayfle.xiaodouApi+"product/crowd"});return e}),define("appAgent",[],function(){var e={ua:navigator.userAgent.toLowerCase(),customProtocol:"mayfle://",isWeixinBrowser:function(){return/micromessenger/.test(this.ua)},isApple:function(){return/iphone|ipad|ipod/.test(this.ua)},isAndroid:function(){return/android/.test(this.ua)},isMayfle:function(){return/mayfle/.test(this.ua)}};return e}),define("utility",["appAgent"],function(e){var t={getCity:function(){return e.isMayfle()?mayfleJS.getCity():""},getLonLat:function(){if(e.isMayfle()){var t=mayfleJS.getLonLat(),n=t.split(",")[0],r=t.split(",")[1];return new Array(n,r)}if(navigator.geolocation)return[200,200]},getToken:function(t){if(e.isMayfle())return mayfleJS.requestToken(t)},login:function(t){if(e.isMayfle())return mayfleJS.nativeLogin(t)},formatNumber:function(e){return e=e.toString(),e.length<=3?e:arguments.callee(e.substr(0,e.length-3))+","+e.substr(e.length-3)},getTarget:function(e,t){var n=e.target,r="",i=t&&t.elem?t.elem:"a";return n.nodeName!==i.toUpperCase()?r=$(n).closest(i):r=$(n),r},jumpTo:function(t){var n=this,r=t&&t.url?t.url:"",i=t&&t.host?Mayfle.H5BaseUrl:"",s=t.targetModel?t.targetModel:"h5";e.isMayfle()?s=="native"?r.length>1?r=e.customProtocol+r[1]:r=e.customProtocol+r[0]:r=i+r[0]:r=i+r[0];var o=t.title&&(r.indexOf("?")>0?"&":"?")+"title="+encodeURI(t.title)||"";e.isMayfle()&&e.isApple()&&s=="native"?window.location.hash=r+o:location.href=r+o},scoreToStar:function(e){var t;return e%1==0?t=e:e%1<.3?t=Math.floor(e):e%1>.7?t=Math.round(e):t=Math.floor(e)+"f","star-"+t},addLoading:function(){$(".ui-loading-wrap").length?$(".ui-loading-wrap").html('<p>加载中</p><i class="ui-loading"></i>'):$("body").append('<div class="ui-loading-wrap"><p>加载中</p><i class="ui-loading"></i></div>')},removeLoading:function(){$(".ui-loading-wrap").remove()},noMoreData:function(e){$(".ui-loading-wrap").html(e||"亲，没有更多的数据了！")},fullScreenLoading:"",addFullScreenLoading:function(e){this.fullScreenLoading=$.loading({content:e||"加载中..."})},removeFullScreenLoading:function(){this.fullScreenLoading.loading("hide")},errorMessage:function(){$("body").html('<p style="padding:20px 10px; text-align:center;font-size:16px;">程序员哥哥正在抢修中，请稍后再试！</p>')}};return t}),define("crowdfundingDetailController",["crowdfundingDetailModel","crowdfundingModel","utility"],function(e,t,n){var r=Backbone.View.extend({el:$(".crowdfunding_goods"),crowdfundingDetailModel:new e,crowdfundingModel:new t,crowdfundingDetailTemplate:_.template($("#crowdfundingDetailTemplate").html()),classicCaseTemplate:_.template($("#classicCaseTemplate").html()),events:{"tap .btn-support":"toBuy","tap .to-case-detail":"toCaseDetail"},initialize:function(){var e=this;e.crowdfundingDetailModel.fetch({success:function(t){var n=t.toJSON();e.$el.append(e.crowdfundingDetailTemplate(n.item))}}),e.crowdfundingModel.fetch({data:{"case":""},success:function(t){e.$el.append(e.classicCaseTemplate(t.toJSON()))}})},toBuy:function(e){var t=n.getTarget(e,{elem:"a"}),r=$(t).attr("data-id"),i=$(t).attr("data-price"),s=$(t).attr("data-refundId"),o="webapp/finance/crowdfunding_buy.html?type=3&id="+r+"&price="+i+"&refoundId="+s;n.jumpTo({url:[o],host:!0,targetModel:"native"})},toCaseDetail:function(e){var t=n.getTarget(e,{elem:"li"}),r=$(t).attr("data-id"),i="webapp/finance/crowdfundingDetail.html?id="+r;n.jumpTo({url:[i],host:!0,targetModel:"h5"})}});return new r});