<template>
  <div class="pages_container">
    <h2>アーカイブ</h2>
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
  async asyncData() { 
    const querySnapshot = await archives_db
      .orderBy("date", "desc")
      .limit(10)
      .get()
      .catch(function (error) {
        console.error("firestore: archives: " + error);
      });

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
      archives_data
    };
  },
}
</script>
