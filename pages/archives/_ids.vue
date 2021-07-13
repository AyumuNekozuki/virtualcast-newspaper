<template>
  <div class="pages_container watch" id="WatchApp">
    <div class="wrapper" :id="archives_id">
      <h2 class="page_title">{{ title }}</h2>

      <div class="watch_area" :id="archive_doc_data.pages">
        
      </div>
      <p class="message"><font-awesome-icon :icon="['fas','search-plus']" />画像クリックで拡大します</p>
      <div class="tab_area">
        <div class="tab_wrap">
          <button class="tabitem active" id="topics_tab_but">TOPICS</button>
          <button class="tabitem" v-bind:disabled="!is_data.vci" id="vci_tab_but">関連VCI</button>
          <button class="tabitem" v-bind:disabled="!is_data.nico" id="nico_tab_but">関連コンテンツ</button>
          <button class="tabitem" v-bind:disabled="!is_data.url" id="url_tab_but">関連リンク</button>
        </div>
        <div class="section_wrap">
          <section class="topics_item tab_content" id="topics_content">
            <h2>TOPICS</h2>
            <div class="item_list">
              <p v-html="archive_doc_data.topics_01"></p>
              <p v-html="archive_doc_data.topics_02"></p>
              <p v-html="archive_doc_data.topics_03"></p>
              <p v-html="archive_doc_data.topics_04"></p>
            </div>
          </section>
          <section class="vci_item tab_content hide" id="vci_content">
            <h2>関連VCI</h2>
            <div class="iframe_list">
              <a data-iframely-url :href="archive_doc_data.vci_01"></a>
              <a data-iframely-url :href="archive_doc_data.vci_02"></a>
              <a data-iframely-url :href="archive_doc_data.vci_03"></a>
              <a data-iframely-url :href="archive_doc_data.vci_04"></a>
            </div>
          </section>
          <section class="nico_item tab_content hide" id="nico_content">
            <h2>関連コンテンツ</h2>
            <div class="iframe_list">
              <iframe src="https://com.nicovideo.jp/thumb_community/co3814846" scrolling="no" frameborder="0"></iframe>
              <iframe :src="archive_doc_data.nico_01" scrolling="no" frameborder="0"></iframe>
              <iframe :src="archive_doc_data.nico_02" scrolling="no" frameborder="0"></iframe>
              <iframe :src="archive_doc_data.nico_03" scrolling="no" frameborder="0"></iframe>
              <iframe :src="archive_doc_data.nico_04" scrolling="no" frameborder="0"></iframe>
              <iframe :src="archive_doc_data.nico_05" scrolling="no" frameborder="0"></iframe>
            </div>
          </section>
          <section class="url_item tab_content hide" id="url_content">
            <h2>関連リンク</h2>
            <div class="iframe_list">
              <a data-iframely-url :href="archive_doc_data.url_01"></a>
              <a data-iframely-url :href="archive_doc_data.url_02"></a>
              <a data-iframely-url :href="archive_doc_data.url_03"></a>
              <a data-iframely-url :href="archive_doc_data.url_04"></a>
            </div>
          </section>
        </div>
        <div class="share_area" id="addtoany_init">
          <!-- AddToAny BEGIN -->
          <div class="a2a_kit a2a_kit_size_32 a2a_default_style">
            <a class="a2a_dd" href="https://www.addtoany.com/share"></a>
            <a class="a2a_button_twitter"></a>
            <a class="a2a_button_facebook"></a>
            <a class="a2a_button_line"></a>
            <a class="a2a_button_hatena"></a>
            <a class="a2a_button_mastodon"></a>
            <a class="a2a_button_copy_link"></a>
          </div>
          <!-- AddToAny END -->
        </div>
      </div>
    </div>
  </div>
</template>
  
<style>
/** 共通 */
div.pages_container {
  margin: 0 auto;
  padding: 1em 2em;
  max-width: 1336px;
}
.pages_container h2.page_title {
  font-weight: bold;
  font-size: 26px;
  margin: 0.5em 10px;
}

</style>

<script>
import Meta from '~/mixins/meta';
import firebase from "~/plugins/firebase";

const db = firebase.firestore();
const archives_db = db.collection("archives");
const storage = firebase.storage();
const storageRef = storage.ref();

let title, archives_id;
let is_data = {
  vci: true,
  nico: true,
  url: true
};

export default {
  async asyncData({ params }){
    archives_id = params.ids + "";
    const document = await archives_db.doc(archives_id).get()
      .catch(function(error){
        this.$nuxt.error({
          statusCode: 404,
          message: error
        });
      });
    let archive_doc_data = {
      pages: 0,
      topics_01: undefined
    }

    if(typeof archive_doc_data !== 'undefined'){
      archive_doc_data = document.data();
    }

    var arr = (archives_id.substr(0, 4) + "/" + archives_id.substr(4, 2) + "/" + archives_id.substr(6, 2)).split("/");
    var date = new Date(arr[0], arr[1] - 1, arr[2]);
    title = date.getFullYear() + "年" + (date.getMonth() + 1) + "月" + date.getDate() + "日";

    //disabled
    if(typeof archive_doc_data !== 'undefined'){
      if(archive_doc_data.vci_01 == undefined){
        is_data.vci = false;
      }
      if(archive_doc_data.url_01 == undefined){
        is_data.url = false;
      }
    }

    archive_doc_data.pages = "pages_" + archive_doc_data.pages;


    return{
      title,
      archives_id,
      archive_doc_data,
      is_data
    }
  },
  mixins: [Meta], 
  data() {
    return {
      meta: {
        title: title ,
        description: title + "発行のVキャス新聞です。",
        type: 'article',
        url: 'https://vcnp.nekozuki.me/archive/' + archives_id,
      },
    }
  },
  mounted(){
    if(process.client){
      var count = 0;
      var check_count_id = $('.watch_area').attr("id");
      var check_count = check_count_id + "";
      check_count = check_count.substr(6);
      var archives_id_img = $('.wrapper').attr("id");;

      var Interval = setInterval(function(){
        watch_get_img();
        if(count >= check_count){
          clearInterval(Interval);
        };
      },500);

      var addtoany_init = "<script>var a2a_config = a2a_config || {};a2a_config.locale = 'ja';<"+ "/script><script src='https://static.addtoany.com/menu/page.js'><" + "/script>";
      $('#addtoany_init').append(addtoany_init);

      var embedjs_init = "<script async charset='utf-8' src='//cdn.iframe.ly/embed.js?api_key=2e3587807406fa2350bd4d'><" + "/script>";
      $('.section_wrap').append(embedjs_init);

      var viewerinit = "<script>var viewer = new Viewer(document.getElementById('"+ check_count_id +"'));<" + "/script>";
      setTimeout(function(){
        $('.tabitem').append(viewerinit);
      },2250);
  

      $('.tabitem').on('click', function() {
        tab_click($(this));
      });

    }
 
    function watch_get_img(){

      storageRef.child('archives/'+ archives_id_img +'/' + (count + 1) +'.png').getDownloadURL().then(function(imgdata) {
        if(!($('img[src="'+ imgdata +'"').length)){
          $('.watch_area').append("<img class='watch_imgs' id='pages_"+ count +"' src='"+ imgdata + "'>");
        }
      }).catch(function(error){
        console.error('storage :'+ error);
        $('.watch_area').append("<img src='~/assets/alicia_ng.png' alt='error!'>");
      });
      count = count + 1;
    }

    function tab_click(click_btn){
      var id = click_btn.attr("id");
      $('.tabitem').removeClass("active");
      $('#' + id).addClass("active");

      $('.tab_content').addClass("hide");
      id = id.slice(0 ,-8);
      $('.'+ id +'_item').removeClass("hide");
    }
  }
};
</script>