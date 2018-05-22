/**
 * Particleground demo
 * @author Jonathan Nicol - @mrjnicol
 */
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
function autoPlay2() {
    time = setInterval(function () {
        queryCountNotRead()
    }, 10000);
}
function queryCountNotRead() {
    var countNotRead = "/services/message/count/not/read/";
    var data5 = {}
    data5.clientType = 102500;
    ajax((countNotRead), data5, function (result) {
        if (result.status == "success") {
            if (result.datas[0]) {
                $("#messageCount").text(result.datas[0].count)
            }
        }
    });
}
function isContains(str, substr) {
    return new RegExp(substr).test(str);
}
function ajax(url, data, successCallback) {
    if (typeof data === 'object') {
        data = JSON.stringify(data)
    }
    $.ajax({
        type: 'POST',
        url: url,
        contentType: "application/json;charset=UTF-8",
        async: true,
        data: data,
        success: function (result, status, xhr) {
            successCallback(result);
            var sensitive = 'Some words are sensitive!';
            var errorMessage = '';
            !result.errorMessage ? errorMessage = result : errorMessage = result.errorMessage;
            if (isContains(errorMessage, sensitive)) {
                toast('含有敏感词');
                return;
            }
        },
        error: function () {
            console.log('服务器错误，请稍后再试');
        }
    });
}
function ajax2(url, data, successCallback) {
    if (typeof data === 'object') {
        data = JSON.stringify(data)
    }
    $.ajax({
        type: 'POST',
        url: url,
        contentType: "application/json;charset=UTF-8",
        async: true,
        data: data,
        success: function (result, status, xhr) {
            var resultCode = result.resultCode;
            if (resultCode == 1) {
                var token = xhr.getResponseHeader('__token__');
                $.cookie('__token__', token, {path: '/'});
                $.cookie('userId', result.datas[0].id, {path: '/'});
                $.cookie('companyId', result.datas[0].companyId, {path: '/'});
            }
            successCallback(result);
        },
        error: function () {
            console.log('服务器错误，请稍后再试');
        }
    });
}
function ajax3(url, data, successCallback) {
    $.ajax({
        type: 'POST',
        url: url,
        contentType: "application/json;charset=UTF-8",
        async: true,
        data: data,
        success: function (result, status, xhr) {
            successCallback(result);
        },
        error: function () {
            console.log('服务器错误，请稍后再试');
        }
    });
}
//async 异步的
function ajaxasync(url, data, successCallback) {
    if (typeof data === 'object') {
        data = JSON.stringify(data)
    }
    $.ajax({
        type: 'POST',
        url: url,
        contentType: "application/json;charset=UTF-8",
        async: false,
        data: data,
        success: function (result, status, xhr) {
            successCallback(result);
        },
        error: function () {
            console.log('服务器错误，请稍后再试');
        }
    });
}
function buildPage(elem, currPage, totalPage, func, conditions) {
    var pre = currPage <= 1 ? -1 : currPage - 1;
    var next = currPage >= totalPage ? -1 : currPage + 1;
    var p = "<li><a style='cursor:pointer' class='pagena' id='" + pre + "' >上一页</a></li>";
    if (pre == -1) {
        p = "<li><a style='cursor:pointer;color:#C0C0C0;' class='pagena' id='pren' >上一页</a></li>";
    }
    var startPage = currPage - 2;
    if (startPage < 1) {
        startPage = 1;
    }
    for (var i = startPage; i <= totalPage; i++) {
        if (i == (startPage + 3) && i < totalPage) {
            p += "<li><a class='pagena' style='cursor:pointer' id='" + i + "'>...</a></li>"
        } else if (i > (startPage + 3) && i < totalPage) {
            continue;
        } else {
            p += "<li><a class='pagena' style='cursor:pointer;" + (i == currPage ? 'color:white;background-color:#E80D22;' : '') + "' id='" + i + "'>" + i + "</a></li>"
        }
    }
    var p2 = "<li><a class='pagena' style='cursor:pointer' id='" + next + "'>下一页</a></li>"
    if (next == -1) {
        p2 = "<li><a style='cursor:pointer;color:#C0C0C0;' id='nextn' >下一页</a></li>";
    }
    p += p2;
    $("#" + elem).html(p);
    if (pre == -1) {
        $("#pren").addClass("focus").css("pointer-events", "none");
    }
    if (next == -1) {
        $("#nextn").addClass("focus").css("pointer-events", "none");
    }

    //注册点击分页事件
    $(".pagena").on("click", function () {
        var id = $(this).attr("id");
        eval(func + "(" + id + ",'" + conditions + "')");
    });

}

//buildPage2函数   （目标，当前页，页码总数，回调函数(即，点击分页按钮触发的方法)）
function buildPage2(elem, currPage, totalPage, func, conditions) {
	//上一页，currpage <=1 返回-1，否则返回currPage-1
    var pre = currPage <= 1 ? -1 : currPage - 1;
    //下一页。
    var next = currPage >= totalPage ? -1 : currPage + 1;
    var p = "<li><a style='cursor:pointer' class='pagena' id='" + elem + pre + "' >上一页</a></li>";
    if (pre == -1) {
    	//如果只有一页，id叫这个名字
        p = "<li><a style='cursor:pointer;color:#C0C0C0;' class='pagena' id='" + elem + "pren' >上一页</a></li>";
    }
    //开始页 = 当前页数-2
    var startPage = currPage - 2;
    //如果开始页数<1   就让它等于1  即不满20
    if (startPage < 1) {
        startPage = 1;
    }
    //循环页码长度
    //
    for (var i = startPage; i <= totalPage; i++) {
    	//如果i = 初始页 +3 并且 i<总页码数  说明是首页 并且有多页
        if (i == (startPage + 3) && i < totalPage) {
        	//使id+
            p += "<li><a class='pagena' style='cursor:pointer' id='" + elem + i + "'>...</a></li>"
        } else if (i > (startPage + 3) && i < totalPage) {
        	//如果i》3页 且  <总页数，继续
            continue;
        } else {
        	//
            p += "<li><a class='pagena' style='cursor:pointer;" + (i == currPage ? 'color:white;background-color:#E80D22' : '') + "' id='" + elem + i + "'>" + i + "</a></li>"
        }
    }
    //
    var p2 = "<li><a class='pagena' style='cursor:pointer' id='" + elem + next + "'>下一页</a></li>"
    //如果next 为-1   p2
    if (next == -1) {
        p2 = "<li><a style='cursor:pointer;color:#C0C0C0;' id='" + elem + "nextn' >下一页</a></li>";
    }
    p += p2;
    $("#" + elem).html(p);
    if (pre == -1) {
        $("#" + elem + "pren").addClass("focus").css("pointer-events", "none");
    }
    if (next == -1) {
        $("#" + elem + "nextn").addClass("focus").css("pointer-events", "none");
    }

    //注册点击分页事件
    $(".pagena").on("click", function(){
        var id = $(this).attr("id");
        //点击后执行queryAllPositionOnline函数
        eval(func + "(" + id.replace(elem, "") + ",'" + conditions + "')");

    });
}
function replaceRealImgPath(content) {
    $("body").append('<div id="tempUediv" style="display: none;">' + content + '</div>');
    var imgObjs = $("#tempUediv").find("img[alt]");
    for (var i = 0; i < imgObjs.length; i++) {
        var tempPath = $(imgObjs[i]).attr("src").replace("/images/", "");
        var data = {};
        data.clientType = 102500;
        data.realFilePath = tempPath;
        ajaxasync("/services/upload/cms/image/confirm", data, function (result) {
            if (result.resultCode == 1) {
                $(imgObjs[i]).attr("src", "/images/" + result.datas[0])
            }
        });
    }
    var newcontent = $("#tempUediv").html();
    $("#tempUediv").remove();
    return newcontent;
}


window.onload = function () {
    queryCountNotRead()
    autoPlay2();
    $("#lusername").html($.cookie('userName') + "<b></b>");
}
//时间小工具
function getTime(date, fmt) {
    if (!date) {
        date = new Date().getTime()
    }
    if (date) {
        date = new Date(date).getTime()
    }
    /*if (typeof date === 'string') {
     date = new Date(date.replace(/[.-]/g, '/'))
     }*/
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


