
/*
 * 配置页面路由
 * */
oasgames.mdataServicesConfig.config([
    '$httpProvider',
    function($httpProvider) {

        // header 默认值
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
        $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded, charset=UTF-8';
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded, charset=UTF-8';

        // request 默认数据处理函数
        $httpProvider.defaults.transformRequest = function(data){
            if($ && data) {
                return $.param(data);
            }
        };

        // 配置拦截器
        $httpProvider.interceptors.push(function(){
            var interceptor = {

                /*
                * request公共请求头设置
                * 设定Content-Type，
                * 添加token认证信息
                * */
                'request':function(config){
                    Ui.loading();
                    if(config && config.headers) {
                        config.crossDomain = true;
                        config.useXDomain = true;
                        config.xhrFields = {'withCredentials': true};
                        config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
                        config.headers['MDATA-KEY'] = authentication.get('token');
                    }
                    return config;
                },

                /*
                * response公共部分统一处理
                * */
                'response':function(resp){
                    Ui.loading(true);
                    var statusCode = '';
                    if(resp && resp.data && typeof resp.data === 'object') {
                        statusCode = resp.data.code;
                    }

                    if(statusCode == 401) {
                        Ui.alert(resp.data.msg, function () {
                            authentication.delete();
                            window.location.hash = '#/login';
                        });
                    }
                    else if(statusCode == 403){
                        Ui.alert(resp.data.msg);
                    }

                    console.log(resp);
                    return resp;
                },

                /*
                 * request错误统一处理
                 * */
                'requestError':function(rejection){
                    Ui.loading(true);
                    console.log(rejection);
                    return rejection;
                },

                /*
                 * response错误统一处理
                 * */
                'responseError':function(rejection){
                    Ui.loading(true);
                    var matchedApi = null, urlSummary = '';
                    if(rejection) {
                        matchedApi = rejection.config.url.match(/api.mdata.com\/(.+)$/);
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
