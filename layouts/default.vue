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
}
</style>