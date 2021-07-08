<template>
  <div class="pages_container news_page">
    <div class="wide_wraper">
      <nuxt-link class="prev_pages" to="/news">お知らせ一覧</nuxt-link>
      <article class="news_contents" :id="news_id">
      <h2 class="title">{{ news_doc_data.title }}</h2>
      <p class="date"><font-awesome-icon :icon="['fas','calendar-day']" />{{ news_doc_data.date }}</p>
      <div class="news_content_area">
        <div id="thumbnail" :class="news_doc_data.thumbnail"></div>
        <div v-html="news_doc_data.content"></div>
      </div>
      </article>
    </div>
  </div>
</template>

<style>
.wide_wraper{
  max-width: 1336px;
  margin: 0 auto;
  padding: 20px;
}

.news_page .news_contents{
  background: white;
  border-radius: 5px;
  box-shadow: 0 1px 3px rgba(0,0,0,.25);
  padding: 2em;
}

.news_page .news_contents h2.title{
  font-size: 24px;
  font-weight: bold;
  margin: 0 0 .5em;
}
.news_page .news_contents p.date{
  color: #666;
  font-size: 14px;
  padding-bottom: .5em;
  border-bottom: 1px solid #999;
}

.news_page .news_contents .news_content_area{
  margin: 1.5em 0 0;
  line-height: 1.7;
}

.news_content_area p{
  font-size: 16px;
  margin: .75em 0;
}
.news_content_area h3{
  font-size: 18px;
  background: linear-gradient(0deg, #bae4f8, #bae4f8 50%, transparent 50%, transparent 100%);
  font-weight: bold;
  margin: 1.25em 0 .5em;
  padding: 0 .5em;
  display: inline-block;
}

.news_content_area a{
  color: #0080ff;
  text-decoration: underline;
}
.news_content_area a:hover{
  opacity: .8;
  text-decoration: none;
}

.news_content_area ul{
  padding-left: 1.5em;
}
.news_content_area li{
  list-style: disc;
}
.news_content_area hr{
  border: 0.25px solid #ddd;
  margin: 1.5em 0;
}
.news_content_area img{
  width: 100%;
  height: auto;
}

.news_content_area #thumbnail{
  width: 75%;
  height: 75%;
  border: 1px solid #ddd;
  margin: 0 auto;
}
.news_content_area .thumbnail_hide{
  display: none;
}

</style>

<script>
import Meta from '~/mixins/meta';
import firebase from "~/plugins/firebase";
const db = firebase.firestore();
const news_db = db.collection("news");
const storage = firebase.storage();
const storageRef = storage.ref();

let title, news_id;

export default {
  async asyncData({ params }) {
    news_id = params.ids;
    const document = await news_db.doc(news_id).get();
    let news_doc_data = document.data();

    var date = new Date(news_doc_data.date.seconds * 1000);
    news_doc_data.date = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();

    if(!news_doc_data.is_thumbnail){
      news_doc_data.thumbnail = "thumbnail_hide";
    }

    title = news_doc_data.title;

    return{
      news_doc_data,
      news_id
    };
  },
  mounted(){
    if(process.client){
      if($('.thumbnail_hide')){
        get_news_thumbnail();
      }
    }

    function get_news_thumbnail(){ //新着記事サムネ取得
      var ids = $('article.news_contents').attr('id');
      storageRef.child('news/'+ ids +'/thumbnail.png').getDownloadURL().then(function(imgurl){
        $('#thumbnail').prepend("<img id='news_thumbnail' src='"+ imgurl + "' alt='thumbnail'>");
      }).catch(function(error){
        console.error('storage :'+ error);
      });
    }

  },
  mixins: [Meta], 
  data() {
    return {
      meta: {
        title: title + " - お知らせ" ,
        description: 'Vキャス新聞からのお知らせです。',
        type: 'article',
        url: 'https://vcnp.nekozuki.me/news/' + news_id,
      },
    }
  }
}
</script>

