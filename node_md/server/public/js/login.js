var form=document.forms[0];
form.uname.onfocus=getFocus;
form.upwd.onfocus=getFocus;
function getFocus(){
	this.className="txt_focus";
	var div=this.nextElementSibling;
	div.className="";
}
form.uname.onblur=function(){
	vali(this,/^\w{1,10}$/);
}
function vali(txt,reg){
	txt.className="";
	var div=txt.nextElementSibling;
	if(reg.test(txt.value)){
		div.className="vali_success";
		return true;
	}else{
		div.className="vali_fail";
		return false;
	}
}
form.upwd.onblur=function(){
	vali(this,/^\d{6}$/);
}

form.querySelector("[type=button]").onclick=()=>{
	if(!vali(form.uname,/^\w{1,10}$/))
		form.uname.focus();
	else if(!vali(form.pwd,/^\d{6}$/))
		form.upwd.focus();
	else
		form.submit();
}

(()=>{
		$(".btn-login").click(function(){
			$.post("/users/login",$('.login-form').serialize()).then(res=>{
				console.log(res);
				console.log(res.msg);
				//if(res.ok==0){
				//	$(".login-tip").html(res.msg).css('color','red');
				//}else{
				//	location="/index";
				//}
			})
		})
		var btnRegister=document.querySelector("div.register-btn");
    btnRegister.onclick=e=>{
    	e.preventDefault();
    	location="register_login.html";
	}
})()