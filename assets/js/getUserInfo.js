const urlPrime = "http://ajax.frontend.itheima.net";
const token = localStorage.getItem("token");

const xhr = new XMLHttpRequest();

function getMy(geturl) {
  xhr.open("GET", urlPrime + geturl);
  xhr.setRequestHeader("Authorization", token || "");
  xhr.send();
}

function postMy(posturl, data) {

  xhr.open("POST", urlPrime + posturl);
  xhr.setRequestHeader('Content-type', "application/x-www-form-urlencoded");
  xhr.setRequestHeader("Authorization", token || "");
  xhr.send(data);

}



function vertifyRes(res) {
  if (res.status !== 0) {
    layer.msg(res.msg);
    location.href = "login.html";
  }
}

