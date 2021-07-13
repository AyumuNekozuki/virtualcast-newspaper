<template>
  <div class="auth_login_container">
    <div id="firebaseui-auth-container"></div>
    <p>ログインした場合、 <a href="/policy">プライバシポリシー</a> に同意したものとみなします。</p>
  </div>
</template>

<script>
import firebase from "~/plugins/firebase";

export default {
  mounted(){
    const firebaseui = require("firebaseui");
    require("firebaseui/dist/firebaseui.css");

    const uiConfig = {
      signInSuccessUrl: "/admin",
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID
      ]
    };

    const ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start("#firebaseui-auth-container", uiConfig);

    firebase.auth().onAuthStateChanged(async (user) => {
      this.$store.dispatch("user/login", user);
    }); 
  }
}
</script>

<style>
.auth_login_container p{
  text-align: center;
  margin: 2em 0 0;
}
.auth_login_container p a{
  color: #0080ff;
}
</style>