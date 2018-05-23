/**
 * Created by Administrator on 2017/7/4.
 */
//检查输入个数textArea
function lengthLimit(dom, num, areaCount) {
    areaCount.text(dom.val().length);
    dom.on("keyup", function () {
        var $this = $(this), _val = $this.val(), count = "";
        if (_val.length > num) {
            $this.val(_val.substring(0, num));
            // toast("字数超过限制");
        }
        count = $this.val().length;
        areaCount.text(count);
    });
}

function getSearch(key) {
    var search = window.location.search.substr(1);
    var val = 0;
    if (!search) {
        return false;
    }
    if (search.indexOf('&') != -1) {
        var arr = search.split('&');
        arr.forEach(function (item, i) {
            var arr = item.split('=');
            if (arr[0] == key) {
                val = arr[1];
            }
        })
    } else {
        var arr = search.split('=');
        if (arr[0] == key) {
            val = arr[1];
        }
    }
    return val;
}
function getCookieByName(name) {
    /*获取cookie参数*/
    var getCookie = document.cookie.replace(/[ ]/g, "");
    var arrCookie = getCookie.split(";");
    var tips; //声明变量tips
    for (var i = 0; i < arrCookie.length; i++) {
        var arr = arrCookie[i].split("=");
        if (name == arr[0]) {
            tips = arr[1];
            return tips;
        }
    }
}
function setCookie(name, value, expiresMinutes) {
    //拼接 名值对儿 字符串
    var nameAndValue = name + '=' + value;
    //拼接 过期时间字符串
    var date = new Date();
    date.setMinutes(date.getMinutes() + expiresMinutes);
    var dateStr = date.toUTCString();
    var expires = ';expires=' + dateStr;
    document.cookie = nameAndValue + expires;
}
function isContains(str, substr) {
    return new RegExp(substr).test(str);
}
//ajax
function ajax(url, data, successCallback, isAsync) {
    if (typeof data === 'object') {
        data = JSON.stringify(data)
    }
    isAsync === undefined ? isAsync = true : isAsync;
    $.ajax({
        method: 'POST',
        url: url,
        contentType: "application/json",
        async: isAsync,
        data: data,
        success: function (result, status, xhr) {
            var token = xhr.getResponseHeader('__token__');
            setCookie('__token__', token, 30);
            if (result.status === 'success') {
                successCallback(result);
                return false
            }
            var errorStr = 'authentication_failed';
            var registeredStr = 'the phone number has been registered';
            var newMobileStr = 'New mobile security code don\'t match';
            var passwordStr = 'The password is not correct.';
            var userNotStr = 'The user is not existed.';
            var deliveryErroe = 'delivery security code is not correct.';
            var lessMoney = 'Amount is not a valid number';
            var countMax = 'Max retry count: 5';
            var smsCountMax = "SMS message frequency too high.";
            var accountError = 'Account not exists.';
            var passwordError = 'Password not match';
            var oldPasswordError = "Validate old password failed.";
            var userTypeerror = 'Company type don\'t match.';
            var mobileError = 'phone security code don\'t match.';
            var emailError = 'Email security code don\'t match.';
            var oldMobileError = 'Old mobile security code don\'t match.';
            var oldEmailError = 'Old email security code don\'t match.';
            var newMobileError = 'New phone security code don\'t match.';
            var newEmailError = 'New email security code don\'t match.';
            var accountDisabled = 'Your account has been disabled.';
            var deletedError = 'this product has been sold, so this could not be deleted.';
            var perfectResume = 'complete your resume first.';
            var emailAddress = 'Email address should not be null.';
            var accountNotExists = 'Account not exists.';
            var denied = 'Permission denied.';
            var sensitive = 'Some words are sensitive!';
            var errorMessage = '';
            !result.errorMessage ? errorMessage = result : errorMessage = result.errorMessage;
            if (isContains(errorMessage, emailAddress)) {
                toast("邮箱地址不能为空");
                return;
            }
            if (isContains(errorMessage, accountNotExists)) {
                toast("该账户不存在");
                return;
            }
            if (isContains(errorMessage, errorStr)) {
                alert('请重新登录！');
                window.parent.location.href = '/login.html'
            }
            if (isContains(errorMessage, denied)) {
                alert('该账号被顶下，请重新登录！');
                window.parent.location.href = '/login.html'
            }
            if (isContains(errorMessage, perfectResume)) {
                toast("请先完善简历");
                return;
            }
            if (isContains(errorMessage, accountDisabled)) {
                toast("您的账号已冻结");
                return;
            }
            if (isContains(errorMessage, passwordStr)) {
                toast("账号密码不匹配");
                return
            }
            if (isContains(errorMessage, userNotStr)) {
                toast("账号不存在");
                return
            }
            if (isContains(errorMessage, registeredStr)) {
                toast("该账户已被注册");
                return
            }
            if (isContains(errorMessage, countMax)) {
                toast('尝试次数过多，请稍后再试！');
                return
            }
            if (isContains(errorMessage, deletedError)) {
                toast('商品已经出售，不能删除！');
                return
            }
            if (isContains(errorMessage, smsCountMax)) {
                toast('短信频率过多，请稍后再试！');
                return
            }
            if (isContains(errorMessage, lessMoney)) {
                toast('余额不足！');
                return
            }
            if (isContains(errorMessage, userTypeerror)) {
                toast('账号类型错误,请重新登录！');
                return
            }
            if (isContains(errorMessage, passwordError)) {
                toast("密码错误");
                return
            }
            if (isContains(errorMessage, mobileError)) {
                toast('手机验证码错误！');
                return
            }
            if (isContains(errorMessage, newMobileStr)) {
                toast('新手机验证码错误！');
                return
            }
            if (isContains(errorMessage, emailError)) {
                toast('邮箱验证码错误！');
                return
            }
            if (isContains(errorMessage, oldMobileError)) {
                toast('原手机验证码错误！');
                return
            }
            if (isContains(errorMessage, oldEmailError)) {
                toast('原邮箱验证码错误！');
                return
            }
            if (isContains(errorMessage, newMobileError)) {
                toast('新手机验证码错误！');
                return
            }
            if (isContains(errorMessage, newEmailError)) {
                toast('新邮箱验证码错误！');
                return
            }
            if (isContains(errorMessage, oldPasswordError)) {
                toast('原密码填写错误，请重新填写！');
                return
            }
            if (isContains(errorMessage, sensitive)) {
                toast('含有敏感词');
                return;
            }
            // alert(errorMessage)
        },
        error: function () {
            alert('服务器错误，请稍后再试');
            window.parent.location.href = '/login.html';
        }
    });
}
//fileWrap上传文件的父容器，上传文件的input，
function imgUpload(fileWrap, fileEle, url, callback) {
    $(fileWrap).delegate(fileEle, "change", function (ev) {
        var ev = ev || event;
        ev.preventDefault();
        if (!$(this)[0].files[0]) {
            return;
        }
        var formdata = new FormData();
        formdata.append("file", $(fileEle)[0].files[0]);
        $.ajax({
            url: url,
            type: 'POST',
            cache: false,
            processData: false,
            contentType: false,
            data: formdata,
            success: function (imgUrl, status, xhr) {
                var file = $(fileEle);
                file.after(file.clone().val(""));
                file.remove();
                var token = xhr.getResponseHeader('__token__');
                setCookie('__token__', token, 30);
                callback(imgUrl);
            },
            error: function (error) {
            }
        });
    });
}
/*text(+标题的弹窗)/contentDom（+输入框的弹框）fun(确认按钮) fun2（取消按钮）*/
function model(_model) {
    $('#popup,#popup-model').remove();
    _model._size = _model.size ? _model.size : ["521px", "233px"]; //模态框框的尺寸
    _model._btnCss = _model.btnCss ? _model.btnCss : ["#E80D22", "#E80D22", "#FFFFFF", 0];//数字位为第几个按钮
    _model._title = _model.title ? _model.title : ""; //标题
    _model._contentDom = _model.contentDom ? _model.contentDom : ""; //主体内容
    _model._btnName = _model.btnName ? _model.btnName : "确定"; // 只有一个按钮的名字
    _model._btnId = _model.btnId ? _model.btnId : "cc"; // 只有一个按钮时的id
    _model._noBtnId = _model.noBtnId ? _model.noBtnId : "aa"; //当需要传id时
    _model._sureBtnId = _model.BtnId ? _model.BtnId : "bb"; //当需要传id时
    _model._sureBtnName = _model.sureBtnName ? _model.sureBtnName : "确定"; //两个按钮的确定按钮的名字
    _model._dismissBtn = _model.dismissBtn ? _model.dismissBtn : "取消"; //两个按钮的取消按钮的名字
    _model._btn = _model.btn ? _model.btn : 1;

    var $modelHtml = '<div id="popup"></div>' +
        ' <div id="popup-model">' +
        '     <div class="popup-close"></div>' +
        '     <p id="model-title"></p>' +
        '     <div class="model-content"></div>' +
        '     <div class="popup-footer"></div>' +
        ' </div>';
    $('html').prepend($modelHtml);
    var $popup = $('#popup');
    var $content = $('#popup-model');
    var $contentTitle = $('#model-title');
    var $popupClose = $content.find('.popup-close');
    var popupFooter = $content.find('.popup-footer');
    if (_model._btn === 1) {
        popupFooter.append('<div id=' + _model._btnId + '>' + _model._btnName + '</div>');
    } else if (_model._btn === 2) {
        popupFooter.append('<div id=' + _model._noBtnId + ' class="no-btn">' + _model._dismissBtn + '</div>' +
            '<div id=' + _model._sureBtnId + ' class="sure-btn">' + _model._sureBtnName + '</div>')
    }
    $content.css({
        "width": _model._size[0],
        "height": _model._size[1]
    });
    if (_model.btn === 1) {
        $(".popup-footer").find("div").css({
            "background": _model._btnCss[0],
            "borderColor": _model._btnCss[1],
            "color": _model._btnCss[2]
        })
    }
    if (_model.btn === 2) {
        $(".popup-footer").find("div").eq(_model._btnCss[3]).css({
            "background": _model._btnCss[0],
            "borderColor": _model._btnCss[1],
            "color": _model._btnCss[2]
        });
        $(".popup-footer").find("div").eq(1).css({
            "background": "#E80D22",
            "borderColor": "#E80D22",
            "color": "#FFFFFF"
        })
    }
    $popupClose.click(function (ev) {
        var ev = ev || event;
        ev.preventDefault();
        $('#popup,#popup-model').fadeOut()
    });
    $contentTitle.text(_model._title);
    $content.find('.model-content').html(_model._contentDom);
    $('#' + _model._btnId).click(function (ev) {
        var ev = ev || event;
        ev.preventDefault();
        if (_model.btnFun3) {
            var flag = _model.btnFun3();
            if (flag) {
                $('#popup,#popup-model').fadeOut();
            }
        } else {
            $('#popup,#popup-model').fadeOut();
        }
    });
    $('.sure-btn').click(function (ev) {
        if (_model.btnFun) {
            _model.btnFun();
        } else {
            // $popup.hide();
            $('#popup,#popup-model').fadeOut();
        }
        $(this).unbind("click");//为了复用下次要清除上次的事件
    });
    $('.no-btn').click(function (ev) {
        if (_model.btnFun2) {
            _model.btnFun2();
        } else {
            $('#popup,#popup-model').fadeOut();
        }
        $(this).unbind("click");//为了复用下次要清除上次的事件
    });
}
function toast(title){
    var $toastHtml =
        ' <div id="toast">' +
        '     <p>' + title + '</p>' +
        ' </div>';
    $('body').append($toastHtml);
    setTimeout(function () {
        $('#toast').remove();
    }, 1000)
}
//分页
function generPage(totalPage, totalCount, flag, fun) {
    kkpager.generPageHtml({
        pno: 1,
        //总页码
        total: totalPage,
        //总数据条数
        totalRecords: totalCount,
        isShowFirstPageBtn: false, //是否显示首页按钮
        isShowLastPageBtn: false, //是否显示尾页按钮
        isShowPrePageBtn: true, //是否显示上一页按钮
        isShowNextPageBtn: true, //是否显示下一页按钮
        isShowTotalPage: false, //是否显示总页数
        isShowCurrPage: false,//是否显示当前页
        isShowTotalRecords: false, //是否显示总记录数
        isGoPage: false,	//是否显示页码跳转输入框
        isWrapedPageBtns: true,	//是否用span包裹住页码按钮
        isWrapedInfoTextAndGoPageBtn: false, //是否用span包裹住分页信息和跳转按钮
        mode: 'click',//默认值是link，可选link或者click
        click: function (n) {
            //手动选中按钮
            this.selectPage(n);
            fun(n);
        }
    }, flag)
}
//时间小工具
function getTime(date, fmt) {
    if (!date) {
        date = new Date().getTime()
    }
    if (typeof date === 'string') {
        date = new Date(date.replace(/[.-]/g, '/'))
    }
    if (typeof date === 'number') {
        date = new Date(date)
    }
    var o = {
        'M+': date.getMonth() + 1,
        'D+': date.getDate(),
        'h+': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12,
        'H+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds(),
        'q+': Math.floor((date.getMonth() + 3) / 3),
        'S': date.getMilliseconds()
    };
    var week = {
        '0': '\u65e5',
        '1': '\u4e00',
        '2': '\u4e8c',
        '3': '\u4e09',
        '4': '\u56db',
        '5': '\u4e94',
        '6': '\u516d'
    };
    if (/(Y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    if (/(E+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? '\u661f\u671f' : '\u5468') : '') + week[date.getDay() + ''])
    }
    for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
        }
    }
    return fmt
}
//判断发布日期是否是今天
function isToday(publishDate) {
    var today = getTime('', "YYYYMMDD");
    var publish = getTime(publishDate, "YYYYMMDD");
    if (today == publish) {
        return getTime(publishDate, "HH:mm");
    } else {
        return getTime(publishDate, "YYYY-MM-DD");
    }
}
//根据输入的生日自动获取星座
function getAstro(month,day){
    var s="魔羯水瓶双鱼白羊金牛双子巨蟹狮子处女天秤天蝎射手魔羯";
    var arr=[20,19,21,20,21,22,23,23,23,24,23,22];
    return s.substr(month*2-(day<arr[month-1]?2:0),2);
}
//限制字节数
function valCheck(el, maxLen) {
    var tempCount = 0;
    for (var i = 0; i < el.val().length; i++) {
        var charCode = el.val().charCodeAt(i);
        if (charCode >= 0 && charCode <= 128) {
            tempCount++;
        } else {
            tempCount += 2;
        }
        if (tempCount > maxLen) {
            if (i < el.val().length) {
                toast('限制10个字');
            }
            el.val(el.val().substr(0, i));
            break;
        }
    }
}

