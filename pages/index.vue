<template>
  <div class="index">
    <div class="info">
      <a :href="news_href">{{ news_data }}</a>
    </div>

    <section class="newest_contents">
      <div class="headimg">
        <!--
        <img :src="newest_img">
        -->
      </div>
      <h2 class="date">{{ newest_date }}</h2>
      <ul class="topics_list">
        <li v-html="newest_data.topics_01"></li>
        <li v-html="newest_data.topics_02"></li>
        <li v-html="newest_data.topics_03"></li>
        <li v-html="newest_data.topics_04"></li>
      </ul>
      <a :href="newest_href">新聞を読む</a>
    </section>
  <!--
    <section class="old_list_contents">
      <h2 class="old_news"><a href="/archives">過去の新聞</a><span>ベータ</span></h2>
      <a class="article card" :href="oldlist[0].href">
        <img :src="oldlist[0].img">
        <p>{{ oldlist[0].date }}</p>
      </a>
      <a class="article card" :href="oldlist[1].href">
        <img :src="oldlist[1].img">
        <p>{{ oldlist[1].date }}</p>
      </a>
      <a class="article card" :href="oldlist[2].href">
        <img :src="oldlist[2].img">
        <p>{{ oldlist[2].date }}</p>
      </a>
      <a class="article card" :href="oldlist[3].href">
        <img :src="oldlist[3].img">
        <p>{{ oldlist[3].date }}</p>
      </a>
      <a class="article card" :href="oldlist[4].href">
        <img :src="oldlist[4].img">
        <p>{{ oldlist[4].date }}</p>
      </a>
    </section>
    -->
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
  async asyncData() { //news
    const querySnapshot = await news_db
      .orderBy("date", "desc")
      .limit(1)
      .get()
      .catch(function (error) {
        console.error("vcnp: " + error);
      });

    let news_id;
    let news_data = {};

    querySnapshot.forEach((doc) => {
      news_id = doc.id;
      news_data = doc.data();
    });

    news_href = '/news/' + news_id;
    console.log("test: "+ news_data);

    return {
      news_data,
      news_href
    };
  },
  async asyncData() { //新着記事
    const querySnapshot = await archives_db
      .orderBy("date", "desc")
      .limit(1)
      .get()
      .catch(function (error) {
        console.error("vcnp: " + error);
      });

    let newest_id, newest_date, newest_img, newest_href;
    let newest_data = {};

    querySnapshot.forEach((doc) => {
      newest_id = doc.id;
      newest_data = doc.data();
    });


    var arr = (newest_id.substr(0, 4) + "/" + newest_id.substr(4, 2) + "/" + newest_id.substr(6, 2)).split("/");
    var date = new Date(arr[0], arr[1] - 1, arr[2]);
    newest_date = date.getFullYear() + "年" + (date.getMonth() + 1) + "月" + date.getDate() + "日";

    newest_href = '/archives/' + newest_id;

    //storageRef.child('archives/'+ newest_id +'/head.png').getDownloadURL();

    return {
      newest_date,
      newest_data,
      newest_img,
      newest_href
    };
  }/*,
  async asyncData() { //過去記事
    const querySnapshot = await archives_db
      .orderBy("date", "desc")
      .limit(5)
      .get()
      .catch(function (error) {
        console.error("vcnp: " + error);
      });

    var oldlist = [{
        id: "",
        href: "",
        date: ""
      }];
    var i = 0;

    querySnapshot.forEach((doc) => {
      addlist(doc);
    });

    function addlist(doc){
      oldlist[i].id = doc.id;
      i = i++;
    }
    console.log(oldlist[3])

    for(var i = 0; i < 4; i++){
      oldlist[i].href = "/archives/" + oldlist[i].id;

      var arr = (oldlist[i].id.substr(0, 4) + "/" + oldlist[i].id.substr(4, 2) + "/" + oldlist[i].id.substr(6, 2)).split("/");
      var date = new Date(arr[0], arr[1] - 1, arr[2]);
      oldlist[i].date = date.getFullYear() + "年" + (date.getMonth() + 1) + "月" + date.getDate() + "日";
    }

    return {
      oldlist
    };
  }
  */
};
</script>