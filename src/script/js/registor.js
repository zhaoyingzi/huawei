//5.tab切换
;(function($){
    var $btn=$('.tab a');
    var $cont=$('.log-details');

    $btn.on('click',function(){
        $(this).addClass('tel').siblings().removeClass('tel');
        $cont.eq($(this).index()).addClass('show').siblings().removeClass('show')
    })
})(jQuery);

//7.注册
