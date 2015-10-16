
/*
 * 配置页面路由
 * */
oasgames.mdataServicesConfig.config([
    '$httpProvider',
    function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded, charset=UTF-8';
        $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded, charset=UTF-8';
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
        //$httpProvider.defaults.xhrFields = {'withCredentials': true};
        //$httpProvider.defaults.crossDomain = true;

        $httpProvider.defaults.transformRequest = function(data){
            if($ && data) {
                return $.param(data);
            }
        };

        $httpProvider.interceptors.push(function(){
            var interceptor = {

                /*
                * request公共请求头设置
                * 设定Content-Type，
                * 添加token认证信息
                * */
                'request':function(config){
                    if(config && config.headers) {
                        config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
                        config.headers['MDATA-KEY'] = authentication.get('token');
                    }
                    return config;
                },

                /*
                * response公共部分统一处理
                * */
                'response':function(resp){
                    var statusCode = '';
                    if(resp && resp.data && typeof resp.data === 'object') {
                        statusCode = resp.data.code;
                    }
                    if(statusCode == 401) {
                        console.log(resp);
                        Ui.alert(resp.data.msg, function () {
                            authentication.delete();
                            window.location.hash = '#/login';
                        });
                        return resp;
                    }
                    if(statusCode == 403){
                        Ui.alert(resp.data.msg);
                    }
                    return resp;
                },

                /*
                 * request错误统一处理
                 * */
                'requestError':function(rejection){
                    console.log(rejection);
                    return rejection;
                },

                /*
                 * response错误统一处理
                 * */
                'responseError':function(rejection){
                    var matchedApi = [], urlSummary = '';
                    if(rejection) {
                        var matchedApi = rejection.config.url.match(/api.mdata.com\/(.+)$/);
                        if(matchedApi.length && matchedApi[1]) {
                            urlSummary = matchedApi[1];
                        }
                        if(rejection.status === 0 || rejection.status === -1) {
                            Ui.alert('Network connection error, Error url: ' + urlSummary);
                        }else {
                            console.log(rejection);
                        }
                    }
                    return rejection;
                }
            };

            return interceptor;
        });
    }
]);
