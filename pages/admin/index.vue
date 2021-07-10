<template>
    <div class="admin_container newread">
    <h2 class="newread_h2">Comming Soon...</h2>
  </div>
</template>

<script>
import Meta from '~/mixins/meta';

export default {
  mixins: [Meta], 
  data() {
    return {
      meta: {
        title: "Admin" ,
        description: '',
        type: 'pages',
        url: 'https://vcnp.nekozuki.me/admin',
      },
    }
  },
}
</script>