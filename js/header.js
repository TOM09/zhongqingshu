/**
 * Created by Administrator on 2017/12/27.
 */
/**
 * Created by Administrator on 2017/9/1.
 * header/footer
 */
(function  () {
    var $body = $("body");
    var $head = $('head');
    // var $wrap = $('.wrap');
    var _header;
    var username = localStorage.getItem("username")? localStorage.getItem("username") : "待完善";
    var script = '<script type="text/javascript" src="js/common.js"></script><link rel="stylesheet" type="text/css" href="css/toast.css">'
    console.log(localStorage.getItem("username"))
    _header = '<div class="top_bg">\n' +
        '    <div id="site-nav">\n' +
        '        <ul class="quick-menu">\n' +
        '            <li><a href="/news.html">消息</a><i id="messageCount">0</i>|</li>\n' +
        '            <li><a href="/createPosition.html">发布职位</a>|</li>\n' +
        '            <li><a href="/resumeManage.html">简历管理</a>|</li>\n' +
        '            <li><a href="/positionManage.html">职位管理</a>|</li>\n' +
        '            <li class="menu-item">\n' +
        '                <div class="menu">\n' +
        '                    <a class="menu-hd" href="javascript:void(0);" id="lusername" >'+username+'<b></b></a>\n' +
        '                    <div class="menu-bd">\n' +
        '                        <a href="../certificateInfo.html">认证信息</a>\n' +
        '                        <a href="../userModify.html">个人信息</a>\n' +
        '                        <a href="../companyInfoModeify.html">企业信息</a>\n' +
        '                        <a href="../accountModify.html">账号设置</a>\n' +
        '                        <a href="javascript:void(0);" class="logout">退出登录</a>\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '            </li>\n' +
        '        </ul>\n' +
        '    </div>\n' +
        '</div>'+
        '<div class="Header">'+
        '<dl class="Login_topdl">'+
        '<dt><img src="../img/logo.png" style="width:111px;height:43px;"></dt>'+
        '<dd class="nav" style="padding-left:20px;"><a href="../manageIndex.html" class="active">首页</a><a href="../resumeSearch.html">招聘</a><a href="../publicWelfare.html">公益</a><a href="../train.html">培训</a><a href="../policy.html">政策</a><a href="">APP</a></dd>'+
    '</dl>'+
    '</div>';
    $body.prepend(_header);
    $head.append(script);
    $('.account-setting-name').on("click",function () {
        $('.account-setting').toggle()
    });
    var rideoResume = $('#rideoResume');
    rideoResume.hide();
    $("#messageCount").text(localStorage.getItem("countNotRead"));
    var count = '';
    getNotReadCount();
    //查询有几条消息
    function getNotReadCount() {
        ajax("/services/message/count/not/read",{clientType :102500},function (result) {
            if(count == result.datas[0].count){
                return false
            }
            count = result.datas[0].count;
            localStorage.setItem("countNotRead",count);
            if(count){
                $("#messageCount").show().text(localStorage.getItem("countNotRead"));
            }else {
                $("#messageCount").hide();
            }
        })
    }
    setInterval(getNotReadCount,5000);
    $('.logout').on("click",function () {
        model({
            size:['445px',"260px"],
            title:"退出登录",
            btn:1,
            btnId:"logout",
            contentDom:' <div style="text-align: center; color: #3D3D3D">确定退出登录吗？</div> ',
            btnFun3:function () {
                ajax("/services/user/logout",{clientType:102500},function () {
                    setCookie("__token__", null,-10);
                    window.location.href = "/login.html"
                })
            }
        });
    });
})();