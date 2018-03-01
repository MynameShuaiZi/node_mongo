$(()=>{

    var $uname=$("#uname1");
    var $upwd=$("#upwd1");
    var $ureg=/^[0-9a-z]{3,10}$/;
    var $preg=/^[0-9a-z]{3,10}$/;
    var $cpwd=$("#cpwd");
    //用户名的检验
    $uname.blur(function(){
        checkName();
    })

    function checkName(){
        $.post(
            "users/register",
            $("form").serialize()
        ).then(data=>{
            if(data==false){
                $uname.next().fadeIn().html("用户名已存在").css("color","#A32B3F");
            }
            else
                $uname.next().fadeIn().html("正确").css("color","#6FC1A1");
        })
    }
        //密码提示
        $upwd.blur(function(){
            Tabs();
        })
        function Tabs(){
            if($upwd.val()==""){
                $upwd.next().fadeIn().html("密码不能为空").css("color","#A32B3F");
            }else{
                $upwd.next().fadeIn().html("正确").css("color","#6FC1A1");
            }
        }
        //检查密码和确认密码是否一样
        $cpwd.blur(function(){
            checkPwd();
        })
        function checkPwd(){
            if($upwd.val()!=$cpwd.val()){
                $cpwd.next().fadeIn().html("不正确").css("color","#A32B3F");
            }else{
                $cpwd.next().fadeIn().html("正确").css("color","#6FC1A1");
            }
        }
       //提交表单!
       var $btn= $("div.login-btn");
        $btn.click(function(){
            if($uname.val()==""){
                $uname.next().fadeIn().html("用户名不为空").css("color","#A32B3F");
                return;
            }
                if($upwd.val()==""){
                    $upwd.next().fadeIn().html("密码不为空").css("color","#A32B3F");
                    return;}
                    if($cpwd.val()==""){
                        $cpwd.next().fadeIn().html("重复密码不为空").css("color","#A32B3F");
                        return;
            }
            $.post(
                "users/register_submit",
                $("form").serialize()
            ).then(()=>{
                location="register.html";
            })
        })

    var $btnLogin=$("div.register-btn");
        $btnLogin.click(function(eve){
            eve.preventDefault();
            location="register.html";
        })




})