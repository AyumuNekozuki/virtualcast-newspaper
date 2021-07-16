<template>
  <div class="admin_container">
    <admin-header />
    <main>
      <div class="logout_button_wrapper">
        <button @click="logout">ログアウト</button>
      </div>
    </main>
  </div>
</template>

<script>
import Meta from '~/mixins/meta';
import Auth from "~/components/auth.vue";
import admin_header from "~/components/admin_header.vue";

export default {
  mixins: [Meta], 
  data(){
    return {
      meta: {
        title: "コンテンツ管理パネル" ,
        description: "",
        type: 'page',
        url: 'https://vcnp.nekozuki.me/admin',
      },
    }
  },
  components: {
    Auth,
    admin_header
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
.logout_button_wrapper{
  display: flex;
  justify-content: center;
  margin: 5em;
}
.logout_button_wrapper button{
  font-size: 24px;
  padding: .5em 1em;
  margin: 0 .5em;
  background-color: #0080ff;
  border-radius: 5px;
  color: white;
}
.logout_button_wrapper button:hover{
  opacity: .8;
}
</style>