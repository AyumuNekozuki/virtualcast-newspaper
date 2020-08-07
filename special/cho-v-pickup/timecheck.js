var today = new Date();
var reload = new Date(2020, 8, 9, 15, 00, 00);

var preview = document.getElementById("preview");
var user = document.getElementById("user");

if(today.getTime() >= reload.getTime()){
  user.classList.remove("hide");
  preview.classList.add("hide");
}