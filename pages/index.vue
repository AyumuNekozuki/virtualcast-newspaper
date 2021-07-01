<template>
  <div class="index">
    <div class="info">
      <font-awesome-icon :icon="['fas','bullhorn']" />
      <nuxt-link :to="news_href">{{ news_data.title }}</nuxt-link>
    </div>

      <section class="newest_contents">
        <nuxt-link class="headimg" :to="newest_href"></nuxt-link>
        <div class="wrap">
          <h2 class="date">{{ newest_date }}</h2>
          <p v-html="newest_data.topics_01"></p>
          <p v-html="newest_data.topics_02"></p>
          <p v-html="newest_data.topics_03"></p>
          <p v-html="newest_data.topics_04"></p>
          <div class="links">
            <nuxt-link :to="newest_href">新聞を読む</nuxt-link>
          </div>
        </div>
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

export default {/*
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
  },*/
  async asyncData() { //新着記事
    const querySnapshot = await archives_db
      .orderBy("date", "desc")
      .limit(1)
      .get()
      .catch(function (error) {
        console.error("firestore: archives: " + error);
      });

    let newest_id, newest_date, newest_href;
    let newest_data = {};

    querySnapshot.forEach((doc) => {
      newest_id = doc.id;
      newest_data = doc.data();
    });

    set_newest_date_href();
    get_newest_thumbnail();

    function set_newest_date_href(){
      var arr = (newest_id.substr(0, 4) + "/" + newest_id.substr(4, 2) + "/" + newest_id.substr(6, 2)).split("/");
      var date = new Date(arr[0], arr[1] - 1, arr[2]);
      newest_date = date.getFullYear() + "年" + (date.getMonth() + 1) + "月" + date.getDate() + "日";
      newest_href = '/archives/' + newest_id;
    }
    function get_newest_thumbnail(){
      if(process.client){
        if(document.getElementById("newest_thumbnail")){
          clearInterval(Interval);
        }else{
          storageRef.child('archives/'+ newest_id +'/head.png').getDownloadURL().then(function(imgurl){
            $('.headimg').append("<img id='newest_thumbnail' src='"+ imgurl + "' href='"+ newest_date +"'>");
          }).catch(function(error){
            console.error('storage :'+ error)
          });
        }
      }
    }


    /* news */
    const querySnapshot_news = await news_db
      .orderBy("date", "desc")
      .limit(1)
      .get()
      .catch(function (error) {
        console.error("firestore: news: " + error);
      });
    let news_id, news_href;
    let news_data = {};
    querySnapshot_news.forEach((doc) => {
      news_id = doc.id;
      news_data = doc.data();
    });
    news_href = '/news/' + news_id;


    return {
      newest_date,
      newest_data,
      newest_href,
      news_data,
      news_href
    };
  }
    /*,
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
</style>