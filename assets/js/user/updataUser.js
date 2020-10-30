let id = 0;
let userinfoPrime = [];

getMy("/my/userinfo");
load();


function load() {

  xhr.onreadystatechange = function (e) {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const res = JSON.parse(xhr.responseText);
      // console.log(res);
      //验证用户是否有令牌，没令牌强制退出系统
      vertifyRes(res);

      //验证成功 执行下方代码
      id = res.data.id;
      userinfoPrime = [id, res.data.nickname, res.data.email];

      $("input[name=username]").val(res.data.username);
      if (res.data.nickname) {
        $("input[name=nickname]").val(res.data.nickname);
      }
      if (res.data.email) {
        $("input[name=email]").val(res.data.email);
      }
    }
  }
}



$("form").submit(function (e) {
  
  e.preventDefault();
  if ($("input[name=nickname]").val() === userinfoPrime[1] && $("input[name=email]").val() === userinfoPrime[2]) {
    layer.msg("未修改内容");
    return;
  }

  let data = $("form").serialize();
  data = data + "&id=" + id;

  postMy("/my/userinfo", data);

  xhr.onreadystatechange = function (e) {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const res = JSON.parse(xhr.responseText);
      layer.msg(JSON.parse(xhr.responseText).message);
      if (res.status === 0) {
        userinfoPrime = [id, $("input[name=nickname]").val(), $("input[name=email]").val()];
        window.parent.loadUser(userinfoPrime[1], userinfoPrime[2])
      }
      
    }
  }
})

$("button[type=button]").click(function () {
  $("input[name=nickname]").val(userinfoPrime[1]);
  $("input[name=email]").val(userinfoPrime[2]);
})