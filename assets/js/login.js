//去注册 去登录的跳转功能

const jump = document.querySelectorAll(".jump");
const login = document.querySelector("#login");
const register = document.querySelector("#register");
jump[0].onclick = function () {
  login.style.display = "none";
  register.style.display = "block";
}
jump[1].onclick = function () {
  register.style.display = "none";
  login.style.display = "block";
}



//表单的验证功能
const form = layui.form;
const layer = layui.layer;

form.verify({
  psw: [
    /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
  ],
  username: function (value, item) { //value：表单的值、item：表单的DOM对象
    if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
      return '用户名不能有特殊字符';
    }
    if (new RegExp(/^[\d]+$/).test(value)) {
      return '用户名不能是纯数字';
    }
  },
  repsw: function (value, item) {
    const psw = document.querySelector("#password");
    if (value !== psw.value) {
      return "两次密码输入不一致";
    }
  }
})

//表单的提交功能
//注册
const formRegister = register.querySelector("form");

const urlPrime = "http://ajax.frontend.itheima.net";

formRegister.addEventListener("submit", function (e) {
  e.preventDefault();
  // 取出数据
  let data = `username=${formRegister.querySelector("input[name=username]").value}&password=${formRegister.querySelector("input[name=password]").value}`;
  //发起ajax
  const xhr = new XMLHttpRequest();
  xhr.open("POST", urlPrime + "/api/reguser");
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send(data);
  xhr.onreadystatechange = function () {

    if (xhr.readyState === 4 && xhr.status === 200) {
      res = JSON.parse(xhr.responseText);

      layer.msg(res.message);

      if (res.status === 0) {
        jump[1].click();
        return;
      }
    }
  }
})

login.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();
  let data = `username=${login.querySelector("input[name=username]").value}&password=${login.querySelector("input[name=password]").value}`;
  const xhr = new XMLHttpRequest();
  xhr.open("POST", urlPrime + "/api/login");
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send(data);
  xhr.onreadystatechange = function () {

    if (xhr.readyState === 4 && xhr.status === 200) {
      res = JSON.parse(xhr.responseText);

      layer.msg(res.message);
      if (res.status === 0) {
        localStorage.setItem("token", res.token);
        location.href="index.html";
        return;
      }
    }
  }

})