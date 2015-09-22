
/*
 * 邮箱、密码、用户名验证
 * @return 
 *
 * */
oasgames.mdataServices.factory('MdataVerify', [
    function () {
        return {
            blur : function(type, $errors, $scope){
                var errorInfo = {
                    account: {  //登陆用户名
                        required: 'E-mail must not be empty',
                        pattern: 'This user does not exist'
                    },
                    password: { //登陆密码
                        required: 'Password must not be empty',
                        pattern: 'Incorrect Password '
                    },
                    appName: {  //app页用户名
                        required: 'Name must not be empty',
                        pattern: 'Name Only accepts English letters and numbers'
                    },
                    email: {    //account页email
                        required: 'E-mail must not be empty',
                        pattern: 'Incorrect Format'
                    },
                    accountName: {    //account页name
                        required: 'Name must not be empty',
                        pattern: 'Incorrect Format'
                    },
                    acountPassword: {    //account页password
                        required: 'Password must not be empty',
                        pattern: 'Password must be 6-20 characters in length'
                    }


                };
                for(var $error in $errors) {
                    if($errors[$error]) {
                        $scope[type + 'Error'] = true;
                        $scope.tooltip.errorType = type;
                        $scope.tooltip.setContent(errorInfo[type][$error]);
                        $scope.tooltip.setPosition('.fieldset-' + type, $scope.tooltip.toolTipLooks);
                        $scope.tooltip.toolTipLooks.css({'color': 'rgba(255, 0, 0, 0.7)'});
                        $scope.tooltip.show();
                        return false;
                    }
                }
                $scope[type + 'Error'] = false;
                return true;
            },
            submit : function(type, $errors, $scope){
                var errorInfo = {
                    appName: {  //app页用户名
                        required: 'Name must not be empty',
                        pattern: 'Name Only accepts English letters and numbers'
                    },
                    email: {    //account页email
                        required: 'E-mail must not be empty',
                        pattern: 'Incorrect Format'
                    },
                    accountName: {    //account页name
                        required: 'Name must not be empty',
                        pattern: 'Incorrect Format'
                    },
                    acountPassword: {    //account页password
                        required: 'Password must not be empty',
                        pattern: 'Password must be 6-20 characters in length'
                    }
                }
                for(var $error in $errors) {
                    if($errors[$error]) {
                         Ui.alert(errorInfo[type][$error]);
                        return false;
                    }
                }
                $scope[type + 'Error'] = false;
                return true;
            }
        }
    }
]);