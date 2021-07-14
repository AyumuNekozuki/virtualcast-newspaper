<template>
  <div class="admin_container">
    <admin-header />
    <admin-alart />
    <main class="console_area console_edit" v-if="(isLogin && isAdmin)">
      <div class="editor news_editor" :id="news_id">
        <div class="editor_header">
          <div class="wrap">
            <h3>お知らせ （ ID: {{ news_id }} ） 情報編集</h3>
          </div>
          <div class="wrap">
          <button @click="append_data">公開</button>
          </div>
        </div>
        <div class="editor_body">
          <div class="input_area">
            <div class="input_title">
              <label>タイトル</label><input type="text" id="input_title" name="namae" size="40" maxlength="75" placeholder="タイトルを入力してください" :value="news_doc_data.title">
            </div>
            <div class="input_date">
              <label>公開日</label><input type="date" id="input_date" name="date" size="40" maxlength="75" placeholder="日付を入力してください" :value="news_doc_data.date">
            </div>
            <div class="input_text">
              <textarea name="input_textarea" id="input_textarea" cols="30" rows="30" placeholder="本文を入力してください" :value="news_doc_data.content"></textarea>
            </div>
          </div>
          <div class="view_area news_page">
            <div class="news_contents">
              <h2 class="title" id="output_title"></h2>
              <p class="date" id="output_date">{{ news_doc_data.date }}</p>
              <div class="news_content_area" id="output_textarea"></div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Meta from '~/mixins/meta';
import firebase from "~/plugins/firebase";
import admin_header from "~/components/admin_header.vue";
import admin_alart from "~/components/admin_alart.vue";
const db = firebase.firestore();
const news_db = db.collection("news");

export default {
  mixins: [Meta], 
  data(){
    return {
      meta: {
        title: "お知らせ - コンテンツ管理パネル" ,
        description: "",
        type: 'page',
        url: 'https://vcnp.nekozuki.me/admin',
      },
    }
  },
  components: {
    admin_header,
    admin_alart
  },
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
  async asyncData({ params }) {
    const news_id = params.ids;
    const document = await news_db.doc(news_id).get();
    let news_doc_data = document.data();

    var date = new Date(news_doc_data.date.seconds * 1000);
    news_doc_data.date = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();

    return{
      news_doc_data,
      news_id
    }
  },
  mounted(){
    firebase.auth().onAuthStateChanged(user => {
      this.$store.dispatch("user/login", user);
    });

    if(process.client){
      //初期化
       $('#output_textarea').html($('#input_textarea').val());
       $('#output_title').html($('#input_title').val());

      $(document).on('input', '#input_title', function(e) {
        $('#output_title').html($('#input_title').val());
      });
      $(document).on('input', '#input_textarea', function(e) {
        $('#output_textarea').html($('#input_textarea').val());
      });
      $(document).on('input', '#input_date', function(e) {
        $('#output_date').html($('#input_date').val());
      });
    }
  },
  methods: {
    append_data(){
      let check = confirm('投稿します。よろしいですか？');
      if(check){
        var append_title = $('#input_title').val();
        var append_date = $('#output_date').text();
        var append_content = $('#input_textarea').val();

        var data = {
          title: append_title,
          date: new Date(append_date),
          content: append_content,
          is_thumbnail: false
        }

        var news_id = $('.editor.news_editor').attr('id');
        const res = news_db.doc(news_id).set(data);

        if(!alert("投稿が完了しました。")){
          window.$nuxt.$router.push('/admin/news');
        }
        
      }
    }
  }
}
</script>