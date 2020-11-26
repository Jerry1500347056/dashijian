$(function () {
    let form = layui.form;
    let layer = layui.layer;
    form.verify({
        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        pass: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        newPwd: function (value, item) {
            let pwd = $('[name=oldPwd]').val();
            // console.log(pwd, value);
            if (pwd === value) {
                return '新密码不能与原密码相同'

            }

        },
        rePwd: function (value, item) {
            let newPwd = $('[name=newPwd]').val();
            // console.log(value, newPwd);
            if (value !== newPwd) {
                return '两次输入的密码不一致'
            }

        }

    });

    let $form = $('#userpwd')

    $form.submit(function (e) {
        e.preventDefault();

        let data = $(this).serialize();
        // console.log(data);

        $.ajax({
            url: '/my/updatepwd',
            type: 'POST',
            data,
            success: function (res) {
                console.log(res);

                if (res.status !== 0) {
                    return layer.msg("重置密码失败" + res.message
                    )
                }

                layer.msg('重置密码成功')

                // 重置表单中的密码框内容
                $form.get(0).reset()
            }
        })
    })
})
