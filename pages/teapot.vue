<template>
  <div class="teapot">

  </div>
</template>

<script>
import Meta from '~/mixins/meta';
export default {
  mixins: [Meta], 
  data(){
    this.$nuxt.error({
      statusCode: 418
    });

    return {
      meta: {
        title: "I'm a teapot." ,
        description: "コーヒー？私作れないよ？",
        type: 'article',
        url: 'https://vcnp.nekozuki.me/teapot',
      },
    }
  }
}
</script>

<style>

</style>