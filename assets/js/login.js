$(function () {

    $('.loginletf a').on('click', function () {
        $('.loginletf').hide();
        $('.loginright').show();
    })

    $('.loginright a').on('click', function () {
        $('.loginletf').show();
        $('.loginright').hide();
    })
    let layer = layui.layer;
    let form = layui.form;
    form.verify({
        pass: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
        repass: function (value, item) {
            // console.log(value);
            let pwd = $(".loginright input[name=password]").val();
            // console.log(pwd);
            if (value !== pwd) {
                return "两次输入的密码不一致!";
            }
        },
    });



    // 注册的ajax代码

    $('#loginright').on('submit', function (e) {
        e.preventDefault();
        // 收集表单数据
        let data = $(this).serialize();
        // console.log(data);


        // 直接发送ajax请求
        $.ajax({
            type: 'POST',
            data: data,
            url: '/api/reguser',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('注册失败!' + res.message);

                }
                layer.msg('注册成功！！')
                // 跳转到登录页面
                $('.loginright a').click();

            }
        })
    })


    // 登录的ajax代码
    $('#loginleft').on('submit', function (e) {
        e.preventDefault();
        // 收集表单数据
        let data = $(this).serialize();
        // console.log(data);


        // 直接发送ajax请求
        $.ajax({
            type: 'POST',
            data: data,
            url: '/api/login',
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('登录失败! 用户名或密码错误');

                }
                localStorage.setItem("token", res.token);
                layer.msg('登录成功，即将去后台主页', {
                    time: 1500 //1.5秒钟后跳转
                }, function () {
                    // 关闭后做的事 ==> 跳转页面
                    location.href = 'index.html'

                })

            }
        })
    })

})