<template>
  <div class="admin_container">
    <h1>管理コンソール ログイン</h1>
    <auth />
  </div>
</template>

<script>
import Meta from '~/mixins/meta';
import Auth from "~/components/Auth.vue";

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
    Auth
  }
}
</script>

<style>
</style>