<template>
  <div class="pages_container">
    <h2 class="page_title">アーカイブ</h2>

    <div class="pagequery_wrap">
      <a class="query_prev" :href="($route.query.pages) - 1">Prev</a>
      <p>{{ query }}ページ目を表示しています</p>
      <a class="query_next" :href="($route.query.pages) + 1">Next</a>
    </div>

    <div class="archive_wrap" id="archive_wrap">

      <div class="archive_list_wrap" v-for="archives_data in archives_data" :key="archives_data.length">

        <section class="archive_contents" :id="archives_data.id">
          <nuxt-link class="archive_headimg" :to="archives_data.href"></nuxt-link>
          <div class="archive_topics_wrap">
            <h2 class="date">{{ archives_data.date }}</h2>
            <p v-html="archives_data.topics_01"></p>
            <p v-html="archives_data.topics_02"></p>
            <p v-html="archives_data.topics_03"></p>
            <p v-html="archives_data.topics_04"></p>
            <div class="links">
              <nuxt-link :to="archives_data.href">新聞を読む</nuxt-link>
            </div>
          </div>
        </section>

      </div>

    </div>

      <div class="pagequery_wrap">
        <a class="query_prev" :href="query_prev_href">Prev</a>
        <p>{{ query }}ページ目を表示しています</p>
        <a class="query_next" :href="query_next_href">Next</a>
      </div>

  </div>
</template>

<script>
import Meta from '~/mixins/meta';
import firebase from "~/plugins/firebase";

const db = firebase.firestore();
const archives_db = db.collection("archives");
const storage = firebase.storage();
const storageRef = storage.ref();

export default {
  mixins: [Meta], 
  data() {
    return {
      meta: {
        title: "アーカイブ" ,
        description: '過去の発行回一覧です。',
        type: 'pages',
        url: 'https://vcnp.nekozuki.me/archives',
      },
    }
  },
  async asyncData(context) {
    let query = context.query.pages;
    let startquery, querySnapshot;

    let querycalc = query;
    querycalc = Number(querycalc);
    let query_prev_href = "/archives?pages=" + (querycalc - 1);
    let query_next_href = "/archives?pages=" + (querycalc + 1);

    if((query == undefined) || (query == 1)){
      query = 1;
      query_prev_href = "/archives?pages=1";
      query_next_href = "/archives?pages=2";
    }

    await archives_db
      .orderBy("date", "desc")
      .limit(10 * query)
      .get()
      .then(function(document){
        var i = document.docs;
        startquery = document.docs[i.length-1];
      })
      .catch(function (error) {
        console.error("firestore: archives: " + error);
      });
    
    if(query == 1){
      querySnapshot = await archives_db
        .orderBy("date", "desc")
        .limit(10)
        .get()
        .catch(function (error) {
          console.error("firestore: archives: " + error);
        });
    }else{
      querySnapshot = await archives_db
        .orderBy("date", "desc")
        .startAfter(startquery)
        .limit(10 * query)
        .get()
        .catch(function (error) {
          console.error("firestore: archives: " + error);
        });
    };

    let archives_data = [];
    let archive_data = {};

    querySnapshot.forEach((doc) => {
      archive_data = doc.data();
      archive_data.id = doc.id + "";

      var arr = (archive_data.id.substr(0, 4) + "/" + archive_data.id.substr(4, 2) + "/" + archive_data.id.substr(6, 2)).split("/");
      var date = new Date(arr[0], arr[1] - 1, arr[2]);
      archive_data.date = date.getFullYear() + "年" + (date.getMonth() + 1) + "月" + date.getDate() + "日";
      archive_data.href = '/archives/' + archive_data.id;

      archives_data.push(archive_data);
    });


  
    return {
      archives_data,
      query,
      query_prev_href,
      query_next_href
    };
  },
    mounted(){
    if(process.client){
      var count = 0;
      var if_check_url;
      
      var Interval = setInterval(function(){
        get_old_thumbnail();
        if((if_check_url == undefined) && (count > 3)){
          clearInterval(Interval);
        };
      },500);

      check_archive_error_display();
    }

    function get_old_thumbnail(){ //過去記事サムネ習得
      var ids = $('section.archive_contents').eq(count).attr('id');
      if_check_url = ids;
      if(ids == undefined){
        clearInterval(Interval);
      }else{
        storageRef.child('archives/'+ ids +'/head.png').getDownloadURL().then(function(imgurl){
          if(!($('img[src="'+ imgurl +'"').length)){
            $('.archive_headimg').eq(count - 1).prepend("<img id='old_thumbnail' src='"+ imgurl + "' alt='"+ ids +"'>");
          }
        }).catch(function(error){
          console.error('storage :'+ error);
          $('.archive_headimg').eq(count - 1).prepend("<img src='/_nuxt/assets/alicia_ng.png' alt='error!'>");
        });
        count = count + 1;
      }
    };

    function check_archive_error_display(){
      if(!($('section.archive_contents').length)){
        $('#archive_wrap').append("<div class='archive_list_wrap'><section class='archive_contents error_display'><h2 class='date'>情報がありません</h2></section></div>");
      }
    }
  }
}
</script>

<style>
div.pages_container{
  margin: 0 auto;
  padding: 1em 2em;
  max-width: 1336px;
}
.pages_container h2.page_title{
  font-weight: bold;
  font-size: 26px;
  margin: .5em 10px;
}

div.pagequery_wrap{
  display: flex;
  justify-content: space-between;
  margin: 1em 1em;
}
div.pagequery_wrap p{
  display: block;
  color: #999;
  padding: .75em 1em;
}
div.pagequery_wrap a{
  display: block;
  background-color: #0080ff;
  color: white;
  padding: .75em 1em;
  border-radius: 5px;
}
div.pagequery_wrap a:hover{
  opacity: .8;
}
div.pagequery_wrap .query_prev::before{
  content: "<";
  padding: 0 1em 0 0;
}
div.pagequery_wrap .query_next::after{
  content: ">";
  padding: 0 0 0 1em;
}

.archive_list_wrap section.archive_contents h2{
  font-weight: bold;
  font-size: 22px;
  margin: .5em 10px;
}

.archive_list_wrap section.archive_contents{
  display: flex;
  flex-direction: row-reverse;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 1px 3px rgba(0,0,0,.25);
  padding: 15px;
  margin: 20px 5px;
  min-height: 200px;
}
.archive_list_wrap section.archive_contents a:hover{
  opacity: .8;
}
.archive_list_wrap section.archive_contents .archive_headimg{
  width: 30%;
  background-image: url('~/assets/spin-gray.svg');
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 25%;
  display:flex;
  align-content: center;
}
.archive_list_wrap section.archive_contents .archive_headimg img{
  width: 100%;
  height: auto;
  object-fit: contain;
}

.archive_list_wrap section.archive_contents .archive_topics_wrap{
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.archive_list_wrap section.archive_contents .archive_topics_wrap h2{
  font-weight: bold;
  font-size: 26px;
  margin: .5em 10px;
}
.archive_list_wrap section.archive_contents .archive_topics_wrap p,
.archive_list_wrap section.archive_contents .archive_topics_wrap .links{
  font-size: 18px;
  line-height: 1.7;
  margin: 0 25px;
  padding: 1em .5em;
  border-bottom: 1px solid #ddd;
}
.archive_list_wrap section.archive_contents .archive_topics_wrap p span{
  font-size: 80%;
  border: 1px solid #555;
  margin: 0 .5em 0 0;
  padding: .25em;
  border-radius: 5px;
}
.archive_list_wrap section.archive_contents .archive_topics_wrap .links{
  border: none;
  display: flex;
  justify-content: flex-end
}
.archive_list_wrap section.archive_contents .archive_topics_wrap .links a{
  background-color: #0080ff;
  padding: .25em .75em;
  border-radius: 5px;
  color: white;
}

.error_display{
  background-image: url('~/assets/alicia_ng.png');
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 10%;
}
.error_display h2{
  display: block;
  width: 100%;
}
</style>