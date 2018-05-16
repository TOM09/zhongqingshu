(function  () {
    var $body = $("body");
    // var $wrap = $('.wrap');
    _header = '<div class="Header">'+
        '<dl class="Login_topdl">'+
        '<dt><img src="../img/logo.png" style="width:111px;height:43px;"></dt>'+
        '<dd><a href="">我是求职者</a> | <a href="">APP</a></dd>'+
    '</dl>'+
    '</div>';
    $body.prepend(_header);
})();