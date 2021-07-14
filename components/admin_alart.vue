<template>
  <div>
    <section class="alart" v-if="(!isLogin || !isAdmin)">
      <div class="no_login" v-if="!isLogin">
          <h2>ログインしてください</h2>
          <img src="~assets/alicia_ng.png" alt="" srcset="">
      </div>
      <div class="no_login no_admin" v-if="(isLogin && !isAdmin)">
        <h2>アクセス権限がありません</h2>
        <p>システム管理者へお問い合わせください。</p>
        <img src="~assets/alicia_ng.png" alt="" srcset="">
      </div>
    </section>
  </div>

</template>

<script>
export default {
  computed: {
    isLogin() {
      return this.$store.getters["user/isLogin"];
    },
    isAdmin() {
      return this.$store.getters["user/isAdmin"];
    },
    displayName() {
      return this.$store.getters["user/displayName"];
    }
  },
}
</script>

<style>

</style>