/**
 * Created by Administrator on 2017/12/27.
 */
/**
 * Created by Administrator on 2017/9/1.
 * header/footer
 */
(function  () {
    var $body = $("body");
    // var $wrap = $('.wrap');
    var _footer;
    _footer = '<footer class="footer"> © 中青数联科技（北京）有限公司 <br> <a href="http://www.miitbeian.gov.cn">京ICP备18013705号-1 中青树</a></footer>';
    $body.append(_footer);
    $('.account-setting-name').on("click",function () {
        $('.account-setting').toggle()
    });
    var rideoResume = $('#rideoResume');
    rideoResume.hide();
    $("#newsIcon").text(localStorage.getItem("countNotRead"));
    var count = '';
    // getNotReadCount();
    //查询有几条消息
    function getNotReadCount() {
        ajax("/services/message/count/not/read",{clientType :102500},function (result) {
            if(count == result.datas[0].count){
                return false
            }
            count = result.datas[0].count;
            localStorage.setItem("countNotRead",count);
            if(count){
                $("#newsIcon").show().text(localStorage.getItem("countNotRead"));
            }else {
                $("#newsIcon").hide();
            }
        })
    }
   // 获取视频房间号
   // getRoomId();
   var timer,
       roomId,
       preRoom = 0,
       currRoom = 0;
    // localStorage.setItem("roomId",null);
    function getRoomId() {
        ajax('/services/connect/room/try/connect',{clientType:102500},function (result) {
            if(result.datas.length){
                // currRoom = result.datas[0].roomId;
                // rideoResume.show();
                // timer = setInterval(getRadio,1000);
                clearInterval(timer);
                rideoResume.show();
                timer = setInterval(getRadio,1000);
                localStorage.setItem("roomId",result.datas[0].roomId);
                localStorage.setItem("roomPositionId",result.datas[0].positionId);
                localStorage.setItem("roomUserId",result.datas[0].userId);
                localStorage.setItem("roomCompanyId",result.datas[0].companyId);
                setTimeout(function() {
                    rideoResume.hide();
                    clearInterval(timer);
                },60000)
            }
            // else{
            //     rideoResume.hide();
            //     clearTimeout(timer);
            // }
            /*roomId = localStorage.getItem('roomId');
            if(roomId != 'null'){
                rideoResume.show();
                timer = setInterval(getRadio,1000);
            }*/
        })
    }
    rideoResume.click(function () {
        rideoResume.hide();
        clearInterval(timer);
    });
    // setInterval(getNotReadCount,5000);
    // setInterval(getRoomId,5000);
    // var timer = setInterval(getRadio,1000);
    var $radioMsg = $("#radioMsg");
    function getRadio() {
        $radioMsg.animate({opacity:"0"},250);
        $radioMsg.animate({opacity:"1"},499)
    }
    $('.signOut').on("click",function () {
        model({
            size:['445px',"281px"],
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
    var userAgent = navigator.userAgent;
    var isChrome = userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1;
    var isIE = userAgent.indexOf('NET') != -1 && userAgent.indexOf("rv") != -1;
    rideoResume.click(function () {
        var positionId = +localStorage.getItem('roomPositionId');
        if(isIE){
            window.open('./video.html?positionId='+localStorage.getItem('roomPositionId'));
        }else if(isChrome){
            window.open('./chromeVideo.html?positionId='+localStorage.getItem('roomPositionId'));
        }else{
            alert('请使用IE9+或谷歌浏览器');
        }

    });
    /*$('.myResume').on("click",function () {
        if (localStorage.getItem("intention")==="null"){
            model({
                size:['500px',"200px"],
                title:"请完善简历",
                btnName:"完成",
                btnClass:"addResume",
                btn:1,
                btnFun3:function (ev) {
                    var ev = ev || event;
                    ev.preventDefault();
                    window.location.href = "/fillResume.html"
                }
            });
        }else {
            window.location.href = "/editResume.html"
        }
    })*/
})();