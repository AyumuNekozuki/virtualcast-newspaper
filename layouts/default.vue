<template>
  <div>
    <Header />
    <Nuxt />
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: 'default',
  components:{
    Header,
    Footer
  }
}
</script>

<style>
body{
  box-sizing: border-box;
  background: #F2F5F7;
  font-feature-settings: "palt";
}

.prev_pages{
  color: #0080ff;
  font-size: 14px;
  line-height: 14px;
  display: block;
  margin: .5em 0 1em;
}
.prev_pages::before{
  content: "<";
  margin: 0 .5em;
  font-size: 14px;
  line-height: 14px;
}
.prev_pages:hover{
  opacity: .8;
}
</style>