<template>
  <div class="admin_container">
    <admin-header />
    <main>
      <div class="no_login" v-show="!isLogin">
        <h2>ログインしてください</h2>
        <img src="~assets/alicia_ng.png" alt="" srcset="">
      </div>
    </main>

  </div>
</template>

<script>
import Meta from '~/mixins/meta';
import firebase from "~/plugins/firebase";
import admin_header from "~/components/admin_header.vue";

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
    }
  },
  mounted(){
    firebase.auth().onAuthStateChanged(user => {
      this.$store.dispatch("user/login", user);
    });
  }
}
</script>