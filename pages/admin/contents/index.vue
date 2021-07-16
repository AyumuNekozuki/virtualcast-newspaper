<template>
  <div class="admin_container">
    <admin-header />
    <admin-alart />
    <main class="console_area console_list" v-if="(isLogin && isAdmin)">
      <div class="list_header">
        <div class="wrap">
          <h3>記事管理</h3>
        </div>
        <div class="wrap">
          <nuxt-link to="/admin/contents/makes">新規作成</nuxt-link>
        </div>
        
      </div>
      <div class="list_body">
        <div class="list_wrap" v-for="archives_data in archives_data" :key="archives_data.length">
          <div class="list_item" :id="archives_data.id">
            <p class="id">{{ archives_data.id }}</p>
            <p class="title">
              <span v-html="archives_data.topics_01"></span>
              <span v-html="archives_data.topics_02"></span>
              <span v-html="archives_data.topics_03"></span>
              <span v-html="archives_data.topics_04"></span>
            </p>
            <p class="date">{{ archives_data.datetime }}</p>
            <nuxt-link class="link" target="_blank" :to="archives_data.href">
              <font-awesome-icon :icon="['fas','external-link-alt']" />
            </nuxt-link>
            <nuxt-link class="link" :to="archives_data.edit_href">
              <font-awesome-icon :icon="['fas','pencil-alt']" />
            </nuxt-link>
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
        title: "記事管理 - コンテンツ管理コンソール" ,
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
  async asyncData(){
    const querySnapshot_archives = await archives_db
      .orderBy("date", "desc")
      .get()
      .catch(function (error) {
        console.error("firestore: archives: " + error);
    });

    let datas = {};
    let archives_data = [];

    querySnapshot_archives.forEach((doc) => {
      datas = doc.data();
      datas.id = doc.id;
      datas.href = "/archives/" + doc.id;
      datas.edit_href = "/admin/contents/" + doc.id;

      var date = new Date(datas.date.seconds * 1000);
      datas.datetime = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();

      archives_data.push(datas);
    });

    return{
      archives_data
    }
  },
  mounted(){
    firebase.auth().onAuthStateChanged(user => {
      this.$store.dispatch("user/login", user);
    });
  }
}
</script>