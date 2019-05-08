function objtostring(obj) {//对象转字符串拼接
    var arr = [];
    for (var i in obj) {
        arr.push(i + '=' + obj[i])
    }
    return arr.join('&');
}

//ajax的获取和传输的函数
function ajax(option) { //option对象
    var ajax = new XMLHttpRequest();
    //1.默认是get，否则传入的参数
    option.type = option.type || 'get';
    //2.接口地址一定存在，否则报错
    if (!option.url) {
        throw new Error('请输入接口地址');
    }
    //3.是否异步
    if (option.async == false || option.async == 'false') {
        option.async = false;
    } else {
        option.async = true;
    }

    //4.判断数据类型(对象和字符串)
    if(option.data && typeof option.data==='object' && !Array.isArray(option.data)){//对象
        option.data=objtostring(option.data);
    }else if(option.data && typeof option.data==='string'){//字符串
        option.data=option.data;
    }

    //5.get传入数据
    if (option.data && option.type == 'get') {
        option.url += '?' + option.data
    }


    ajax.open(option.type, option.url, option.async);


    //6.post传入数据
    if(option.data && option.type=='post'){
        ajax.setRequestHeader('content-type' , 'application/x-www-form-urlencoded');
        ajax.send(option.data);
    }else{
        ajax.send();
    }
    

    if (!option.async) { //同步
        console.log(ajax.responseText);
    } else { //异步
        ajax.onreadystatechange = function () {
            if (ajax.readyState === 4) {
                if (ajax.status === 200) {
                    option.success && option.success(ajax.responseText); //如果option.success存在，执行后面的方法
                } else {
                    option.error && option.error('接口地址有误:' + ajax.status);
                }
            }
        }
    }

}