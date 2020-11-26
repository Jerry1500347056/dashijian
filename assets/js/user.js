$(function () {

    // 发送ajax获取用户信息
    let form = layui.form;

    heihei();
    function heihei() {
        $.ajax({
            url: "/my/userinfo",
            success: function (res) {
                // console.log(res);


                if (res.status !== 0) {
                    return layer.msg('获取用户基本信息失败！');
                }

                // 获取用户信息成功 把获取到的信息填充到form里面
                form.val('userForm', res.data)

            }
        })

    }

    $('.layui-btn-primary').on('click', function (e) {
        e.preventDefault()
        heihei();

    })

    $('#userForm').submit(function (e) {
        e.preventDefault();
        let data = $(this).serialize();
        // console.log(data);
        $.ajax({
            url: '/my/userinfo',
            type: 'POST',
            data,
            success: function (res) {
                // console.log(res);
                // console.log(window.parent);
                window.parent.getinfo();
            }

        })


    })
    form.verify({
        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        pass: [
            /^[\S]{1,6}$/
            , '昵称长度必须要在1-6个字符之间'
        ]
    });

})