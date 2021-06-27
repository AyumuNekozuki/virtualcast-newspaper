const archives_db = db.collection("archives");
var page_counter = 0;
var apppend_check_counter = 0;
var count = 0;
let ids = [];
let id = "";

var database = archives_db.orderBy("date", "desc");


database.get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    id = doc.id;
    var data = doc.data();

    var change_number = Number(doc.id);
    ids.push(change_number);
    
    var arr = (id.substr(0, 4) + '/' + id.substr(4, 2) + '/' + id.substr(6, 2)).split('/');
    var date = new Date(arr[0], arr[1] - 1, arr[2]);

    if(apppend_check_counter < 5){
      $('#main').append('<section class="tab_content topics" id="'+ id +'"><div class="headimg"></div><h2></h2><div class="item-list"></div></section>');
      apppend_check_counter = apppend_check_counter + 1;
    }else{
      $('#main').append('<section class="tab_content topics is-hidden" id="'+ id +'"><div class="headimg"></div><h2></h2><div class="item-list"></div></section>');
    }
    $('#'+ id +' h2').text(date.getFullYear()+"年"+(date.getMonth()+1)+"月"+date.getDate()+"日");
    $('#'+ id +' .item-list').append("<p>"+ data.topics_01 + "</p>");
    $('#'+ id +' .item-list').append("<p>"+ data.topics_02 + "</p>");
    $('#'+ id +' .item-list').append("<p>"+ data.topics_03 + "</p>");
    $('#'+ id +' .item-list').append("<p>"+ data.topics_04 + "</p>");
    $('#'+ id +' .item-list').append("<p><a href="+ "/archives/" + id + "/>新聞を読む</a></p>");

  });
}).catch(function(error){
  console.error("vcnp: "+ error);
  document.getElementById("main").innerHTML = '<section class="topics"><h2>ページの読み込みに失敗しました</h2><div class="item-list"><p style="border: none;">このページはまだ更新されていないか、サーバーでエラーが発生したかもしれません…！</p></div></section><link rel="stylesheet" href="/top.css">'
  storageRef.child('common/alicia_ng.png').getDownloadURL().then(function(notfound_img) { 
    $('section.topics').css('background-image', 'url('+notfound_img+')');
  });
});


var Interval = setInterval(function(){
  append_doms();
  if(count+1 > ids.length){
    clearInterval(Interval);
  };
},750);
function append_doms(){
  storageRef.child('archives/'+ ids[count] +'/head.png').getDownloadURL().then(function(imgdata) {
    $('#'+ ids[(count - 1)] + ' .headimg').append("<img src='" + imgdata + "'>");
  });
  count = count + 1;
}


var moreNum = 5;
function onclick_morebut() {
  $('.topics.is-hidden').slice(0, moreNum).removeClass('is-hidden');
  if ($('.topics.is-hidden').length == 0) {
    $('#more_button').fadeOut();
  }
}