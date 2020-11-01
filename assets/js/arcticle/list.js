var laypage = layui.laypage;
var form = layui.form;



let q = {
  pagenum: 1,
  pagesize: 2,
  cate_id: "",
  state: "",
};
let limit = 2;

initCate();
getArcticle();




//根据查询字符串向服务器请求数据
function getArcticle() {
  const xhr = new XMLHttpRequest();
  let geturl = "/my/article/list" + queryStr(q);
  xhr.open("GET", urlPrime + geturl);
  xhr.setRequestHeader("Authorization", token || "");
  xhr.send();


  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const res = JSON.parse(xhr.responseText);
      if (res.status !== 0) {
        layer.msg(res.message);
        return;
      }
      // console.log(res);

      renderArcticle(res.data);
      renderPage(res);
    }

  }

}

// 渲染分页按钮
function renderPage(res) {
  laypage.render({
    elem: 'page',
    count: res.total,
    curr: q.pagenum,
    limit: q.pagesize,
    limits: [2, 3, 5, 10],
    layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
    jump: function (obj, first) {
      //obj包含了当前分页的所有参数，比如：
      if (first) {
        // console.log("first触发");
        // const pagetotal = Math.ceil(res.total / q.pagesize);
        // if (pagetotal === 0) {
        //   q.pagenum = 1;
        // } else if (q.pagenum > pagetotal) {
        //   q.pagenum = pagetotal;
        //   getArcticle();
        // }
        return;
      }


      q.pagenum = obj.curr;
      getArcticle();

      if (q.pagesize !== obj.limit) {
        // console.log(obj.limit);
        q.pagesize = obj.limit;
        q.pagenum = 1;
        getArcticle();
      }
    }
  });
}

//根据数据数组渲染文章列表表格
function renderArcticle(array) {
  var trList = [];
  array.forEach(function (item) {
    const trHTML = `
    <tr>
        <td>${item.title}</td>
        <td>${item.cate_name}</td>
        <td>${formatDate(item.pub_date)}</td>
        <td>${item.state}</td>
        <td id=${item.Id}>
          <button type="button" class="layui-btn layui-btn-sm editbtn">编辑</button>
          <button type="button" class="layui-btn layui-btn-sm layui-btn-danger delbtn">删除</button>
        </td>
    </tr>
    `;
    trList.push(trHTML);
  })
  $("#arcticleList tbody").html(trList.join(""));

}


// 拼接查询字符串
function queryStr(q) {
  let queryStr = "?pagenum=" + q.pagenum + "&pagesize=" + q.pagesize;
  if (q.cate_id.trim()) {
    queryStr = queryStr + "&cate_id=" + q.cate_id;
  }
  if (q.state.trim()) {
    queryStr = queryStr + "&state=" + q.state;
  }
  return queryStr;
}


// 渲染分类的下拉菜单
function initCate() {
  // const xhr = new XMLHttpRequest();
  getMy("/my/article/cates");
  xhrChange(function (res) {
    // console.log(res);

    let cateList = [];
    cateList.push(`<option value="">所有分类</option>`)
    res.data.forEach(function (item) {
      cateList.push(`<option value="${item.Id}">${item.name}</option>`)
    })
    // console.log($("#cate"));
    $("#cate").html(cateList.join(""));
    form.render();
  })
}

//监听筛选表单的提交
$("form").on("submit", function (e) {
  e.preventDefault();
  // console.log($("#cate")[0].value);
  q.pagenum = 1;
  q.cate_id = $("#cate")[0].value;
  q.state = $("select[name=state]")[0].value;
  // console.log(q);
  getArcticle();

})


// 删除btn
$("tbody").on("click", ".delbtn", function () {

  const id = this.parentNode.id;
  // console.log(id);
  const len = $(".delbtn").length;
  if (len === 1) {
    q.pagenum = q.pagenum === 1 ? 1 : --q.pagenum;
    console.log(q.pagenum);
  }

  layer.confirm('确认删除?', {
    icon: 3,
    title: '提示'
  }, function (index) {
    const geturl = "/my/article/delete/" + id;
    getMy2(geturl, function (res) {
      layer.msg(res.message);
      if (res.status) {
        return;
      }
      // 还要判别一下当页是否还有数据


      getArcticle();
    })

    layer.close(index);
  });
})


//! 编辑btn




//格式化时间
function formatDate(time) {
  const date = new Date(time);
  const y = date.getFullYear();
  const m = padZero(date.getMonth() + 1);
  const d = padZero(date.getDate());

  const hh = padZero(date.getHours());
  const mm = padZero(date.getMinutes());
  const ss = padZero(date.getSeconds());
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
}


//补零
function padZero(n) {
  return n > 9 ? n : "0" + n;
}