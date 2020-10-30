const exit = document.querySelector("#exit");
exit.onclick = function () {
  layer.confirm('确认退出系统?', {
    icon: 3,
    title: '提示'
  }, function (index) {
    localStorage.removeItem("token");
    location.href = "login.html";
    layer.close(index);
  });
}


const urlPrime = "http://ajax.frontend.itheima.net";

// 存储这次获得的用户信息
var userinfo = {};

const token = localStorage.getItem("token");


const xhr = new XMLHttpRequest();
xhr.open("GET", urlPrime + "/my/userinfo");
xhr.setRequestHeader("Authorization", token || "");
xhr.send();

xhr.onreadystatechange = function (e) {
  if (xhr.readyState === 4 && xhr.status === 200) {
    const res = JSON.parse(xhr.responseText);
    console.log(res);
    //验证用户是否有令牌，没令牌强制退出系统
    vertifyRes(res);
    userinfo = res.data;
    //验证成功 执行下方代码

    loadUser(res.data.nickname, res.data.username, res.data.user_pic);
  }
}




function vertifyRes(res) {
  if (res.status !== 0) {
    layer.msg(res.msg);
    location.href = "login.html";
  }
}


function loadUser(nickname, username, avatar) {

  $("#username").text(nickname || username)
  if (avatar) {
    $(".avatar").hide().siblings("img").prop("src", avatar).show();
  } else {
    $(".avatar").show().text(nickname[0].toUpperCase() || username[0].toUpperCase()).siblings("img").hide();
  }
}