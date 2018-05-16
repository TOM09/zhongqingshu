var sdk;
var g_localRender = null;
var g_renders = new Array();
var g_userSig = "";
var g_roomId="";
var g_id="";
var g_sdkappid = 1400068068;
var g_accountType = 23106;
var hasseeker=false;
//状态管理
var StatusManager = {
    camera: 0,
    mic: 0,
    player: 0,
    logined: 0,
    setLogin: function(val) {
        this.logined = val;
        renderButton();
    },
    setCamera: function(val) {
        this.camera = val;
        renderButton();
    },
    setMic: function(val) {
        this.mic = val;
        renderButton();
    },
    setPlayer: function(val) {
        this.player = val;
        renderButton();
    },
    getLogin: function(val) {
        return this.logined;
    },
    getCamera: function() {
        return !!this.camera;
    },
    getMic: function() {
        return !!this.mic;
    },
    getPlayer: function() {
        return !!this.player;
    },
    getAll: function() {
        return {
            camera: this.camera,
            mic: this.mic,
            player: this.player,
            logined: this.logined,
        }
    },
    reset: function(cb) {
        this.camera = 0;
        this.mic = 0;
        this.player = 0;
        if (cb) {
            cb();
        }
    }
};

var renderButton = function() {
    var status = StatusManager.getAll();
    for (var a in status) {
        $("#btn_open_" + a).prop("disabled", status[a] ? true : false);
        $("#btn_close_" + a).prop("disabled", status[a] ? false : true);
    }
}

function OnInit(f) {
    sdk = new ILiveSDK(g_sdkappid, g_accountType, "iLiveSDKCom");
    sdk.init(function() {
            g_localRender = new ILiveRender("localRender");
            g_renders[0] = new ILiveRender("render0");
            sdk.setForceOfflineListener(onForceOfflineCallback);
            sdk.setRoomDisconnectListener(onRoomDisconnect);
            sdk.setRoomEventListener(onRoomEvent);
            sdk.setDeviceOperationCallback(onDeviceOperation);
            OnBtnLogin(f);
            sdk.setMessageListener(function(msg) {
                alert(msg);
            });
        },
        function(errMsg) {
            sendComplete(false);
        });

}

function OnUninit() {
    sdk.unInit();
}

function OnBtnCreateRoom() {
    sdk.createRoom(g_roomId, E_iLiveAuthBits.AuthBit_LiveMaster, "LiveMaster", function() {
        OnBtnOpenCamera();
        OnBtnOpenMic();
        OnBtnOpenPlayer();
        sendComplete(true);
    }, function(errMsg) {
        sendComplete(false);
    },null); //这个是sdk的事件
}



function OnBtnOpenCamera() {
    var nRet = sdk.getCameraList();
    if (nRet.code != 0) {
        alert("获取摄像头列表出错; 错误码:" + nRet);
        return;
    }
    sdk.openCamera(nRet.devices[0].id);
}


function OnBtnCloseCamera() {
    sdk.closeCamera();
}

function OnBtnOpenMic() {

    var nRet = sdk.getMicList();
    if (nRet.code != 0) {
        alert("获取麦克风列表出错; 错误码:" + nRet);
        return;
    }
    sdk.openMic(nRet.devices[0].id);
}

function OnBtnCloseMic() {
    sdk.closeMic();
}


function OnBtnOpenPlayer() {

    var nRet = sdk.getSpeakerList();
    if (nRet.code != 0) {
        alert("获取扬声器列表出错; 错误码:" + nRet);
        return;
    }
    sdk.openSpeaker(nRet.devices[0].id);
}

function OnBtnClosePlayer() {
    sdk.closeSpeaker();
}

function OnBtnLogin() {
    sdk.login(g_id, g_userSig, function(){
        OnBtnCreateRoom();

    }, function(errMsg){
        sendComplete(false);
    });
}

/**
 * 账号登录互踢
 */
function onForceOfflineCallback() {
    alert("你的账号在其他地方登陆.");
}

/**
 * 失去网络连接超时回调
 */
function onRoomDisconnect(errMsg) {
    alert("SDK已自动退出房间,原因: " + errMsg.code + " " + errMsg.desc);
}

function onRoomEvent(roomevent) {
    if (roomevent.eventid == E_iLiveRoomEventType.HAS_CAMERA_VIDEO) //打开摄像头
    {
        hasseeker = true;
        //为其分配渲染器
        for (i in g_renders) {
            if (g_renders[i].isFreeRender()) {
                g_renders[i].setIdentifer(roomevent.identifier);
                break;
            }
        }
    }
    else if (roomevent.eventid == E_iLiveRoomEventType.HAS_SCREEN_VIDEO)//打开屏幕分享
    {
        g_screenRender.setAuxRoadVideo(true);
    }
}

function onDeviceOperation(oper, code) {
    if (oper == E_iLiveOperType.Open_Camera) {
        if (code != 0) {
            alert("打开摄像头失败; 错误码:" + code);
        }else{
            g_localRender.setIdentifer(g_id);
            StatusManager.setCamera(1);//更新状态
        }
    }
    else if (oper == E_iLiveOperType.Close_Camera) {
        if (code != 0) {
            alert("关闭摄像头失败; 错误码:" + code);
        }
        else {
            StatusManager.setCamera(0);//更新状态
        }
    }
    else if (oper == E_iLiveOperType.Open_Mic) {
        if (code != 0) {
            alert("打开麦克风失败; 错误码:" + code);
        } else {
            StatusManager.setMic(1);//更新状态
        }
    }
    else if (oper == E_iLiveOperType.Close_Mic) {
        if (code != 0) {
            alert("关闭麦克风失败; 错误码:" + code);
        } else {
            StatusManager.setMic(0);//更新状态
        }
    }
    else if (oper == E_iLiveOperType.Open_Player) {
        if (code != 0) {
            alert("打开扬声器失败; 错误码:" + code);
        } else {
            StatusManager.setPlayer(1);//更新状态
        }
    }
    else if (oper == E_iLiveOperType.Close_Player) {
        if (code != 0) {
            alert("关闭扬声器失败; 错误码:" + code);
        } else {
            StatusManager.setPlayer(0);//更新状态
        }
    }
    else if (oper == E_iLiveOperType.Open_Screen_Share) {
        if (code != 0) {
            alert("打开屏幕分享出错; 错误码:" + code);
        }
        else{
            g_screenRender.setAuxRoadVideo(true);
        }
    }
    else if (oper == E_iLiveOperType.Close_ScreenShare) {
        if (code != 0 && code != 8024) { //8024错误码，表示已经处于关闭状态了
            alert("关闭屏幕分享出错; 错误码:" + code);
        }
    }
}

var renderButton = function() {
    var status = StatusManager.getAll();
    for (var a in status) {
        $("#btn_open_" + a).prop("disabled", status[a] ? true : false);
        $("#btn_close_" + a).prop("disabled", status[a] ? false : true);
    }
}
