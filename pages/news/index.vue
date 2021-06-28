<template>
  <div class="pages_container">
    <div class="wide_wraper">
      <h2>お知らせ</h2>
      <div class="news_list_area" id="news_list">
        <a class="news_list_content" :href="news_href">
          <p class="title">{{news_data.title}}</p>
          <p class="date">{{news_data.date}}</p>
        </a>
      </div>
    </div>
  </div>
</template>

<style>
.wide_wraper{
  max-width: 1024px;
  margin: 0 auto;
  padding: 20px;
}
.wide_wraper h2{
  font-size: 28px;
  font-weight: bold;
  margin: 0 0 .5em;
}
</style>

<script>
  import firebase from "~/plugins/firebase";

  const db = firebase.firestore();
  const news_db = db.collection("news");

export default {
    async asyncData() { //news
    const querySnapshot = await news_db
      .orderBy("date", "desc")
      .get()
      .catch(function (error) {
        console.error("vcnp: " + error);
      });

    let news_id, news_href;
    let news_data = {};


    querySnapshot.forEach((doc) => {
      news_id = doc.id;
      news_data = doc.data();
    });

    news_href = '/news/' + news_id;

    return {
      news_data,
      news_href
    };
  }
}

</script>

