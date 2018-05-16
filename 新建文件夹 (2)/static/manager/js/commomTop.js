/**
 * Created by Administrator on 2018/1/9.
 */
var commonTop = '<nav class="navbar-top clearfix"><div class="navbar-compony-name"><button class="btnRight" style="margin-right: 30px" type="button"><span id="username"></span><span class="caret"></span></button>'+
    '<ul class="information"><li class="modif-password">修改密码</li><li class="see-account">查看账号</li><li class="sign-out">退出登录</li></ul></div><div style="margin-left: 30px" class="navbar-header"><a href="javascript:;" id="index"><img style="margin-top: 10px" src="/img/logo-white.png"></a></div></nav>';
$("body").prepend(commonTop);
$('#username').text(localStorage.getItem('username'));
$(".btnRight").click(function () {
    $(".information").toggle()
});
$(".see-account").click(function () {
    window.location.href = "/personalCenter.html"
});
$(".modif-password").click(function () {
    window.location.href = "/modifyPassword.html"
});
$("#index").click(function () {
    var isSubAccount = localStorage.getItem("isSubAccount");
    if(isSubAccount==1){
        window.location.href = "/mcbn/services/admint/resume/recruit"
    }else {
        window.location.href = "/verify.html"
    }
});
$(".sign-out").click(function () {
    if($("#closeBox").length == 0) {
        $("body").append('<div class="tc_box" id="closeBox" style="z-index: 1001;">' +
            '    <div class="tc_box_con" style="height:280px;">' +
            '        <div class="close_tc" id="closeX">' +
            '            <img src="/static/images/Group 2.png"/>' +
            '        </div>' +
            '        <div class="tc_box_contitle" style="margin-bottom: 20px;padding-top: 52px;line-height: 28px;position: relative;text-align: center;color: #3D3D3D;font-size: 20px;">' +
            '            退出登录' +
            '        </div>' +
            '        <div class="tc_p" style="text-align: center;font-size: 16px;">确定要退出登录吗？</div>' +
            '        <button class="tc_btn" id="buttonRegister" style="background: #E80D22;width: 330px;height: 46px;border: 0;overflow: hidden;display: block;margin: 50px auto 30px auto;border-radius: 5px;text-align: center;line-height: 46px;color: #FFF;font-size: 18px;">完成</button>' +
            '    </div>' +
            '</div>');
        $('#closeX').click(function () {
            $('#closeBox').hide();
        });

        $('#buttonRegister').click(function () {
            window.location.href = "https://admin.zqtree.com";
        });
    }
    $(".information").toggle();
    $('#closeBox').show();
});