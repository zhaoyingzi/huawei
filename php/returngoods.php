<?php
//这个是将数据库里的信息传送给前端的php页面，让前端来渲染出结构
include "conn.php";
$result=mysql_query("select * from goodslist");
$arr=array();//定义一个空数组，存放数据库里的信息
for($i=0;$i<mysql_num_rows($result);$i++){//mysql_num_rows() 函数返回结果集中行的数目。
    $arr[$i]=mysql_fetch_array($result,MYSQL_ASSOC);//mysql_fetch_array()函数从结果集中取得一行作为关联数组，每次只返回一行
}
echo json_encode($arr);//将数组转为json格式的接口
?>