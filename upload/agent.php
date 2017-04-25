<?php
$id = $_GET["id"];
$url = "http://shop.mogujie.com/ajax/mgj.pc.detailinfo/v1?_ajax=1&itemId=".$id;
$file = fopen($url, 'r'); //打开文件 只读
stream_get_meta_data($file);
echo fgets($file);
fclose($file);
?>
