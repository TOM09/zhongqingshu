/**
 * Created by Administrator on 2018/1/24.
 */
var accorgionStr;
var isSubAccount = localStorage.getItem("isSubAccount");
    if(isSubAccount == 1){
        accorgionStr = '<ul id="accordion" class="accordion">'+
            '<li><div class="link"><span class="glyphicon glyphicon-briefcase"></span>&nbsp;招聘</div>'+
            '<ul class="submenu">'+
            '<li class="linkChild"><a href="/mcbn/services/admint/resume/recruit"> ▪ 职位</a></li>'+
            '<li class="linkChild"><a href="/mcbn/services/admint/resume/recruitResume"> ▪ 简历</a></li>'+
            '</ul>'+
            '</li>'+
            '<li><div class="link"><span class="glyphicon glyphicon-book"></span>&nbsp;培训</div></li>'+
            '<li><div class="link"><span class="glyphicon glyphicon-stats"></span>&nbsp;政策</div></li>'+
            '</ul>';
    }else {
        accorgionStr = '<ul id="accordion" class="accordion">'+
            '<li>'+
            '<div class="link"><span class="glyphicon glyphicon-exclamation-sign"></span>&nbsp;审核</div>'+
            '<ul class="submenu">'+
            '<li class="linkChild"><a href="/verify.html"> ▪ 企业认证</a></li>'+
            '<li class="linkChild"><a href="/videoVerify.html"> ▪ 视频简历</a></li>'+
            '</ul>'+
            '</li>'+
            '<li>'+
            '<div class="link"><span class="glyphicon glyphicon-user"></span>&nbsp;用户</div>'+
            '<ul class="submenu">'+
            '<li class="linkChild"><a href="/enterpriseUser.html"> ▪ 企业</a></li>'+
            '<li class="linkChild"><a href="/personalUser.html"> ▪ 求职者</a></li>'+
            '</ul>'+
            '</li>'+
            '<li>'+
            '<div class="link"><span class="glyphicon glyphicon-align-justify"></span>&nbsp;财务</div>'+
            '</li>'+
            '<li><div class="link"><span class="glyphicon glyphicon-asterisk"></span>&nbsp;子账号</div></li>'+
            '<li><div class="link"><span class="glyphicon glyphicon-heart"></span>&nbsp;公益</div></li>'+
            '</ul>';
    }

$("body").prepend(accorgionStr);
$(function() {
    var linkLi = $('#accordion').children('li');
    var Accordion = function(el, multiple) {
        this.el = el || {};
        this.multiple = multiple || false;
        var links = this.el.find('.link');
        links.on('click', {el: this.el, multiple: this.multiple}, this.dropdown)
    };
    Accordion.prototype.dropdown = function(e) {
        var $el = e.data.el,
            $this = $(this),
            $next = $this.next();
        $next.slideToggle();
        $this.parent().toggleClass('open');
        if (!e.data.multiple) {
            $el.find('.submenu').not($next).slideUp();
        }
    };
    var accordion = new Accordion($('.accordion'), false);
    linkLi.click(function () {
        var index = $(this).index();
        switch (index) {
            case 0: break;
            case 1:
                isSubAccount == 1 ? window.location.href = '/mcbn/services/admint/train/trainManage': '';
                break;
            case 2:
                isSubAccount == 1 ? window.location.href = '/mcbn/services/admint/policy/policyManage': window.location.href = '/finance.html';
                break;
            case 3:
                window.location.href = '/permission.html';
                break;
            case 4:
                window.location.href = '/mcbn/services/admint/publicgood/querylike';
                break;
        }
    });
});