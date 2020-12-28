const archives_db = db.collection("archives");

archives_db.orderBy("date", "desc").limit(1).get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    var id = doc.id;
    var data = doc.data();

    //日付化
    var arr = (id.substr(0, 4) + '/' + id.substr(4, 2) + '/' + id.substr(6, 2)).split('/');
    var date = new Date(arr[0], arr[1] - 1, arr[2]);

    //画像取得
    storageRef.child('archives/'+ id +'/head.png').getDownloadURL().then(function(imgdata) {
      $('.headimg').append("<img src='"+ imgdata + "'>");
      $('.article_img').append("<img src='"+ imgdata + "'>");
    });

    //表示
    $('.date').text(date.getFullYear()+"年"+(date.getMonth()+1)+"月"+date.getDate()+"日");
    $('.item-list').append("<p>"+ data.topics_01 + "</p>");
    $('.item-list').append("<p>"+ data.topics_02 + "</p>");
    $('.item-list').append("<p>"+ data.topics_03 + "</p>");
    $('.item-list').append("<p>"+ data.topics_04 + "</p>");
    $('.item-list').append("<a href="+ "/archives/" + id + "/>新聞を読む</a>");
  });
}).catch(function(error){
  $('.date').text("記事を取得できませんでした");
  storageRef.child('common/alicia_ng.png').getDownloadURL().then(function(notfound_img) {
    $('section.topics').css('background-image', 'url('+notfound_img+')');
  });
  console.error("vcnp: "+ error);
});

var list_id = 0;
var list_connt = 0;

function newest_list(){
  archives_db.orderBy("date", "desc").limit(5).get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      list_id = doc.id;
      getimg(list_id);
    });
  });
}

function getimg(get_id){
  storageRef.child('archives/'+ get_id +'/head.png').getDownloadURL().then(function(imgdata) {
    $('.newest_list').append('<a class="article '+get_id+'" href="/archives/'+get_id+'"></a>');
    $('.article').eq(list_connt).append('<img class="article_img" src="'+ imgdata + '"/>');
    var list_date = get_id.substr(0, 4) + '年' + get_id.substr(4, 2) + '月' + get_id.substr(6, 2) + '日';
    $('.article').eq(list_connt).append('<p>'+list_date+'</p>');
    list_connt = list_connt + 1;
  });
}

//過去新聞取得
try{
  newest_list();
  
}catch(error){
  $('.old_news').text("過去の記事を取得できませんでした");
  storageRef.child('common/alicia_ng.png').getDownloadURL().then(function(notfound_img) {
    $('section.newest_list').css('background-image', 'url('+notfound_img+')');
  });
  console.error("vcnp: "+ error);
}