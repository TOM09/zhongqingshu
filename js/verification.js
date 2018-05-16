/**
 * Created by Administrator on 2017/12/26.
 */
var resPhone = /^1[34578]\d{9}$/;
var resCode = /^\d{6}$/;
var resEmail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
var resPassword = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/;
var checkObj = {
    getPhoneCode:function (element,elementIpt) {
        element.click(function (ev) {
            var ev = ev || event;
            ev.preventDefault();
            if(elementIpt.val()){
                if(!resPhone.test(elementIpt.val())){
                    /*elementIpt.parent().find(".input-notes").remove();
                    elementIpt.parent().append("<span class='input-notes'>手机号码错误</span>");*/
                    toast("手机号码错误");
                }else{
                    elementIpt.parent().find(".input-notes").remove();
                    ajax("/services/user/check/available/mobile",{
                        clientType:102500,
                        mobilePhone:elementIpt.val()
                    },function (checkMobile) {
                        if(!checkMobile.datas[0]){
                            toast("该手机号已注册");
                            return true;
                        }else {
                            ajax('/services/user/security/code/mobile',{
                                clientType:102500,
                                mobilePhoneNumber:elementIpt.val()
                            },function () {
                                alert("验证码已发送")
                            })
                        }
                    })
                }
            }else{
                toast("请输入手机号");
            }
        });
    },
    getPhoneLoginCode:function (element,elementIpt) {
        element.click(function (ev) {
            var ev = ev || event;
            ev.preventDefault();
            if(elementIpt.val()){
                if(!resPhone.test(elementIpt.val())){
                    elementIpt.parent().find(".input-notes").remove();
                    // elementIpt.parent().append("<span class='input-notes'>手机号码错误</span>");
                    toast("手机号码错误")
                }else{
                    elementIpt.parent().find(".input-notes").remove();
                    ajax("/services/user/check/available/mobile",{
                        clientType:102500,
                        mobilePhone:elementIpt.val()
                    },function (checkMobile) {
                        if(!checkMobile.datas[0]){
                            ajax('/services/user/security/code/mobile',{
                                clientType:102500,
                                mobilePhoneNumber:elementIpt.val()
                            },function () {
                                alert("验证码已发送")
                            });
                        }else {
                            toast("请填写可用手机号");
                        }
                    })
                }
            }
        });
    },
    getEmailCode:function (element,elementIpt) {
        element.click(function (ev) {
            var ev = ev || event;
            ev.preventDefault();
            if(elementIpt.val()){
                if(!resEmail.test(elementIpt.val())){
                    /*elementIpt.parent().find(".input-notes").remove();
                    elementIpt.parent().append("<span class='input-notes'>邮箱地址错误</span>");*/
                    toast("邮箱地址错误")
                }else{
                    elementIpt.parent().find(".input-notes").remove();
                    ajax("/services/user/check/available/email",{
                        clientType:102500,
                        email:elementIpt.val()
                    },function (checkEmail) {
                        if(!checkEmail.datas[0]){
                            toast("该邮箱已注册");
                        }else {
                            ajax('/services/user/security/code/email',{
                                clientType:102500,
                                emailAddress:elementIpt.val()
                            },function () {
                                alert("验证码已发送")
                            })
                        }
                    })
                }
            }
        });
    },
    checkUser:function (element) {
        element.blur(function (ev) {
            var ev = ev || event;
            ev.preventDefault();
            if($(this).val()){
                if(!(resPhone.test($(this).val()) || resEmail.test($(this).val()))){
                    /*$(this).parent().find(".input-notes").remove();
                    $(this).parent().append("<span class='input-notes'>手机号/邮箱错误</span>");*/
                    toast("手机号/邮箱错误")
                }else{
                    $(this).parent().find(".input-notes").remove();
                }
            }
        })
    },
    checkEmail:function (element) {
        element.blur(function (ev) {
            var ev = ev || event;
            ev.preventDefault();
            if($(this).val()){
                if(!resEmail.test($(this).val())){
                    /*$(this).parent().find(".input-notes").remove();
                    $(this).parent().append("<span class='input-notes'>邮箱错误</span>");*/
                    toast("邮箱错误")
                }else{
                    $(this).parent().find(".input-notes").remove();
                }
            }
        })
    },
    checkCode:function (element) {
        element.blur(function (ev) {
            var ev = ev || event;
            ev.preventDefault();
            if($(this).val()){
                if(!resCode.test($(this).val())){
                    /*$(this).parent().find(".input-notes").remove();
                    $(this).parent().append("<span class='input-notes'>请输入6位数字验证码</span>");*/
                    toast("请输入6位数字验证码")
                }else{
                    $(this).parent().find(".input-notes").remove();
                }
            }
        })
    },
    checkPhone:function (element) {
        element.blur(function (ev) {
            var ev = ev || event;
            ev.preventDefault();
            if($(this).val()){
                if(!resPhone.test($(this).val())){
                    /*$(this).parent().find(".input-notes").remove();
                    $(this).parent().append("<span class='input-notes'>手机号码错误</span>");*/
                    toast("手机号码错误");
                }else{
                    $(this).parent().find(".input-notes").remove();
                    ajax("/services/user/check/available/mobile",{
                        clientType:102500,
                        mobilePhone:element.val()
                    },function (checkMobile) {
                        if(checkMobile.datas[0]){
                            toast("该手机号未使用");
                        }
                    })
                }
            }
        })
    }
};

function verification(form) {
    var _form = $(form);
    var vaildateFlag = true;
    var _inputVaildate = _form.find("input[vaildate],select[vaildate]");
    var _imgVaildate = _form.find('img[vaildate="requireImg"]');
    for (var _inputVaildateI = 0; _inputVaildateI < _inputVaildate.length; _inputVaildateI++) {
        switch (_inputVaildate.eq(_inputVaildateI).attr("vaildate")) {
            case "require":
                if(!_inputVaildate.eq(_inputVaildateI).val()){
                    _inputVaildate.eq(_inputVaildateI).css({
                        "border":"1px solid red"
                    });
                    toast("必填项不能为空");
                   return vaildateFlag = false;
                }else {
                    _inputVaildate.eq(_inputVaildateI).css({
                        "border":"1px solid #E5E5E5"
                    });
                }
                break;
            case "require&phone":
                if(!resPhone.test(_inputVaildate.eq(_inputVaildateI).val())){
                    _inputVaildate.eq(_inputVaildateI).css({
                        "border":"1px solid red"
                    });
                    toast('请填写正确的手机号');
                    return vaildateFlag = false;
                }else {
                    _inputVaildate.eq(_inputVaildateI).css({
                        "border":"1px solid #E5E5E5"
                    });
                }
                break;
            case "require&phone&email":
                if(!(resPhone.test(_inputVaildate.eq(_inputVaildateI).val()) || resEmail.test(_inputVaildate.eq(_inputVaildateI).val()))){
                    _inputVaildate.eq(_inputVaildateI).css({
                        "border":"1px solid red"
                    });
                    toast('请填写正确的手机号/邮箱');
                    return vaildateFlag = false;
                }else {
                    _inputVaildate.eq(_inputVaildateI).css({
                        "border":"1px solid #E5E5E5"
                    });
                }
                break;
            case "require&email":
                if(!resEmail.test(_inputVaildate.eq(_inputVaildateI).val())){
                    _inputVaildate.eq(_inputVaildateI).css({
                        "border":"1px solid red"
                    });
                    toast('请填写正确的邮箱');
                    return vaildateFlag = false;
                }else {
                    _inputVaildate.eq(_inputVaildateI).css({
                        "border":"1px solid #E5E5E5"
                    });
                }
                break;
            case "require&code":
                if(!resCode.test(_inputVaildate.eq(_inputVaildateI).val())){
                    _inputVaildate.eq(_inputVaildateI).css({
                        "border":"1px solid red"
                    });
                    toast('请填写正确的验证码');
                    return vaildateFlag = false;
                }else {
                    _inputVaildate.eq(_inputVaildateI).css({
                        "border":"1px solid #E5E5E5"
                    });
                }
                break;
            case "require&password":
                if(!resPassword.test(_inputVaildate.eq(_inputVaildateI).val())){
                    _inputVaildate.eq(_inputVaildateI).css({
                        "border":"1px solid red"
                    });
                    toast('8-20位数组字母组合');
                    return vaildateFlag = false;
                }else {
                    _inputVaildate.eq(_inputVaildateI).css({
                        "border":"1px solid #E5E5E5"
                    });
                }
                break;
            /*case "require&length":
                if(_inputVaildate.eq(_inputVaildateI).val().length>15 || _inputVaildate.eq(_inputVaildateI).val().length<=0){
                    _inputVaildate.eq(_inputVaildateI).css({
                        "border":"1px solid red"
                    });
                    toast('长度为0-15位');
                    return vaildateFlag = false;
                }else {
                    _inputVaildate.eq(_inputVaildateI).css({
                        "border":"1px solid #E5E5E5"
                    });
                }
                break;*/
            /*case "require&password":
                if(!resCode.test(_inputVaildate.eq(_inputVaildateI).val())){
                    _inputVaildate.eq(_inputVaildateI).css({
                        "border":"1px solid red"
                    });
                    toast('请填写正确的验证码')
                    return vaildateFlag = false;
                }else {
                    _inputVaildate.eq(_inputVaildateI).css({
                        "border":"1px solid #E5E5E5"
                    });
                }
                break;*/
            case "require&rePpassword":
                if(!(_form.find("input[name='rePpassword']").val() === _form.find("input[name='newPassword']").val())){
                    _inputVaildate.eq(_inputVaildateI).css({
                        "border":"1px solid red"
                    });
                    toast('请两次填写相同的密码');
                    return vaildateFlag = false;
                }else {
                    _inputVaildate.eq(_inputVaildateI).css({
                        "border":"1px solid #E5E5E5"
                    });
                }
                break;
        }
    }
    if(_imgVaildate.attr("src")=="img/image_user@2x.png"){
        toast("请上传图片");
        return vaildateFlag = false;
    }
    return vaildateFlag
}
