<template>
  <div class="pages_container special_container">
    <div class="wide_wrapper">
      <h2 class="page_title">特集</h2>

      <div class="special_wrap" id="special_wrap">

        <div class="special_list_wrap" v-for="specials_data in specials_data" :key="specials_data.length">

          <section class="special_contents" :id="specials_data.id">
            <nuxt-link class="special_headimg" :to="specials_data.href"></nuxt-link>
            <div class="special_topics_wrap">
              <h2 class="title">{{ specials_data.title }}</h2>
              <p class="desc" v-html="specials_data.description"></p>
              <div class="links">
                <p class="date">{{ specials_data.start }} 〜 {{ specials_data.fin }}</p>
                <a :href="specials_data.href">特設ページ</a>
              </div>
            </div>
          </section>

        </div>
      </div>

    </div>

  </div>
</template>

<script>
import Meta from '~/mixins/meta';
import firebase from "~/plugins/firebase";

const db = firebase.firestore();
const special_db = db.collection("special");
const storage = firebase.storage();
const storageRef = storage.ref();

export default {
  mixins: [Meta], 
  data() {
    return {
      meta: {
        title: "特集" ,
        description: '過去の特集一覧です。',
        type: 'pages',
        url: 'https://vcnp.nekozuki.me/special',
      },
    }
  },
  async asyncData(context) {
    const querySnapshot_special = await special_db
      .get()
      .catch(function (error) {
        console.error("firestore: special: " + error);
      });
    
    let specials_data = [];
    let special_data = {};

    querySnapshot_special.forEach((doc) => {
      special_data = doc.data();
      special_data.id = doc.id + "";

      var date = new Date(special_data.start.seconds * 1000);
      special_data.start = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
      date = new Date(special_data.fin.seconds * 1000);
      special_data.fin = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();

      special_data.href = '/special/' + special_data.href;

      specials_data.push(special_data);
    });

    return{
      specials_data
    }
  },
  mounted(){
    if(process.client){
      var count = 0;
      var if_check_url;
      
      var Interval = setInterval(function(){
        get_special_thumbnail();
        if((if_check_url == undefined) && (count > 3)){
          clearInterval(Interval);
        };
      },500);
    }

    function get_special_thumbnail(){ //get
      var ids = $('section.special_contents').eq(count).attr('id');
      if_check_url = ids;
      if(ids == undefined){
        clearInterval(Interval);
      }else{
        storageRef.child('special/'+ ids +'/'+ ids +'.png').getDownloadURL().then(function(imgurl){
          $('.special_headimg').eq(count - 1).prepend("<img id='old_thumbnail' src='"+ imgurl + "' alt='"+ ids +"'>");
        }).catch(function(error){
          console.error('storage :'+ error);
          $('.special_headimg').eq(count - 1).prepend("<img src='~/assets/alicia_ng.png' alt='error!'>");
        });
        count = count + 1;
      }
    };
  }
}
</script>

<style>
/** 共通 */
div.pages_container{
  margin: 0 auto;
  padding: 1em 2em;
  max-width: 1336px;
}
.pages_container h2.page_title{
  font-weight: bold;
  font-size: 26px;
  margin: .5em 10px;
}

/** Special */
section.special_contents{
  display: flex;
  flex-direction: row-reverse;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 1px 3px rgba(0,0,0,.25);
  padding: 15px;
  margin: 20px 5px;
  min-height: 250px;
}
section.special_contents .special_headimg{
  width: 35%;
  background-image: url('~/assets/spin-gray.svg');
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 25%;
  display:flex;
  align-content: center;
}
section.special_contents .special_headimg img{
  width: 100%;
  object-fit: contain;
}
section.special_contents .special_topics_wrap{
  width: 65%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

section.special_contents h2.title{
  font-weight: bold;
  font-size: 22px;
  margin: .5em 10px;
}
section.special_contents p,
section.special_contents a{
  font-size: 18px;
  line-height: 1.7;
  margin: .5em 1em;
}

section.special_contents .links{
  border-top: 1px solid #999;
  display: flex;
  justify-content: flex-end;
  align-items: center;

}
section.special_contents .links a{
  background-color: #0080ff;
  padding: .25em .75em;
  border-radius: 5px;
  color: white;
}
section.special_contents a:hover{
  opacity: .8;
}

</style>