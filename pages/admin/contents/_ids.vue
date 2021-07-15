<template>
  <div class="admin_container">
    <admin-header />
    <admin-alart />
    <main class="console_area console_edit" v-if="(isLogin && isAdmin)">
      <div class="editor news_editor" :id="archive_id">
        <div class="editor_header">
          <div class="wrap">
            <h3>記事管理 （ ID: {{ archive_id }} ） 情報編集</h3>
          </div>
          <div class="wrap">
            <button type="submit" class="cansel" @click="cansel">キャンセル</button>
            <button @click="append_data">公開</button>
          </div>
        </div>
        <div class="editor_body">
          <div class="input_area">
            <div class="input_text">
              <label>公開日</label><input required type="text" id="input_id" name="input_id" size="40" maxlength="75" placeholder="YYYYMMDD" v-model="archive_id">
            </div>
            <div class="input_text">
              <label>ページ数</label><input required type="text" id="input_pages" name="input_date" size="40" maxlength="75" placeholder="半角数字で入力してください" v-model="archives_data.pages">
            </div>
            <hr>
            <details open class="topics">
              <summary>TOPICS</summary>
              <div class="input_text">
                <label>TOPICS ①</label><input required type="text" class="input_topics" name="input_topics_01" size="40" maxlength="75" placeholder="spanで囲むと□で囲まれます" v-model="archives_data.topics_01">
              </div>
              <div class="input_text">
                <label>TOPICS ②</label><input required type="text" class="input_topics" name="input_topics_02" size="40" maxlength="75" placeholder="spanで囲むと□で囲まれます" v-model="archives_data.topics_02">
              </div>
              <div class="input_text">
                <label>TOPICS ③</label><input required type="text" class="input_topics" name="input_topics_03" size="40" maxlength="75" placeholder="spanで囲むと□で囲まれます" v-model="archives_data.topics_03">
              </div>
              <div class="input_text">
                <label>TOPICS ④</label><input required type="text" class="input_topics" name="input_topics_04" size="40" maxlength="75" placeholder="spanで囲むと□で囲まれます" v-model="archives_data.topics_04">
              </div>
            </details>
            <hr>
            <details class="vci">
              <summary>関連VCI</summary>
              <div class="input_text">
                <label>VCI ①</label><input type="text" class="input_vci" name="input_vci_01" size="40" maxlength="75" placeholder="URLのみ入力してください" v-model="archives_data.vci_01">
              </div>
              <div class="input_text">
                <label>VCI ②</label><input type="text" class="input_vci" name="input_vci_02" size="40" maxlength="75" placeholder="URLのみ入力してください" v-model="archives_data.vci_02">
              </div>
              <div class="input_text">
                <label>VCI ③</label><input type="text" class="input_vci" name="input_vci_03" size="40" maxlength="75" placeholder="URLのみ入力してください" v-model="archives_data.vci_03">
              </div>
              <div class="input_text">
                <label>VCI ④</label><input type="text" class="input_vci" name="input_vci_04" size="40" maxlength="75" placeholder="URLのみ入力してください" v-model="archives_data.vci_04">
              </div>
            </details>
            <hr>
            <details class="nico">
              <summary>関連コンテンツ</summary>
              <div class="input_text">
                <label>nico 固定</label><input disabled type="text" size="40" maxlength="75" placeholder="co3814846">
              </div>
              <div class="input_text">
                <label>nico ①</label><input type="text" class="input_nico" name="input_nico_01" size="40" maxlength="75" placeholder="ニコニココンテンツIDを入力してください" v-model="archives_data.nico_01">
              </div>
              <div class="input_text">
                <label>nico ②</label><input type="text" class="input_nico" name="input_nico_02" size="40" maxlength="75" placeholder="ニコニココンテンツIDを入力してください" v-model="archives_data.nico_02">
              </div>
              <div class="input_text">
                <label>nico ③</label><input type="text" class="input_nico" name="input_nico_03" size="40" maxlength="75" placeholder="ニコニココンテンツIDを入力してください" v-model="archives_data.nico_03">
              </div>
              <div class="input_text">
                <label>nico ④</label><input type="text" class="input_nico" name="input_nico_04" size="40" maxlength="75" placeholder="ニコニココンテンツIDを入力してください" v-model="archives_data.nico_04">
              </div>
              <div class="input_text">
                <label>nico ⑤</label><input type="text" class="input_nico" name="input_nico_05" size="40" maxlength="75" placeholder="ニコニココンテンツIDを入力してください" v-model="archives_data.nico_05">
              </div>
            </details>
            <hr>
            <details class="url">
              <summary>関連URL</summary>
              <div class="input_text">
                <label>URL ①</label><input type="text" class="input_url" name="input_url_01" size="40" maxlength="75" placeholder="URLのみ入力してください" v-model="archives_data.url_01">
              </div>
              <div class="input_text">
                <label>URL ②</label><input type="text" class="input_url" name="input_url_02" size="40" maxlength="75" placeholder="URLのみ入力してください" v-model="archives_data.url_02">
              </div>
              <div class="input_text">
                <label>URL ③</label><input type="text" class="input_url" name="input_url_03" size="40" maxlength="75" placeholder="URLのみ入力してください" v-model="archives_data.url_03">
              </div>
              <div class="input_text">
                <label>URL ④</label><input type="text" class="input_url" name="input_url_04" size="40" maxlength="75" placeholder="URLのみ入力してください" v-model="archives_data.url_04">
              </div>
            </details>
          </div>
          <div class="view_area" id="WatchApp">
            <div class="wrapper" :id="archive_id">
              <h2 class="page_title" v-html="archive_id"></h2>

              <div class="watch_area" :id="archives_data.pages">
                
              </div>
              <p class="message"><font-awesome-icon :icon="['fas','search-plus']" />画像クリックで拡大します</p>
              <div class="tab_area">
                <div class="tab_wrap">
                  <button class="tabitem active" id="topics_tab_but">TOPICS</button>
                  <button class="tabitem" id="vci_tab_but">関連VCI</button>
                  <button class="tabitem" id="nico_tab_but">関連コンテンツ</button>
                  <button class="tabitem" id="url_tab_but">関連リンク</button>
                </div>
                <div class="section_wrap">
                  <section class="topics_item tab_content" id="topics_content">
                    <h2>TOPICS</h2>
                    <div class="item_list">
                      <p class="output_topics" v-html="archives_data.topics_01"></p>
                      <p class="output_topics" v-html="archives_data.topics_02"></p>
                      <p class="output_topics" v-html="archives_data.topics_03"></p>
                      <p class="output_topics" v-html="archives_data.topics_04"></p>
                    </div>
                  </section>
                  <section class="vci_item tab_content hide" id="vci_content">
                    <h2>関連VCI</h2>
                    <div class="iframe_list list_vci">
                      <a class="output_vci" data-iframely-url :href="archives_data.vci_01">{{ archives_data.vci_01 }}</a>
                      <a class="output_vci" data-iframely-url :href="archives_data.vci_02">{{ archives_data.vci_02 }}</a>
                      <a class="output_vci" data-iframely-url :href="archives_data.vci_03">{{ archives_data.vci_03 }}</a>
                      <a class="output_vci" data-iframely-url :href="archives_data.vci_04">{{ archives_data.vci_04 }}</a>
                    </div>
                  </section>
                  <section class="nico_item tab_content hide" id="nico_content">
                    <h2>関連コンテンツ</h2>
                    <div class="iframe_list">
                      <iframe src="https://com.nicovideo.jp/thumb_community/co3814846" scrolling="no" frameborder="0"></iframe>
                      <iframe class="output_nico" :src="archives_data.nico_01" scrolling="no" frameborder="0"></iframe>
                      <iframe class="output_nico" :src="archives_data.nico_02" scrolling="no" frameborder="0"></iframe>
                      <iframe class="output_nico" :src="archives_data.nico_03" scrolling="no" frameborder="0"></iframe>
                      <iframe class="output_nico" :src="archives_data.nico_04" scrolling="no" frameborder="0"></iframe>
                      <iframe class="output_nico" :src="archives_data.nico_05" scrolling="no" frameborder="0"></iframe>
                    </div>
                  </section>
                  <section class="url_item tab_content hide" id="url_content">
                    <h2>関連リンク</h2>
                    <div class="iframe_list">
                      <a class="output_url" data-iframely-url :href="archives_data.url_01">{{ archives_data.url_01 }}</a>
                      <a class="output_url" data-iframely-url :href="archives_data.url_02">{{ archives_data.url_02 }}</a>
                      <a class="output_url" data-iframely-url :href="archives_data.url_03">{{ archives_data.url_03 }}</a>
                      <a class="output_url" data-iframely-url :href="archives_data.url_04">{{ archives_data.url_04 }}</a>
                    </div>
                  </section>
                  <p style="margin:1.5em 1.5em 1em; font-size:12px;">※管理パネルではURLの描画確認・シェアボタンの確認はできません</p>
                </div>
              </div>
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
const archives_db = db.collection("archives");

export default {
  mixins: [Meta], 
  data(){
    return {
      meta: {
        title: "記事管理 - コンテンツ管理パネル" ,
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
    const archive_id = params.ids;
    const document = await archives_db.doc(archive_id).get();
    let archives_data = document.data();

    let is_data = {
      vci: true,
      nico: true,
      url: true
    };

    return{
      archives_data,
      archive_id,
      is_data
    }
  },
  mounted(){
    firebase.auth().onAuthStateChanged(user => {
      this.$store.dispatch("user/login", user);
    });

    if(process.client){
      //初期化
      for(var i = 0; i < 4; i++){
        if($('.input_nico').index(i)){
          var eqs = $('.input_nico').index(i);
          var contentid = ($('.input_nico').eq(eqs)).val()
          var contenttype = contentid.slice(0,2);
          var nicourl;

          switch (contenttype) {
            case ("sm" || "so"): //動画
              nicourl = "https://ext.nicovideo.jp/thumb/" + contentid;
              break;
            case ("my"): //マイリスト
              nicourl = "https://ext.nicovideo.jp/thumb_mylist/" + contentid.slice(7);
              break;
            case ("se"): //シリーズ
              nicourl = "https://ext.nicovideo.jp/thumb_series/" + contentid.slice(7);
              break;
            case ("us"): //ユーザー
              nicourl = "https://ext.nicovideo.jp/thumb_user/" + contentid.slice(5);
              break;
            case ("lv"): //生放送
              nicourl = "https://live.nicovideo.jp/embed/" + contentid;
              break;
            case ("co"): //コミュ
              nicourl = "https://com.nicovideo.jp/thumb_community/" + contentid;
              break;
            case ("ch"): //CH
              nicourl = "https://ch.nicovideo.jp/" + contentid + "/thumb_channel";
              break;
            case ("td"): //立体
              nicourl = "https://3d.nicovideo.jp/externals/widget?id=" + contentid;
              break;
            default:
              nicourl = "https://ext.nicovideo.jp/thumb/";
              break;
          }

          ($('.output_nico').eq(eqs)).attr('src', nicourl);
        }

      }

      $(document).on('input', '.input_nico', function(e) {
        var eqs = $('.input_nico').index(this);
        var contentid = ($('.input_nico').eq(eqs)).val()
        var contenttype = contentid.slice(0,2);
        var nicourl;

        switch (contenttype) {
          case ("sm" || "so"): //動画
            nicourl = "https://ext.nicovideo.jp/thumb/" + contentid;
            break;
          case ("my"): //マイリスト
            nicourl = "https://ext.nicovideo.jp/thumb_mylist/" + contentid.slice(7);
            break;
          case ("se"): //シリーズ
            nicourl = "https://ext.nicovideo.jp/thumb_series/" + contentid.slice(7);
            break;
          case ("us"): //ユーザー
            nicourl = "https://ext.nicovideo.jp/thumb_user/" + contentid.slice(5);
            break;
          case ("lv"): //生放送
            nicourl = "https://live.nicovideo.jp/embed/" + contentid;
            break;
          case ("co"): //コミュ
            nicourl = "https://com.nicovideo.jp/thumb_community/" + contentid;
            break;
          case ("ch"): //CH
            nicourl = "https://ch.nicovideo.jp/" + contentid + "/thumb_channel";
            break;
          case ("td"): //立体
            nicourl = "https://3d.nicovideo.jp/externals/widget?id=" + contentid;
            break;
          default:
            nicourl = "https://ext.nicovideo.jp/thumb/";
            break;
        }

        ($('.output_nico').eq(eqs)).attr('src', nicourl);
      });

      $('.tabitem').on('click', function() {
        tab_click($(this));
      });

    }

    function tab_click(click_btn){
      var id = click_btn.attr("id");
      $('.tabitem').removeClass("active");
      $('#' + id).addClass("active");

      $('.tab_content').addClass("hide");
      id = id.slice(0 ,-8);
      $('.'+ id +'_item').removeClass("hide");
    }
  },
  methods: {
    append_data(){
      var check = confirm('投稿します。よろしいですか？');
      if(check){
        function toDate (str) {
          var arr = (str.substr(0, 4) + '/' + str.substr(4, 2) + '/' + str.substr(6, 2)).split('/');
          return new Date(arr[0], arr[1] - 1, arr[2]);
        };

        var archive_id = $('#input_id').val();

        var data = {
          date: toDate(archive_id),
          pages: $('#input_pages').val(),
          topics_01: $('.input_topics').eq(0).val(),
          topics_02: $('.input_topics').eq(1).val(),
          topics_03: $('.input_topics').eq(2).val(),
          topics_04: $('.input_topics').eq(3).val()
        }

        //VCI
        if(!($('.input_vci').eq(0).val() == "")){ data.vci_01 = $('.input_vci').eq(0).val() }
        if(!($('.input_vci').eq(1).val() == "")){ data.vci_02 = $('.input_vci').eq(1).val() }
        if(!($('.input_vci').eq(2).val() == "")){ data.vci_03 = $('.input_vci').eq(2).val() }
        if(!($('.input_vci').eq(3).val() == "")){ data.vci_04 = $('.input_vci').eq(3).val() }

        //NICO
        if(!($('.input_nico').eq(0).val() == "")){ data.nico_01 = $('.input_nico').eq(0).val() }
        if(!($('.input_nico').eq(1).val() == "")){ data.nico_02 = $('.input_nico').eq(1).val() }
        if(!($('.input_nico').eq(2).val() == "")){ data.nico_03 = $('.input_nico').eq(2).val() }
        if(!($('.input_nico').eq(3).val() == "")){ data.nico_04 = $('.input_nico').eq(3).val() }
        if(!($('.input_nico').eq(4).val() == "")){ data.nico_05 = $('.input_nico').eq(4).val() }

        //URL
        if(!($('.input_url').eq(0).val() == "")){ data.url_01 = $('.input_url').eq(0).val() }
        if(!($('.input_url').eq(1).val() == "")){ data.url_02 = $('.input_url').eq(1).val() }
        if(!($('.input_url').eq(2).val() == "")){ data.url_03 = $('.input_url').eq(2).val() }
        if(!($('.input_url').eq(3).val() == "")){ data.url_04 = $('.input_url').eq(3).val() }

        archives_db.doc(archive_id).set(data);

        if(!alert("投稿が完了しました。")){
          window.$nuxt.$router.push('/admin/contents');
        }
        
      }
    },
    cansel(){
      var check = confirm('編集内容が破棄されます。よろしいですか？');
      if(check){
        window.$nuxt.$router.push('/admin/contents');
      }
    }
  }
}
</script>