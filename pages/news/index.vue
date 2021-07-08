<template>
  <div class="pages_container news_page_list">
    <div class="wide_wraper">
      <h2>お知らせ</h2>
      <div class="news_list_area" id="news_list">
        <div class="news_list_wrap" v-for="news_data in news_data" :key="news_data.length">
          <nuxt-link class="news_list_content" :to="news_data.href">
            <p class="title">{{ news_data.title }}</p>
            <p class="date">{{news_data.datetime}}</p>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.wide_wraper{
  max-width: 1336px;
  margin: 0 auto;
  padding: 20px;
}
.wide_wraper h2{
  font-size: 28px;
  font-weight: bold;
  margin: 0 0 .5em;
}

.news_page_list #news_list{
  margin-top: 2em;
}
.news_page_list #news_list a.news_list_content{
  display: block;
  margin: .75em 1em;
  padding: .25em .75em;
  border-bottom: 1px solid #ccc;
  font-size: 16px;
}
.news_page_list #news_list a.news_list_content:hover{
  color: #0080ff;
}
.news_page_list #news_list div.news_list_wrap:last-child a.news_list_content{
  border: none;
}
.news_page_list #news_list a.news_list_content .date{
  color: #666;
  margin: .5em;
  font-size: 12px;
}
</style>

<script>
import Meta from '~/mixins/meta';
import firebase from "~/plugins/firebase";

const db = firebase.firestore();
const news_db = db.collection("news");

export default {
  async asyncData() {
    const querySnapshot_news = await news_db
      .orderBy("date", "desc")
      .get()
      .catch(function (error) {
        console.error("firestore: news: " + error);
    });

    let news_id, news_href, datas;
    let news_data = [];

    querySnapshot_news.forEach((doc) => {
      news_id = doc.id;
      datas = doc.data();
      news_href = "/news/" + news_id;

      datas.id = news_id;
      datas.href = news_href;
      var date = new Date(datas.date.seconds * 1000);
      datas.datetime = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();

      news_data.push(datas);
    });

    return{
      news_data
    }
  },
  mixins: [Meta], 
  data() {
    return {
      meta: {
        title: "お知らせ" ,
        description: 'Vキャス新聞からのお知らせです。',
        type: 'article',
        url: 'https://vcnp.nekozuki.me/news',
      },
    }
  }
}

</script>

