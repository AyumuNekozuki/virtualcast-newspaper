var id = location.pathname;
id = id.slice(10);
id = id.slice(0,-1);

var pages;
let count = 0;

const archives_db = db.collection("archives").doc(id);



archives_db.get().then((doc)=>{
  var data = doc.data();
  
  pages = data.pages;

  var Interval = setInterval(function(){
    append_imgs();
    if(count+1 > pages){
      clearInterval(Interval);
    };
  },500);
  setTimeout(function(){
    $('#images').append("<script>var viewer = new Viewer(document.getElementById('images')); </script>");
  },2250);


  //append_topics
  $('.topics_item_list').append("<p>"+ data.topics_01 + "</p>");
  $('.topics_item_list').append("<p>"+ data.topics_02 + "</p>");
  $('.topics_item_list').append("<p>"+ data.topics_03 + "</p>");
  $('.topics_item_list').append("<p>"+ data.topics_04 + "</p>");

}).catch(function(error){
  console.error("vcnp: "+ error);
  document.getElementById("main").innerHTML = '<section class="topics"><h2>ページの読み込みに失敗しました</h2><div class="item-list"><p style="border: none;">このページはまだ更新されていないか、サーバーでエラーが発生したかもしれません…！</p></div></section><link rel="stylesheet" href="/top.css">'
  storageRef.child('common/alicia_ng.png').getDownloadURL().then(function(notfound_img) { 
    $('section.topics').css('background-image', 'url('+notfound_img+')');
  });
});


function append_imgs(){
  storageRef.child('archives/'+ id +'/' + (count + 1) +'.png').getDownloadURL().then(function(imgdata) {
    $('#images').append("<li><img src='"+ imgdata + "'></li>");
  });
  count = count + 1;
};