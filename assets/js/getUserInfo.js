const urlPrime = "http://ajax.frontend.itheima.net";
const token = localStorage.getItem("token");

const xhr = new XMLHttpRequest();

function getMy(geturl) {
  // const xhr = new XMLHttpRequest();
  xhr.open("GET", urlPrime + geturl);
  xhr.setRequestHeader("Authorization", token || "");
  xhr.send();


}

function postMy(posturl, data) {
  // const xhr = new XMLHttpRequest();
  xhr.open("POST", urlPrime + posturl);
  xhr.setRequestHeader('Content-type', "application/x-www-form-urlencoded");
  xhr.setRequestHeader("Authorization", token || "");
  xhr.send(data);

}


function xhrChange(callback) {
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const res = JSON.parse(xhr.responseText);
      callback(res);
    }

  }
}


function getMy2(geturl, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", urlPrime + geturl);
  xhr.setRequestHeader("Authorization", token || "");
  xhr.send();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const res = JSON.parse(xhr.responseText);
      callback(res);
    }

  }


}




function vertifyRes(res) {
  if (res.status !== 0) {
    layer.msg(res.msg);
    location.href = "login.html";
  }
}