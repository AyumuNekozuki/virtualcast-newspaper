const archives_db = db.collection("archives");
archives_db.orderBy("date", "desc").limit(1).get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    var id = doc.id;
    var url = 'https://vcnp.nekozuki.me/archives/'+ id + '/';
    location.href = url;
  });
});