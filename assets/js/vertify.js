const form = layui.form;
// const layer = layui.layer;

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
  },
  nickname: [/^[\S]{1,6}$/, "昵称须为1-6位,且不能出现空格"],
})