$(function () {
    let layer = layui.layer;
    $('.tuichu').on('click', function () {
        layer.confirm('确定退出吗?', { icon: 3, title: '提示' }, function (index) {
            //do something
            // 跳转到login页面
            location.href = '/home/login.html'
            // 清除本地的token
            localStorage.removeItem('token')


            layer.close(index);
        });
    })


    // 发送ajax请求获取到用户信息  渲染到页面中
    $.ajax({
        url: '/my/userinfo',
        success: function (res) {
            // console.log(res);

            if (res.status !== 0) {
                return layer.msg('获取用户信息失败')

            }
            // layer.msg('获取用户信息成功')


            // 处理头像和昵称

            // 1.先处理名字(优先展示昵称，其次在是用户名)
            let name = res.data.nickname || res.data.username;
            let first = name[0].toUpperCase();
            $('.welcome').text('欢迎' + name)

            // 在处理头像
            // 根据res的data的user_pic来做不同的处理
            if (res.data.user_pic) {
                // 有用户头像，展示用户头像，隐藏文字头像
                $('.layui-nav-img').show().attr('src', res.data.user_pic);
                $('.text-avatar').hide();

            } else {
                // 没有用户头像，隐藏哟用户头像，  展示文字头像 ==>文字头像的文字来源于name的第一个字符(大写的)
                $(".layui-nav-img").hide();
                $(".text-avatar").text(first).show()
            }
        }
        // , complete: function (xhr) {
        //     // 请求完成就会执行的函数(不论是失败还是成功都会执行的)
        //     // 形参可以获取到xhr独享
        //     // console.log(xhr);
        //     if (xhr.responseJSON.status === 1 && xhr.responseJSON.message === '身份认证失败！') {
        //         // 回到登录页面重新登录
        //         // 把token也清除掉
        //         localStorage.removeItem('token')
        //         location.href = 'login.html'
        //     }



    })
})