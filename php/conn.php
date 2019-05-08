<?php
 header('content-type:text/html;charset=utf-8'); //设置字符编码。
$conn=@mysql_connect('localhost','root','');//连接数据库
if(!$conn){
    die('数据库连接错误:'.mysql_error());//容错一下
}
mysql_select_db('huawei');//选择数据库
mysql_query('SET NAMES UTF8');//设置字符编码

?>