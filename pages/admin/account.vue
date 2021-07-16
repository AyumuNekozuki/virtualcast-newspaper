<template>
  <div class="admin_container account_container">
    <div class="admin_header">
      <div class="title_area">
        <h1><nuxt-link to="/admin/account">個人アカウント設定</nuxt-link></h1>
      </div>
      <div class="login_area">
        <div v-show="isLogin">
          <p>{{ displayName }} さん</p>
          <button @click="logout">ログアウト</button>
        </div>
        <div v-show="!isLogin">
          <a href="/admin/login">ログイン</a>
        </div>
      </div>
    </div>
    <section class="alart">
      <div class="no_login" v-if="!isLogin">
        <h2>ログインしてください</h2>
        <img src="~assets/alicia_ng.png" alt="" srcset="">
      </div>
    </section>
    <main class="console_area console_top" v-if="isLogin">
      <h2>{{ displayName }} さん、こんにちは！</h2>
      <div class="no_login no_admin" v-if="!isAdmin">
        <p>アクセス権限がないため、管理パネルにはアクセスできません。</p>
      </div>
      <div id="firebaseui-auth-container"></div>
    </main>
  </div>
</template>

<script>
import Meta from '~/mixins/meta';
import firebase from "~/plugins/firebase";

export default {
  mixins: [Meta], 
  data(){
    return {
      meta: {
        title: "アカウント管理 - コンテンツ管理パネル" ,
        description: "",
        type: 'page',
        url: 'https://vcnp.nekozuki.me/admin/account',
      },
    }
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
  },
  methods: {
    logout() {
      this.$store.dispatch("user/logout");
      firebase
        .auth()
        .signOut()
        .then(() => {
          console.log("ログアウトしました");
        });
    },
  }
}
</script>

<style>

</style>