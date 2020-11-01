// 获取文章分类,更新下拉菜单内容
var form = layui.form;

// 渲染下拉按钮内容 文章分类列表
initEditor();

initCate();
//渲染富文本

function initCate() {
  getMy2("/my/article/cates", function (res) {
    if (res.status) {
      laypage.msg(res.message);
      return;
    }
    // 渲染下拉菜单
    let trList = ['<option value="">请选择文章类别</option>'];
    res.data.forEach((item) => {
      const trHTML = `<option value=${item.Id}>${item.name}</option>`;
      trList.push(trHTML);
    })
    $("select").html(trList.join(""));
    form.render();
  })

}


// 图片裁剪
var $image = $('#image')

var options = {
  aspectRatio: 400 / 280,
  preview: '.img-preview'
}

$image.cropper(options);

//选择文件上传
$(".layui-btn-danger").click(function () {
  $("input[type=file]").click();
})



$("input[type=file]").change(function (e) {
  const file = this.files[0];
  if (!file) {
    layer.msg("未选择任何文件");
    return;
  }
  const newImgURL = URL.createObjectURL(file);
  $image.cropper("destroy").attr("src", newImgURL).cropper(options);

  // cover_img
})

$("form").on("submit", function (e) {
  // e.preventDefault();
  let fd = new FormData(this);
  // var tinycontent = tinymce.get('content').getContent();
  // // console.log(tinycontent);
  // fd.set("content", tinycontent);

  //!为什么富文本第一次获取不正确 

  // 获得画布上的内容
  $image.cropper('getCroppedCanvas', {
    width: 400,
    height: 280
  }).toBlob(function (blob) { // 将 Canvas 画布上的内容，转化为文件对象
    // 得到文件对象后，进行后续的操作

    fd.append("cover_img", blob);
    fd.append("state", "已发布");

    for (var [a, b] of fd.entries()) {
      console.log(a, b);
    }


    // const xhr = new XMLHttpRequest();
    // xhr.open("POST", "http://ajax.frontend.itheima.net/my/article/add");
    // xhr.setRequestHeader("Authorization", token || "");
    // xhr.send(fd);
    // xhr.onreadystatechange = function () {
    //   if (xhr.readyState === 4 && xhr.status === 200) {
    //     const res = JSON.parse(xhr.responseText);
    //     console.log(res);
    //   }
    // }

  });

 
  







})