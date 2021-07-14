<template>
  <div class="admin_header">
    <div class="title_area">
      <h1><nuxt-link to="/admin">コンテンツ管理パネル</nuxt-link></h1>
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
</template>

<script>
import firebase from "~/plugins/firebase";

export default {
  computed: {
    isLogin() {
      return this.$store.getters["user/isLogin"];
    },
    displayName() {
      return this.$store.getters["user/displayName"];
    }
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
    }
  }
}
</script>

<style>

</style>