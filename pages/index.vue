<template>
  <div class="index">
    <div class="info" v-if="!is_news_hidden">
      <font-awesome-icon :icon="['fas','bullhorn']" />
      <nuxt-link :to="news_data.href">{{ news_data.title }}</nuxt-link>
    </div>

      <section class="newest_contents" :id="newest_data.id">
        <nuxt-link class="headimg" :to="newest_data.href"></nuxt-link>
        <div class="wrap">
          <h2 class="date">{{ newest_data.date }}</h2>
          <p v-html="newest_data.topics_01"></p>
          <p v-html="newest_data.topics_02"></p>
          <p v-html="newest_data.topics_03"></p>
          <p v-html="newest_data.topics_04"></p>
          <div class="links">
            <nuxt-link :to="newest_data.href">新聞を読む</nuxt-link>
          </div>
        </div>
      </section>
    
      <section class="old_list_contents">
        <h2 class="old_news"><a href="/archives">過去の新聞</a></h2>
        <div class="old_content_wrap_wrap">
          <div class="old_content_wrap" v-for="oldcontents_data in oldcontents_data" :key='oldcontents_data.length'>
            <nuxt-link class="article card" :to="oldcontents_data.href" :id="oldcontents_data.id">
              <p>{{ oldcontents_data.date }}</p>
            </nuxt-link>
          </div>
        </div>
      </section>
    
  </div>
</template>

<script>
import firebase from "~/plugins/firebase";

const db = firebase.firestore();
const archives_db = db.collection("archives");
const news_db = db.collection("news");
const storage = firebase.storage();
const storageRef = storage.ref();

export default {
  head () {
    return {
      titleTemplate: null,
      title: 'Vキャス新聞',
    }
  },
  async asyncData() { 
    let newest_data = {};

    const querySnapshot = await archives_db
      .orderBy("date", "desc")
      .limit(1)
      .get()
      .catch(function (error) {
        console.error("firestore: archives: " + error);
        $('.headimg').prepend("<img src='~/assets/alicia_ng.png' alt='error!'>");
        newest_data.date = "エラーが発生しました";
        newest_data.topics_01 = "情報を取得できませんでした";
        newest_data.topics_02 = "このエラーが表示された場合は、スクリーンショットとともに 以下までご連絡ください。";
        newest_data.topics_03 = "<a href='https://twitter.com/nekozuki_dev'>Twitter @nekozuki_dev</a>";
        newest_data.topics_04 = "firebase/firestore/archives: " + error;
      });

    querySnapshot.forEach((doc) => {
      newest_data = doc.data();
      newest_data.id = doc.id;
    });

    set_newest_date_href();

    function set_newest_date_href(){
      var arr = newest_data.id + "";
      arr = (arr.substr(0, 4) + "/" + arr.substr(4, 2) + "/" + arr.substr(6, 2)).split("/");
      var date = new Date(arr[0], arr[1] - 1, arr[2]);
      newest_data.date = date.getFullYear() + "年" + (date.getMonth() + 1) + "月" + date.getDate() + "日";
      newest_data.href = '/archives/' + newest_data.id;
    }


    /* news */
    const querySnapshot_news = await news_db
      .orderBy("date", "desc")
      .limit(1)
      .get()
      .catch(function (error) {
        console.error("firestore: news: " + error);
      });

    let news_data = {};
    querySnapshot_news.forEach((doc) => {
      news_data = doc.data();
      news_data.id = doc.id;
      news_data.href = '/news/' + doc.id;
    });

    //日付計算
    var today = new Date();
    var timestamp = news_data.date.seconds;
    var upload_day = new Date(timestamp * 1000);
    var news_hidden = new Date();
    news_hidden.setDate(upload_day.getDate() + 10);

    if(news_hidden.getTime() < today.getTime()){
      var is_news_hidden = true;
    }else{
      var is_news_hidden = false;
    }
    

  /* 過去の記事 */
    const querySnapshot_oldcontent = await archives_db
      .orderBy("date", "desc")
      .limit(6)
      .get()
      .catch(function (error) {
        console.error("firestore: archives: " + error);
      });

    let oldcontents_data = [];

    querySnapshot_oldcontent.forEach((doc) => {
      var oldcontent_data = Object.assign({}, doc.data);
      oldcontent_data.id = doc.id;

      var arr = (oldcontent_data.id.substr(0, 4) + "/" + oldcontent_data.id.substr(4, 2) + "/" + oldcontent_data.id.substr(6, 2)).split("/");
      var date = new Date(arr[0], arr[1] - 1, arr[2]);
      oldcontent_data.date = date.getFullYear() + "年" + (date.getMonth() + 1) + "月" + date.getDate() + "日";

      oldcontent_data.href = "/archives/" + oldcontent_data.id;
      oldcontent_data.id = "old_" + oldcontent_data.id;

      oldcontents_data.push(oldcontent_data);
    });
    

    return {
      newest_data,
      news_data,
      oldcontents_data,
      is_news_hidden
    };
  },
  mounted(){
    if(process.client){
      var count = 0;
      get_newest_thumbnail();
      
      var Interval = setInterval(function(){
        get_old_thumbnail();
        if(count + 1 > 6){
          clearInterval(Interval);
        };
      },500);
    }

    function get_newest_thumbnail(){ //新着記事サムネ取得
      var ids = $('section.newest_contents').attr('id');
      var old_ids = $('.article.card').eq(count).attr('id');
      storageRef.child('archives/'+ ids +'/head_986x1138.jpeg').getDownloadURL().then(function(imgurl){
        if(!($('img[src="'+ imgurl +'"').length)){
          $('.headimg').append("<img id='newest_thumbnail' src='"+ imgurl + "' alt='"+ ids +"'>");
          $('#' + old_ids).prepend("<img id='old_thumbnail' src='"+ imgurl + "' alt='"+ ids +"'>");
        }
      }).catch(function(error){
        console.error('storage :'+ error);
        $('.headimg').prepend("<img src='/_nuxt/assets/alicia_ng.png' alt='error!'>");
      });
    }

    function get_old_thumbnail(){ //過去記事サムネ習得
      var old_ids = $('.article.card').eq(count).attr('id');
      var ids = old_ids.substr(4);
      storageRef.child('archives/'+ ids +'/head_986x1138.jpeg').getDownloadURL().then(function(imgurl){
        if(!($('img[src="'+ imgurl +'"').length)){
          $('#' + old_ids).prepend("<img id='old_thumbnail' src='"+ imgurl + "' alt='"+ ids +"'>");
        }
      }).catch(function(error){
        console.error('storage :'+ error);
        $('#' + old_ids).prepend("<img src='/_nuxt/assets/alicia_ng.png' alt='error!'>");
      });
      count = count + 1;
    };
  }
};
</script>

<style>
div.index{
  margin: 0 auto;
  padding: 1em 2em;
  max-width: 1336px;
}

div.index section.newest_contents{
  display: flex;
  flex-direction: row-reverse;
  background: white;
  border-radius: 5px;
  box-shadow: 0 1px 3px rgba(0,0,0,.25);
  padding: 15px;
  margin: 20px 5px;
  min-height: 200px;
}
div.index section.newest_contents a:hover{
  opacity: .8;
}
div.index section.newest_contents .headimg{
  width: 30%;
  background-image: url('~/assets/spin-gray.svg');
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 25%;
  display:flex;
  align-content: center;
}
div.index section.newest_contents .headimg img{
  width: 100%;
  height: auto;
  object-fit: contain;
}

div.index section.newest_contents .wrap{
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
div.index section.newest_contents .wrap h2{
  font-weight: bold;
  font-size: 26px;
  margin: .5em 10px;
}
div.index section.newest_contents .wrap p,
div.index section.newest_contents .wrap .links{
  font-size: 18px;
  line-height: 1.7;
  margin: 0 25px;
  padding: 1em .5em;
  border-bottom: 1px solid #ddd;
}
div.index section.newest_contents .wrap p span{
  font-size: 80%;
  border: 1px solid #555;
  margin: 0 .5em 0 0;
  padding: .25em;
  border-radius: 5px;
}
div.index section.newest_contents .wrap .links{
  border: none;
  display: flex;
  justify-content: flex-end
}
div.index section.newest_contents .wrap .links a{
  background-color: #0080ff;
  padding: .25em .75em;
  border-radius: 5px;
  color: white;
}


div.index .info{
  margin: .25em .5em .5em;
  padding: .75em;
  background: white;
  border-radius: 5px;
  box-shadow: 0 1px 3px rgba(0,0,0,.25);
}
div.index .info a:hover{
  color: #0080ff;
}

section.old_list_contents{
  
  background: white;
  border-radius: 5px;
  box-shadow: 0 1px 3px rgba(0,0,0,.25);
  padding: 15px;
  margin: 20px 5px;
  /*min-height: 200px;*/
}
section.old_list_contents h2{
  font-weight: bold;
  font-size: 26px;
  margin: .25em 10px;
}
section.old_list_contents h2 a:hover{
  color: #0080ff;
}
section.old_list_contents .old_content_wrap_wrap{
  margin: 1em;
  display: flex;
  flex-direction: row;
}
section.old_list_contents .old_content_wrap{
  width: calc(100% / 6); 
}
section.old_list_contents .article.card{
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  flex-direction: column;
  padding: 0 .5em ;
  width: 100%;
  min-height: 200px;
  background-image: url('~/assets/spin-gray.svg');
  background-position: center 35%;
  background-repeat: no-repeat;
  background-size: 25%;
}
section.old_list_contents .article.card:hover{
  color: #0080ff;
}
section.old_list_contents .article.card p{
  width: 100%;
  text-align: center;
  margin: .5em 0 .25em;
}
section.old_list_contents .article.card img{
  width: 100%;
  display: block;
}
</style>