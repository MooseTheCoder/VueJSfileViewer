Vue.component('folder',{
  props: ['folder'],
  template : '<div class="item-container folder" v-on:click="updatePath(folder.name)"><img src="https://visualpharm.com/assets/889/Folder-595b40b65ba036ed117d40dd.svg" style="width:50%;"><br />{{folder.name}}</div>'
})

Vue.component('file',{
  props: ['file'],
  template : '<div class="item-container file"><img src="https://cdn4.iconfinder.com/data/icons/48-bubbles/48/12.File-512.png" style="width:50%; margin-top:5px;"><br /><br />{{file.name}}</div>'
})

var app = new Vue({
  el : '#app',
  data : {
    back : '',
    dir : '/xampp/',
    folders : [

    ],
    files : [
    ]
  },
  methods : {
    goBack : function(){
      window.app.dir = window.app.back;
      clear();
      procFiles();
    },
    changePath : function(){
      var p = $('#loc').val();
      window.app.dir = p;
      clear();
      procFiles();
    }
  }
});

function updatePath(i){
  window.app.back = window.app.dir;
  window.app.dir+=i+'/';
  clear();
  procFiles();
}

function updateFiles(files){
  $.each(files,function(index){
    window.app.files.push({ name: files[index] });
  });
}

function updateFolders(folders){
  $.each(folders,function(index){
    window.app.folders.push({ name : folders[index]});
  });
}

function clear(){
  window.app.files = [];
  window.app.folders = [];
}

function procFiles(){
  $.ajax({
    url : 'server.php?a=scan&dir='+window.app.dir,
    success : function(data){
      var res = $.parseJSON(data);
      if(res.ack == 'true'){
        var files = $.parseJSON(res.files);
        var folders = $.parseJSON(res.folders);
        updateFiles(files);
        updateFolders(folders);
      }
    }
  });
}

$(document).ready(function(){
  //get base dir
  procFiles();
});
