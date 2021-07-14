<template>
  <div class="admin_container">
    <admin-header />
    <admin-alart />
    <main class="console_area console_list" v-if="(isLogin && isAdmin)">
      <div class="list_header">
        <div class="wrap">
          <h3>お知らせ管理</h3>
        </div>
        <div class="wrap">
          <nuxt-link to="/admin/news/makes">新規作成</nuxt-link>
        </div>
      </div>
      <div class="list_body">
        <div class="list_wrap" v-for="news_data in news_data" :key="news_data.length">
          <div class="list_item" :id="news_data.id">
            <p class="id">{{ news_data.id }}</p>
            <p class="title">{{ news_data.title }}</p>
            <p class="date">{{ news_data.datetime }}</p>
            <nuxt-link class="link" target="_blank" :to="news_data.href">
              <font-awesome-icon :icon="['fas','external-link-alt']" />
            </nuxt-link>
            <nuxt-link class="link" :to="news_data.edit_href">
              <font-awesome-icon :icon="['fas','pencil-alt']" />
            </nuxt-link>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Meta from '~/mixins/meta';
import firebase from "~/plugins/firebase";

import admin_header from "~/components/admin_header.vue";
import admin_alart from "~/components/admin_alart.vue";

const db = firebase.firestore();
const news_db = db.collection("news");


export default {
  mixins: [Meta], 
  data(){
    return {
      meta: {
        title: "お知らせ管理 - コンテンツ管理コンソール" ,
        description: "",
        type: 'page',
        url: 'https://vcnp.nekozuki.me/admin',
      },
    }
  },
  components: {
    admin_header,
    admin_alart
  },
  computed: {
    isLogin() {
      return this.$store.getters["user/isLogin"];
    },
    isAdmin() {
      return this.$store.getters["user/isAdmin"];
    },
    displayName() {
      return this.$store.getters["user/displayName"];
    }
  },
  async asyncData(){
    const querySnapshot_news = await news_db
      .orderBy("date", "desc")
      .get()
      .catch(function (error) {
        console.error("firestore: news: " + error);
    });

    let datas = {};
    let news_data = [];

    querySnapshot_news.forEach((doc) => {
      datas = doc.data();
      datas.id = doc.id;
      datas.href = "/news/" + doc.id;
      datas.edit_href = "/admin/news/" + doc.id;

      var date = new Date(datas.date.seconds * 1000);
      datas.datetime = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();

      news_data.push(datas);
    });

    return{
      news_data
    }
  },
  mounted(){
    firebase.auth().onAuthStateChanged(user => {
      this.$store.dispatch("user/login", user);
    });
  }
}
</script>