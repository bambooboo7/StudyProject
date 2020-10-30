$("form").submit(function (e) {
  e.preventDefault();
  const data = $("form").serialize();
  console.log(data);

  postMy("/my/updatepwd", data);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const res = JSON.parse(xhr.responseText);
      // console.log(res);
      layer.msg(res.message);
      $("button[type=reset]").click();
    }
  }

})