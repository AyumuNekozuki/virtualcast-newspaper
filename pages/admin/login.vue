<template>
  <div class="admin_container">
    <admin-header />
    <Auth />
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
  }
}
</script>

<style>
</style>