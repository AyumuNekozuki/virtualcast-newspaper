import firebase from "~/plugins/firebase";

export const state = () => ({
  email: '',
  displayName: '',
  uid: '',
  is_admin: ''
});

export const actions = ({
  login({commit}, user){
    commit('setEmail', user.email);
    commit('setDisplayName', user.displayName);
    commit('setUid', user.uid);

    let is_adminuser = false;
    var ref_adminuser = firebase.firestore().collection("users").doc(user.uid);
    ref_adminuser.get().then((doc)=>{

      if(doc.data().uid){
        is_adminuser = true;
      }else{
        is_adminuser = false;
      }
      commit('setAdmin', is_adminuser);

    }).catch((error)=>{

      is_adminuser = false;
      commit('setAdmin', is_adminuser);
      
    });
    
  },
  logout({commit}){
    let logoutcheck = confirm('ログアウトします。よろしいですか？');
    if(logoutcheck){
      commit('setEmail', '');
      commit('setDisplayName', '');
      commit('setUid', '');
      commit('setAdmin', '');
    }
  }
});

export const mutations = {
  setEmail(state, email){
    state.email = email;
  },
  setDisplayName(state, displayName){
    state.displayName = displayName;
  },
  setUid(state, uid){
    state.uid = uid;
  },
  setAdmin(state, is_admin){
    state.is_admin = is_admin;
  }
};

export const getters = {
  isLogin: state => {
    return !!state.email;
  },
  isAdmin: state => {
    return !!state.is_admin;
  },
  displayName: state => {
    return state.displayName;
  }
}