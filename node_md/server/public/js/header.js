(()=>{
ajax({
    type:"get",
    url:"/html_template/header.html"
}).then(html=>{
    document.getElementById("header").innerHTML=html;
		$.get("users/isLogin").then(res=>{
			if(res.ok==1){
				$(".login-register").hide();
				$(".welcome>.uname").html(res.msg);
				$(".welcome").show();

			}else{
				$(".login-register").show();
				$(".welcome").hide();
			}
		})


		//登录注册
    let validateName=false;
    let validatePassword=false;
    let validatePasswordRepeat=false;
		$(".login-register>.login").click(function(){
			$(".model-box").removeClass("modal-display");
            $("[data-modal=register]").addClass("modal-display");
            $("[data-modal=login]").removeClass("modal-display");
		});
		$(".login-register>.register").click(function(){
			$(".model-box").removeClass("modal-display");
			$("[data-modal=login]").addClass("modal-display");
			$("[data-modal=register]").removeClass("modal-display");
		});
		$(".change_to_register").click(function(){
			$("[data-modal=login]").addClass("modal-display");
			$("[data-modal=register]").removeClass("modal-display");
		})
		$(".change_to_login").click(function(){
			$("[data-modal=register]").addClass("modal-display");
			$("[data-modal=login]").removeClass("modal-display");
		});
		$(".close").click(function(){
			$(".model-box").addClass("modal-display");
		});
		//增删改查登录界面
		function login(){
			$.post("/users/login",$(".login-form").serialize()).then(res=>{
			if(res.ok==0){
				$(".login-vali-tips").html(res.msg).css("color","#E11313")
			}else{
				$(".model-box").addClass("modal-display");
				$(".login-register").hide();
				$(".welcome>.uname").html(res.msg);
				$(".welcome").show();
			}
			})
		}

		$(".btnLogin").click(function(){
			$(this).css("background","#0168B7");
				login();

		});
		$(".login-userPassword").keyup(e=>{
			e.keyCode==13&&login();
		})

			// 注册部分
		$(".btnRegister").click(function(){
			if($(".register-userName").val()==""){
				$('.register_vali_tips').html('请输入正确的用户名和密码').css('color','#E11313');
				return;
			}
            var userName=$(".register-userName").val().trim().toLocaleLowerCase();
            var userPassword=$(".register-userPassword").val().trim().toLocaleLowerCase();
            if(validateName&&validatePassword&&validatePasswordRepeat){
            	$.post("/users/register",`userName=${userName}&userPassword=${userPassword}`).then(res=>{
            		$(".login-userName").val($(".register-userName").val());
            		$(".register-vali-tips").html(res.msg).css({"color":"green","font-size":16});
					$(".register-userName").val("");
					$(".register-userPassword").val("");
					$('.register-userPassword-repeat').val("");
				})

			}else{
                $('.register_vali_tips').html('请输入正确的用户名和密码').css('color','#E11313')
			}
        });

	//验证用户名
        $('.register-userName').blur(function(){
            let val=$(this).val().trim().toLocaleLowerCase()
            let reg=/^[a-zA-Z0-9.]{6,10}$/ig
            if(reg.test(val)){
                $.post('/users/validateName',`userName=${val}`)
                    .then(res=>{
                        if(res.ok==1){
                            $('.register-vali-tips').html(res.msg).css('color','green')
                            validateName=true
                        }else{
                            $('.register-vali-tips').html(res.msg).css('color','red')
                            validateName=false
                        }
                    })
            }else{
                $('.register-vali-tips').html('请输入格式正确的用户名').css('color','red')
                validateName=false
            }
        })
	//验证密码
    $('.register-userPassword').blur(function(){
        let val=$(this).val().trim()
        let reg=/^[a-zA-Z0-9]{6,8}$/ig
        if(reg.test(val)){
            $('.register-vali-tips').html('密码格式正确').css('color','green')
            validatePassword=true
        }else{
            $('.register-vali-tips').html('密码格式错误').css('color','#E11313')
            validatePassword=false
        }
    })
	//验证重复密码
    $('.register-userPassword-repeat').blur(function(){
        let val=$(this).val().trim()
        let _val=$('.register-userPassword').val().trim()
        if(val==_val){
            $('.register-vali-tips').html('两次密码输入一致').css('color','green')
            validatePasswordRepeat=true
        }else{
            $('.register-vali-tips').html('两次密码输入不一致').css('color','#E11313')
            validatePasswordRepeat=false
        }
    })

			$('.logout').click((e)=>{
			e.preventDefault();
			$.get('/users/logout')
				.then(res=>{
					location='/'
				})
		});

		//navHover
		//$(".header-container").on("click"," .box",function(e){console.log(1);
		//	//e.preventDefault()
		//	var tar=$(e.target);
		//	console.log(tar.parent().siblings().children());
		//	tar.parent().siblings().children().removeClass("navHover");
        //
		//	tar.parent().children(".box1").addClass("navHover");
		//	//tar.addClass("navHover");
		//})

			$.get("/products/carosel").then(res=>{
				var	html="";
				var navImg1=res[1].navImg1;
				var navImg2=res[1].navImg2;
				html+=`<li><a href="/list?kw=牵引车">牵引车</a></li>`;
				for(var i=0;i<4;i++){
					html+=`<li><a href="/details?productId=${parseInt(i*8+1)}">
							<span class="img_zc" style="background-image:url('${navImg1[i]}')"></span>
							<span class="img_zd" style="background-image:url('${navImg2[i]}')"></span>

						<h5><img src="img/icon_h5.png" alt=""/> H7牵引车</h5>
						<p><span>指导价：<strong>32.80万元</strong>起</span></p>
						</a><div class="dropDetail">
	 	<div>
	 		<h6>H7牵引车</h6>
	 		<p>指导价格 <span>32.80</span><span>万</span><span>元</span>起</p>
	 	</div>
	 	<div>
	 	<a href=""><img src="img/2018-01-14_204237.png" alt=""></a>
	 	<a href=""><img src="img/2018-01-14_204144.png" alt=""></a>
	 	<a href="">了解详情 > ></a>
	 	</div>
	 	<div style="background-image:url('${navImg2[i]}')"></div>
	 </div>
					</li>`
				}
				$(".navImage1").html(html);
				//二楼
				var  html="";
				html+=`<li><a href="/list?kw=载货车">载货车</a></li>`
				for(var i=4;i<8;i++){
					html+=`<li><a href="#">
							<span class="img_zc" style="background-image:url('${navImg1[i]}')"></span>
							<span class="img_zd" style="background-image:url('${navImg2[i]}')"></span>

						<h5><img src="img/icon_h5.png" alt=""/> 载货车</h5>
						<p><span>指导价：<strong>32.80万元</strong>起</span></p>
						</a><div class="dropDetail">
	 	<div>
	 		<h6>载货车</h6>
	 		<p>指导价格 <span>32.80</span><span>万</span><span>元</span>起</p>
	 	</div>
	 	<div>
	 	<a href=""><img src="img/2018-01-14_204237.png" alt=""></a>
	 	<a href=""><img src="img/2018-01-14_204144.png" alt=""></a>
	 	<a href="">了解详情 > ></a>
	 	</div>
	 	<div style="background-image:url('${navImg2[i]}')"></div>
	 </div>
					</li>`
				}
				$(".navImage2").html(html);
				//三楼
				var html="";
				html+=`<li><a href="/list?kw=工程车">工程车</a></li>`;
				for(var i=8;i<12;i++){
					html+=`<li><a href="#">
							<span class="img_zc" style="background-image:url('${navImg1[i]}')"></span>
							<span class="img_zd" style="background-image:url('${navImg2[i]}')"></span>

						<h5><img src="img/icon_h5.png" alt=""/> 工程车</h5>
						<p><span>指导价：<strong>32.80万元</strong>起</span></p>
						</a>
					</li>`
				}
				$(".navImage3").html(html);

			//四楼
				var html="";
				html+=`<li><a href="/list?kw=专用车">专用车</a></li>`;
				for(var i=12;i<13;i++){
					html+=`<li><a href="#">
							<span class="img_zc" style="background-image:url('${navImg1[i]}')"></span>
							<span class="img_zd" style="background-image:url('${navImg2[i]}')"></span>

						<h5><img src="img/icon_h5.png" alt=""/> H7牵引车</h5>
						<p><span>指导价：<strong>32.80万元</strong>起</span></p>
						</a>
					</li>`
				}
				$(".navImage4").html(html);



			})
			//搜索帮助
	$(".search").hover(function(){
        $(".search img").attr("src","img/2018-01-10_225111.png")
	},function(){$(".search img").attr("src","img/1111.png");})

		var arr=["牵引车","载货车","工程车","专用车"];
			var i=0;
			setInterval(function(){
				i++
					if(i>3){
						i=0;
					}
				$("[data-input=help]").attr("placeholder",`${arr[i]}`);
			},5000)
	$('.search').on('keyup','[data-input=help]',function(e){
		let val=$(this).val().trim()
		if(val.length>0){
			$('.search-help').show()
			$.get('users/search',{kw:val}).then(res=>{
				let html=''
				for(let i=0;i<res.length&&i<5;i++){
					html+=`<li>${res[i].kw}</li>`
				}
				$('.search-help').html(html)
			})
		}else{
			$('.search-help').html('')
		}
		if(e.keyCode=='13'&&val.length>0){
			location=`/list?kw=${val}`
		}
		if(e.keyCode=='13'&&val.length==0){
			val=$(this).attr('placeholder')
			location=`/list?kw=${val}`
		}

	})
	$(".btn-search").click(function(){
		if($("[data-input=help]").val().length>0){
			location=`/list?kw=${$("[data-input=help]").val()}`
		}
		if($("[data-input=help]").val().length==0){
			var val=$("[data-input=help]").attr('placeholder')
			location=`/list?kw=${val}`
		}
	})
	$(".search").on("click",".search-help>li",function(e){
		e.preventDefault();
		var tar=$(e.target);
		var html=tar.html();
		$("[data-input=help]").val(html);
		tar.parent().hide();
	})
	//var width=innerWidth;
	var height=innerHeight;
	$(".model-box").css({"height":height,"position":"fixed"});




})		
})();











