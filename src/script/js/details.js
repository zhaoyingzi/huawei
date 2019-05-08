
//数据渲染
; (function () {
    var $sid = location.search.substring(1).split('=')[1];
    $.ajax({
        url: 'http://10.31.163.28/erjieduan/projectname/huawei/php/details.php',
        data: {
            sid: $sid
        },
        dataType: 'json',
        success: function (data) {
            //console.log(data);
            var $listarr = data.urllist.split(',');
            var $listStr = '';
            $.each($listarr, function (index, value) {
                $listStr += '<li><img src="' + value + '"></li>';
            });

            var $htmlstr = `
                 <div class="wrap">
                     <div id="xt">
                         <img src="${data.url}" alt="" id="smallpic">
                         <div id="xf"></div>
                     </div>
                     <div id="df">
                         <img src="${data.url}" alt="" id="dt">
                     </div>
                     <div id="ulist">
                         <a href="javascript:;" id="left">&lt;</a>
                         <div id="list">
                             <ul>
                                 ${$listStr}
                             </ul>
                         </div>
                         <a href="javascript:;" id="right">&gt;</a>
                     </div>
                 </div>
             
             <div class="right">
                <div>
                    <h1 class="title">${data.title}</h1>
                    <div class="price">
                        <lable>价&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格&nbsp;&nbsp;&nbsp;&nbsp;</lable>
                        <span>抢购价&nbsp;&nbsp;</span>
                        <span class="s"><em>￥</em>${data.price}</span>
                    </div>
                    <div class="line"></div>
                    <div class="btn">
                        <div class="shu">数量<span>0</span></div>
                        <div class="cart">
                            <a class="c"><span>加入购物车</span></a>
                            <a class="d"><span>立即下单</span></a>
                        </div>
                    </div>
                </div>
             </div>
             `;

            $('.goods').html($htmlstr);

            //放大镜效果
            !function () {
                $('#xf').width($('#xt').width() * $('#df').width() / 1000);
                $('#xf').height($('#xt').height() * $('#df').height() / 1000);
                var bili = $('#dt').width() / $('#xt').width();
                $('#xt').hover(function () {
                    $('#xf').css('visibility', 'visible');
                    $('#df').css('visibility', 'visible');
                    $(this).on('mousemove', function (ev) {
                        var $left = ev.pageX - $('.goods').offset().left - $('#xf').width() / 2;
                        var $top = ev.pageY - $('.goods').offset().top - $('#xf').height() / 2;
                        if ($left < 0) {
                            $left = 0;
                        } else if ($left >= $('#xt').width() - $('#xf').width()) {
                            $left = $('#xt').width() - $('#xf').width();
                        }
                        if ($top < 0) {
                            $top = 0;
                        } else if ($top >= $('#xt').height() - $('#xf').height()) {
                            $top = $('#xt').height() - $('#xf').height();
                        }
                        $('#xf').css('left', $left);
                        $('#xf').css('top', $top);
                        $('#dt').css('left', -$left * bili);
                        $('#dt').css('top', -$top * bili);
                    });
                }, function () {
                    $('#xf').css('visibility', 'hidden');
                    $('#df').css('visibility', 'hidden');
                });

                //点击小图切换
                $('#list ul').on('click', 'li', function () {
                    var $imgurl = $(this).find('img').attr('src');
                    $('#smallpic').attr('src', $imgurl);
                    $('#dt').attr('src', $imgurl);
                });

                //点击箭头进行切换
                var $num = 6;//放大镜显示6张。
                $('#right').on('click', function () {
                    var $list = $('#list ul li');//8
                    if ($list.length > $num) {
                        $num++;
                        $('#left').css('color', '#333');
                        if ($list.length == $num) {
                            $('#right').css('color', '#fff');
                        }
                        $('#list ul').animate({
                            left: -($num - 6) * $list.eq(0).innerWidth()
                        })
                    }
                });

                $('#left').on('click', function () {
                    var $list = $('#list ul li');//8
                    if ($num > 6) {
                        $num--;
                        $('#right').css('color', '#333');
                        if ($num <= 6) {
                            $('#left').css('color', '#fff');
                        }
                        $('#list ul').animate({
                            left: -($num - 6) * $list.eq(0).innerWidth()
                        })
                    }
                });
            }();
        }
    })
})();

