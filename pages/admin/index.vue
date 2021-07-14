<template>
  <div class="admin_container">
    <admin-header />
    <admin-alart />
    <main class="console_area console_top" v-if="(isLogin && isAdmin)">
      <h2>{{ displayName }} さん、こんにちは！</h2>
      <div class="menu_wrap">
        <nuxt-link to="/admin/news">お知らせ管理</nuxt-link>
        <nuxt-link to="/admin/contents">記事管理</nuxt-link>
      </div>
      <div class="alladmin">
        <h3>サーバー管理</h3>
        <p>※特権管理者のみログインできます</p>
        <a target="_blank" href="https://console.firebase.google.com/project/virtualcast-newspaper/overview?hl=ja">Firebase Console</a>
        <a target="_blank" href="https://dashboard.heroku.com/apps/vcnp">Heroku Dashboard</a>
        <a target="_blank" href="https://manage.statuspage.io/">Statuspage.io</a>
      </div>
    </main>

  </div>
</template>

<script>
import Meta from '~/mixins/meta';
import firebase from "~/plugins/firebase";

import admin_header from "~/components/admin_header.vue";
import admin_alart from "~/components/admin_alart.vue";

export default {
  mixins: [Meta], 
  data(){
    return {
      meta: {
        title: "TOP - コンテンツ管理コンソール" ,
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
  mounted(){
    firebase.auth().onAuthStateChanged(user => {
      this.$store.dispatch("user/login", user);
    });
  }
}
</script>