<template>
  <div class="ErrorPage">
    <div class="ErrorPage_wrap">
      <main class="ErrorPage_content">
        <section v-if="error.statusCode === 404">
          <h2>404 - Page Not Found</h2>
          <p>ページが見つかりませんでした。</p>
          <div class="error_icon"></div>
          <nuxt-link to="/">TOP</nuxt-link>
        </section>
        <section v-if="error.statusCode === 418">
          <h2>418 - I'm a teapot</h2>
          <p>私はコーヒーが苦手なの！</p>
          <div class="error_icon"></div>
          <p></p>
          <nuxt-link to="/">TOP</nuxt-link>
        </section>
        <section v-if="error.statusCode === 503">
          <h2>503 - Service Unavailable</h2>
          <p>現在メンテナンス中です。</p>
          <div class="error_icon"></div>
          <p></p>
          <nuxt-link to="/">TOP</nuxt-link>
        </section>
        <section v-if="(!((error.statusCode === 404) || (error.statusCode === 418) || (error.statusCode === 503)))">
          <h2>Error!</h2>
          <p>エラーが発生しました。</p>
          <div class="error_icon"></div>
          <nuxt-link to="/">TOP</nuxt-link>
        </section>
      </main>
    </div>

  </div>
</template>

<script>
export default {
  name: 'error',
  props: ['error'],
  head(){
    return {
      titleTemplate: null,
      title: 'Vキャス新聞',
    }
  }

}
</script>

<style>
.ErrorPage_wrap{
  display: flex;
  justify-content: center;
}
.ErrorPage_content{
  margin: 3em;
}
.ErrorPage_content section{
  background-color: white;
  border-radius: 10px;
  padding: 3em;
  text-align: center;
}
.ErrorPage_content section .error_icon{
  height: 150px;
  background-image: url('~/assets/alicia_ng.png');
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 30%;
}
.ErrorPage_content section h2{
  font-size: 24px;
  font-weight: bold;
  margin: 1em 2em;
}
.ErrorPage_content section p,
.ErrorPage_content section a{
  font-size: 18px;
  margin: 1em 2em;
}
.ErrorPage_content section a{
  display: inline-block;
  color: #0080ff;
  text-decoration: underline;
}
.ErrorPage_content section a:hover{
  text-decoration: none;
}
</style>