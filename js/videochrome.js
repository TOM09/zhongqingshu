var g_userSig = "";
var g_roomId="";
var g_id="";
var g_sdkappid = 1400068068;
var g_accountType = 23106;
var postfun;
var hasseeker=false;
/* 
下面的工作简单说分为3步
Step1. 先做好准备，定义好一系列回调
Step2. 初始化
Step3. 进入房间（创建/加入在这里是同一个方法）
 */

 

// Step1. 先做好准备，定义好一系列回调
var rtclistener = {
    onKickout: onKickout,
    onInitResult: onInitResult,
    onLocalStreamAdd: onLocalStreamAdd,
    onRemoteStreamAdd: onRemoteStreamAdd,
    onUpdateRemoteStream: onUpdateRemoteStream,
    onRemoteStreamRemove: onRemoteStreamRemove,
    onWebSocketClose: onWebSocketClose,
    onRelayTimeout: onRelayTimeout,
    onIceConnectionClose: $.noop,
    onChangeRemoteStreamState: $.noop,
};


function onKickout() {
    console.log("on kick out!");
}

function onRelayTimeout(msg) {
    console.log("on kick out!", msg);
    alert("on kick out!" + (msg ? JSON.stringify(msg) : ""));
}

function onCreateRoomCallback(result) {
    if (result !== 0) {
        alert("create room failed!!!");
        return;
    }
}


function onLocalStreamAdd(stream) {
    if (stream)
    {
        document.querySelector("#localVideo").srcObject = stream;
    }
}

function onRemoteStreamAdd(stream, videoId) {
    hasseeker=true;
    if (stream)
    {
        document.querySelector("#remoteVideo").srcObject = stream;
    }
}

function onUpdateRemoteStream(stream, videoId) {
    onRemoteStreamAdd(stream, videoId);
}

function onRemoteStreamRemove(stream, videoId) {
    document.querySelector("#remoteVideo").srcObject = null;
}

function onWebSocketClose() {
    WebRTCAPI.quit();
}

function onInitResult(result) {
    if (result !== 0) {
        var errorStr = "";
        if (result === -10001) {
            errorStr = "WebRTCJSAPI初始化参数不正确";
        } else if (result === -10002) {
            errorStr = "浏览器版本不正确";
        } else if (result === -10003) {
            errorStr = "sig校验失败";
        } else if (result === -10006) {
            errorStr = "WebSocket 初始化失败";
        } else {
            errorStr = "初始化错误";
        }
        alert(errorStr);
        postfun(false);
    } else {
        //可以把创建房间这一步->初始化成功后
        // Step3. 进入房间
        // roomid 一定要是整形
        // role 是什么呢？ 
        // role 是spear配置定义的角色名，这将决定您推流用到的分辨率/码率/帧率等等配置
        // 可以在控制台找到  请看 https://sxb.qcloud.com/webrtcapi/ 
        WebRTCAPI.createRoom({
            roomid : g_roomId,
            role : 'LiveMaster'
        }, function(res){
            if (res !== 0) {
                postfun(false);
                alert("create room failed!!!");
            } else {
                postfun(true);
            }
        });
    }
}


function login(){

    var ret = WebRTCAPI.init(rtclistener, {
                    "webim": true,
                    "openid": g_id,
                    "userSig": g_userSig,
                    "sdkAppId": g_sdkappid,
                    "accountType": g_accountType,
                    "closeLocalMedia": false
                });

}
