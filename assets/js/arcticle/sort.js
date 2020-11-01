loadSort();

function loadSort() {
  getMy("/my/article/cates");
  xhrChange(function (res) {
    console.log(res);
    if (res.status !== 0) {
      layer.msg("文章列表获取失败");
      return;
    }

    let tbodyHTML = [];
    res.data.forEach(function (item) {
      const trHTML = `
        <tr>
          <td>${item.name}</td>
          <td>${item.alias}</td>
          <td id=${item.Id}>
            <button type="button" class="layui-btn layui-btn-sm editbtn">编辑</button>
            <button type="button" class="layui-btn layui-btn-sm layui-btn-danger delbtn">删除</button>
          </td>
        </tr>
  `;
      tbodyHTML.push(trHTML);
    })

    const tbodyInner = tbodyHTML.join("");
    $("tbody")[0].innerHTML = tbodyInner;

  })
}

let index = 0;


$(".layui-btn-normal").click(function () {
  index = layer.open({
    type: 1,
    title: '添加文章分类',
    content: $("#dialog").html(),
    area: '500px',
    resize: false,
  });
})

$("body").on("submit", "#addform", function (e) {
  e.preventDefault();
  const data = $(this).serialize();
  postMy("/my/article/addcates", data);
  xhrChange(function (res) {
    // console.log(res);
    layer.msg(res.message);
    if (res.status === 0) {
      layer.close(index);
      // layer.msg(res.message);
      loadSort();
    }
  })
})


let id = 0;
$("body").on("click", ".editbtn", function () {
  id = this.parentNode.id;
  index = layer.open({
    type: 1,
    title: '修改文章分类',
    content: $("#editSort").html(),
    area: '500px',
    resize: false,
  });

  $("#editform input")[0].value = $(this).parents("tr").find("td:eq(0)").text();
  $("#editform input")[1].value = $(this).parents("tr").find("td:eq(1)").text();

})


$("body").on("submit", "#editform", function (e) {
  e.preventDefault();

  let data = $(this).serialize();
  data = data + "&Id=" + id;

  postMy("/my/article/updatecate", data);
  xhrChange(function (res) {

    layer.msg(res.message);
    if (res.status === 0) {
      layer.close(index);

      loadSort();
    }
  })
})

$("body").on("click", ".delbtn", function () {
  id = this.parentNode.id;

  layer.confirm('删除本条分类?', {
    icon: 0,
    title: '提示'
  }, function (index) {
    //do something
    geturl = "/my/article/deletecate/" + id;
    getMy(geturl);
    xhrChange(function (res) {
      layer.msg(res.message);
      if (res.status === 0) {
        loadSort();
      }
    })

    layer.close(index);
  });


})