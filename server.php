<?php

function listFiles($dir){
  return array_diff(scandir($dir),['.','..']);
}

$p = 'err';

if(isset($_GET['a'])){
  $p = $_GET['a'];
}

if($p == 'err'){
  echo json_encode(['ack'=>'false']);
}

if($p == 'scan'){
  $dir = listFiles($_REQUEST['dir']);
  $files = [];
  $folders = [];
  foreach($dir as $thing){
    if(is_dir($_REQUEST['dir'].$thing)){
      $folders[]=$thing;
    }else{
      $files[]=$thing;
    }
  }
  echo json_encode(['ack'=>'true','files'=>json_encode($files),'folders'=>json_encode($folders)]);
}
