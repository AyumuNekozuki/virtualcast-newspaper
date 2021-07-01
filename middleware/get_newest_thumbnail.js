function get_newest_thumbnail(ids){
  storageRef.child('archives/'+ ids +'/head.png').getDownloadURL().then(function(imgurl){
    $('.headimg').append("<img id='newest_thumbnail' src='"+ imgurl + "' href='"+ newest_date +"'>");
  }).catch(function(error){
    console.error('firebase_storage :'+ error)
  });
}