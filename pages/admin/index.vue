<template>
  <div class="admin_container">
    <admin-header />
    <main>
      <div class="no_login" v-if="!isLogin">
        <h2>ログインしてください</h2>
        <img src="~assets/alicia_ng.png" alt="" srcset="">
      </div>
      <div class="no_login no_admin" v-if="(isLogin && !isAdmin)">
        <h2>アクセス権限がありません</h2>
        <p>システム管理者へお問い合わせください。</p>
        <img src="~assets/alicia_ng.png" alt="" srcset="">
      </div>
      <div class="console_area" v-if="(isLogin && isAdmin)">
        
      </div>
    </main>

  </div>
</template>

<script>
import Meta from '~/mixins/meta';
import firebase from "~/plugins/firebase";

import admin_header from "~/components/admin_header.vue";

const db = firebase.firestore();

export default {
  mixins: [Meta], 
  data(){
    return {
      meta: {
        title: "記事管理コンソール" ,
        description: "",
        type: 'page',
        url: 'https://vcnp.nekozuki.me/admin',
      },
    }
  },
  components: {
    admin_header
  },
  computed: {
    isLogin() {
      return this.$store.getters["user/isLogin"];
    },
    isAdmin() {
      return this.$store.getters["user/isAdmin"];
    }
  },
  mounted(){
    firebase.auth().onAuthStateChanged(user => {
      this.$store.dispatch("user/login", user);
    });
  }
}
</script>