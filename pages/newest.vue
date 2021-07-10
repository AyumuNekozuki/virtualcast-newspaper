<template>
  <div class="newread">
    <h2 class="newread_h2">最新刊へ移動します…</h2>
  </div>
</template>

<script>
import firebase from "~/plugins/firebase";

const db = firebase.firestore();
const archives_db = db.collection("archives");

let newest_id;

export default {
  head () {
    return {
      titleTemplate: null,
      title: 'Vキャス新聞',
    }
  },
  async asyncData({redirect}){
    const querySnapshot = await archives_db
      .orderBy("date", "desc")
      .limit(1)
      .get()
      .catch(function (error) {
        console.error("firestore: archives: " + error);
      });

    querySnapshot.forEach((doc) => {
      newest_id = doc.id;
    });

    var newest_href = "/archives/" + newest_id;
    redirect(302, newest_href);
  }
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