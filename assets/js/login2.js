// ajsx的基本配置
$.ajaxPrefilter(function (options) {
    // 在酶促JQ发送ajax请求前会执行该函数，通过该函数的形参options可以获取到每次ajax的配置项
    // 来修改每次请求的配置项
    options.url = "http://ajax.frontend.itheima.net" + options.url;
    // console.log(options.url);

    // 处理请求头
    if (options.url.indexOf('/my/') !== -1) {
        // 有/my/ ==> 需要在请求头中带上Authorization 身份认证字段
        options.headers = {
            Authorization: localStorage.getItem("token"),
        };

    }


    // 控制用户访问权限
    options.complete = function (xhr) {
        // 请求完成就会执行的函数（不论是失败还是成功都会执行的）
        // 形参可以获取到xhr对象
        //   console.log(xhr);
        if (
            xhr.responseJSON.status !== 0 &&
            xhr.responseJSON.message === "身份认证失败！"
        ) {
            // 回到登录页面重新登录
            // 把token也清除掉
            localStorage.removeItem("token");
            location.href = "login.html";
        }

    }
})
