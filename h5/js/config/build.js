({
    baseUrl: '../',

    dir: '../../build',

    fileExclusionRegExp: /^(r|build|config|require|backbone-min|frozen|underscore-min|zepto-min|touch)\.js$/,

    optimizeCss: 'standard',

    removeCombined: true,

    preserveLicenseComments: false,

    shim: {
        'backbone': {
            deps: ['underscore','jquery'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        },
        'jquery': {
            exports: '$'
        },
        'deferred': {
            deps: ['callback']
        }
    },
    
    paths: {

            /*
                Libs
            */
            'jquery'       : 'lib/zepto-min',
            'backbone'     : 'lib/backbone-min',
            'underscore'   : 'lib/underscore-min',
            'frozen'       : 'lib/frozen',
            'deferred'     : 'lib/deferred',
            'callback'     : 'lib/callbacks',
            'serializejson': 'lib/serializejson-min',

            /*
                Commonjs
            */
            'base'      : 'common/base',
            'utility'   : 'common/utility',
            'nativejs'  : 'common/native',
            'appAgent'  : 'common/appAgent',
            'mayfle'    : 'common/mayfle',
            'message'   : 'common/message',
            'widget'    : 'common/widget',
            
            /*
                Controllers
            */

            // channel : 金融&购买理财&众筹
            'financeController'            : 'controllers/finance/financeController',
            'meilibaoDetailController'     : 'controllers/finance/meilibaoDetailController',
            'investerListController'       : 'controllers/finance/investerListController',
            'crowdfundingController'       : 'controllers/finance/crowdfundingController',
            'crowdfundingDetailController' : 'controllers/finance/crowdfundingDetailController',

            // channel : 申请分期
            'installmentController'        : 'controllers/installment/installmentController',

            // channel : 产品
            'productItemController'      : 'controllers/product/productItemController',
            'newProductController'         : 'controllers/product/newProductController',

            /*
                Models
            */
            // channel : 公用model
            'bannerModel'            : 'models/common/bannerModel',

            // channel : 金融&购买理财&众筹

            'meifenqiListModel'      : 'models/finance/meifenqiListModel',
            'meilibaoListModel'      : 'models/finance/meilibaoListModel',
            'meilibaoDetailModel'    : 'models/finance/meilibaoDetailModel',
            'crowdfundingListModel'  : 'models/finance/crowdfundingListModel',
            'investerListModel'      : 'models/finance/investerListModel',
            'crowdfundingModel'      : 'models/finance/crowdfundingModel',
            'caseModel'              : 'models/finance/caseModel',
            'crowdfundingDetailModel': 'models/finance/crowdfundingDetailModel',

            // channel : 申请分期
            'installmentModel'       : 'models/installment/installmentModel',

            // channel : 新产品
            'newProductModel'        : 'models/product/newProductModel',
            'productItemModel'       : 'models/product/productItemModel',

            // channel : 订单
            'orderDetailModel'       : 'models/order/orderDetailModel'


    },


    modules: [
        {
            name: 'financeController'
        },
        {
            name: 'meilibaoDetailController'
        },
        {
            name: 'investerListController'
        },
        {
            name: 'crowdfundingController'
        },
        {
            name: 'crowdfundingDetailController'
        },
        {
            name: 'installmentController'
        },
        {
            name: 'productItemController'
        },
        {
            name: 'newProductController'
        }
    ],


})
