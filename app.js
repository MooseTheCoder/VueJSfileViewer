Vue.component('folder',{
  props: ['folder'],
  template : '<div class="item-container folder" v-on:click="updatePath(folder.name)">{{folder.name}}</div>'
})

Vue.component('file',{
  props: ['file'],
  template : '<div class="item-container file">{{file.name}}</div>'
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
    }
  }
});

function updatePath(i){
  window.app.back = window.app.dir;
  window.app.dir+=i;
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
