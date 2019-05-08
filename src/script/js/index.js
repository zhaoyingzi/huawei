// 1.轮播
class slideshow {
    constructor() {
        this.box = $('#banner .wrapper');
        this.picli = $('#banner .wrapper ul li');
        this.circle = $('#banner .wrapper .btns .btn span');
        this.left = $('.button-slider-prev');
        this.right = $('.button-slider-next');
        this.num = 0;
    }
    init() {
        var $_this = this;
        this.box.hover(function () {
            $_this.show();
        }, function () {
            $_this.hide()
        })
        this.right.on('click', function () {
            $_this.num++;
            if( $_this.num>$_this.picli.size()-1){
                $_this.num=0;
            }
            $_this.rightclick();
            $_this.mouseover();
        })
        this.left.on('click',function(){
            $_this.num--;
            if( $_this.num<0){
                $_this.num=$_this.picli.size()-1;
            }
            $_this.leftclick();
            $_this.mouseover();
        })
    
    }
    show() {
        this.left.show();
        this.right.show();
    }
    hide() {
        this.left.hide();
        this.right.hide();
    }
    rightclick() {
        this.picli.eq(this.num).stop(true).animate({
            opacity: 1
        }).siblings('li').stop(true).animate({
            opacity: 0
        })
    }
    leftclick(){
        this.picli.eq(this.num).stop(true).animate({
            opacity: 1
        }).siblings('li').stop(true).animate({
            opacity: 0
        })
    }
    mouseover(){
        this.circle.eq(this.num).addClass('current').siblings('span').removeClass('current');
    }

}
new slideshow().init();

//2.楼梯
;(function($){
    //取元素存变量
    var $loutinav=$('.louti');
    var $navlist=$('.louti li').not('.last');
    var $louceng=$('#container .wrapper');
    //1.滚动鼠标滚轮，楼梯导航显示，window下面的事件
    $(window).on('scroll',function(){
        //存滚动条的距离，取值要取window下面的，设置要设置html或者body下面的
        var $scrolltop=$(window).scrollTop();//滚动滚轮，滚动条距离顶部的距离
        if($scrolltop>=800){
            $loutinav.show();//楼梯导航显示
        }else{
            $loutinav.hide()
        }
        //4.滚动滚动条，楼梯导航显示相应的位置，加类。
        //每个楼层的top值和滚动条的距离作比较
        $louceng.each(function(index,ele){//遍历出每个楼层，，，，，ele是原生js的，转成jquery需要加$()
            $loucengtop1=$(ele).offset().top;//输出每个楼层的top值
            if($loucengtop1>$scrolltop){
                $navlist.removeClass('active');
                $navlist.eq(index).addClass('active');
                return false;
            }
        })
        
    })
    //2.点击楼梯导航的li，跳到对应的模块,其实就是让滚动条的距离改变
    $navlist.on('click',function(){
        //点击的那个楼梯导航的li要显示，其余不显示
        $(this).addClass('active').siblings().removeClass('active');
        //把点击楼梯导航的索引位置给模块,求出top值，给滚动条
        //$(this).index()，当前点击的楼梯的索引，和模块的索引是一一对应的
        var $loucengtop=$louceng.eq($(this).index()).offset().top;//点击的那个楼梯对应的楼层的top值
        $('html,body').animate({
            scrollTop:$loucengtop
        })
    })
    //3.点击回到顶部
    var $last=$('.last');
    $last.on('click',function(){
        $('html,body').animate({
            scrollTop:0
        })
    })
})(jQuery);

//3.首页顶部的弹窗关闭
;(function($){
    var $top=$('#top-banner');
    var $close=$('.top-banner-close')
    $close.on('click',function(){
        $top.hide();
    })
})(jQuery);

//4.二级菜单出现隐藏
;(function(){
    var $bg=$('.category-item');
    $bg.hover(function(){
        $(this).find('.erji-box').show()
    },function(){
        $(this).find('.erji-box').hide()
    })
})();

//6.商品渲染
;(function($){
    $.ajax({
        url: 'http://10.31.163.28/erjieduan/projectname/huawei/php/returngoods.php',
        dataType: 'json',
        success: function (data) {
            //console.log(data);
            var $htmlStr='';
            $.each(data, function (index, value) {
                $htmlStr+=`
                    <li class="good-items">
                        <a href="details.html?sid=${value.sid}">
                            <div class="good-pic">
                                <p>
                                    <img class="lazy" data-original="${value.url}" width='150' height='150'>
                                </p>
                            </div>
                            <div class="good-title">${value.title}</div>
                            <p class="good-des">${value.des}</p>
                            <p class="good-price">￥${value.price}</p> 
                        </a>
                    </li>
                `;
            });
            $('#container .wrapper .phone .pic-list .good-list ul').html($htmlStr);
            //7.懒加载
            $(function () {
                $('.lazy').lazyload({
                    effect: "fadeIn"
                });
            });
        }
    });

})(jQuery);





