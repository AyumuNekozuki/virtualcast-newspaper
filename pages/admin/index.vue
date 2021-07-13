<template>
    <div class="admin_container newread">
    <h2 class="newread_h2">Comming Soon...</h2>
  </div>
</template>

<script>
import Meta from '~/mixins/meta';
export default {
  mixins: [Meta], 
  data(){
    this.$nuxt.error({
      statusCode: 503
    });

    return {
      meta: {
        title: "記事管理" ,
        description: "",
        type: 'page',
        url: 'https://vcnp.nekozuki.me/admin',
      },
    }
  }
}
</script>