<template>
  <div class="newread">
    <h2 class="newread_h2">最新刊へ移動します…</h2>
  </div>
</template>

<script>
let newest_id;

export default {
  head () {
    return {
      titleTemplate: null,
      title: 'Vキャス新聞',
    }
  },
}


</script>

<style>
h2.newread_h2{
  text-align: center;
  font-size: 32px;
  margin: 2em;
  font-weight: bold;
}
</style>