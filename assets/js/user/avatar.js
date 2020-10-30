// 1.1 获取裁剪区域的 DOM 元素
var $image = $('#image')
// 1.2 配置选项
const options = {
  // 纵横比
  aspectRatio: 1,
  // 指定预览区域
  preview: '.img-preview'
}

// 1.3 创建裁剪区域
$image.cropper(options);



$("#avatarfile").change(function (e) {
  const file = e.target.files[0];
  // console.log(file);
  if (!file) {
    // console.log("未选择文件");
    layer.msg("未选择文件");
    return;
  }

  let newImgURL = URL.createObjectURL(file);
  // console.log(newImgURL);
  $image
    .cropper('destroy') // 销毁旧的裁剪区域
    .attr('src', newImgURL) // 重新设置图片路径
    .cropper(options);


});


$("#load").click(function () {
  $("#avatarfile").click();
})

$("#reAvatar").on("click", function () {

  if (!$("#avatarfile").val()) {
    layer.msg("请先上传文件")
    return;
  }

  const dataURL = $image.cropper("getCroppedCanvas", {
    width: 100,
    height: 100
  }).toDataURL('image/png');

  // const data = "avatar=" + dataURL;
  const data = "avatar=" + encodeURIComponent(dataURL);
  // 发送ajax
  postMy("/my/update/avatar", data);

  xhr.onreadystatechange = function (e) {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const res = JSON.parse(xhr.responseText);
      layer.msg(res.message);
      if (res.status === 0) {
        // 更新主页中存储的数据
        window.parent.userinfo["user_pic"] = dataURL;
        const reLoadUserinfo = window.parent.userinfo;
        window.parent.loadUser(reLoadUserinfo.nickname, reLoadUserinfo.username, reLoadUserinfo.user_pic)
      }

    }
  }

})