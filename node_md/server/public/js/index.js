$(()=>{
/***********    滚动列表    ********/
	var $lift=$("#lift");
	//为window绑定滚动事件
	$(window).scroll(()=>{
		var $scrollTop=$("body,html").scrollTop();
		var $f1=$("#floor-1");
		var offsetTop=$f1.offset().top;
		if(offsetTop<$scrollTop+innerHeight/2)
			$lift.fadeIn(500);
		else
			$lift.fadeOut(500);
		var $floors=$(".floor");
		$floors.each((i,elem)=>{
		var	$f=$(elem);
		if($f.offset().top<$scrollTop+innerHeight/2)
			$lift.find(".lift_item:eq("+i+")").addClass("hover").siblings().removeClass("hover");
		})
	})
	//为$lift下的ul绑定单击事件，只允许li访问
		$lift.children("ul").on("click","li",function(){
			var $li=$(this);
			var i=$li.index();
			var $fi=$(".floor:eq("+i+")");
			var offsetTop=$fi.offset().top;
			$("html").animate({
				scrollTop:offsetTop-180
			},500)
		})
		//<a href="/details?productId=${data[0].banner[i].bnrId}">
/***********	滚动轮播    *******/
	const LIWIDTH=1583;
		$.ajax({
			type:"GET",
			url:"/products/carosel"
		}).then(data=>{
			//console.log(data[0].banner);
		var html="";
		for(var i=0;i<data[0].banner.length;i++){
			//console.log(data[0].banner[i]);
			html+=`<li><img src="${data[0].banner[i].img}"></li>`;
		}
			//console.log(html);
		html+=`<li><img src="${data[0].banner[0].img}"></li>`;
		var $ul=$("#banner-ul");
		$ul.html(html).css("width",LIWIDTH*(data[0].banner.length+1));
		var $ids=$(".indicators");
		$ids.html("<li></li>".repeat(data[0].banner.length)).children().first().addClass("hover");

		const WAIT=3000,DURA=1000;
		var moved=0,timer=null;
		function move(dir=1){
			moved+=dir;
			$ul.animate({
				left:-LIWIDTH*moved
			},DURA,()=>{
					if(moved==data[0].banner.length){
						$ul.css("left",0);
						moved=0;
					}
					$ids.children(":eq("+moved+")").addClass("hover").siblings().removeClass("hover")
				})
		}
				var timer=setInterval(move,WAIT);

			$("#banner").hover(
				()=>{
				clearInterval(timer);
				timer=null;
			},
				()=>{
				timer=setInterval(move,WAIT);
			}
			);
			$("[data-move=right]").click(()=>{
				if(!$ul.is(":animated")){
					  move();
					}
			});
			$("[data-move=left]").click(()=>{
				if(!$ul.is(":animated")){
					if(moved==0){
					$ul.css("left",-LIWIDTH*data[0].banner.length);
					moved=data[0].banner.length;
					}
					move(-1);
				}
			})
		$ids.on("mouseover","li",function(){
			var $li=$(this);
			var i=$li.index();
			moved=i;
			$ul.stop(true).animate({
				left:-LIWIDTH*moved
			},DURA,()=>{
				$ids.children(":eq("+i+")").addClass("hover").siblings().removeClass("hover");
			})
		});
			//Floor1的动态插入

			//console.log(data[0].floorImg1);
			var html="";
			html+=`<img src="img/hotcar.jpg" alt="" class="imgpos">`;
			for(var i=0;i<data[0].floorImg1.length;i++){
				//console.log(data[0].banner[i]);
				html+=`<a href="/list?kw=${data[0].floorImg1[i].carType}"><img src="${data[0].floorImg1[i].img}" class="imgPosition-${i+1}"></a>`;
			}
			var $floor1=$("#floor-1");
			$floor1.html(html);
			//Floor2的动态插入
			//var html="";
			//html+=`<img src="img/hotcar.jpg" alt="" class="imgpos">`;
			//for(var i=0;i<data[0].floorImg1.length;i++){
			//	//console.log(data[0].banner[i]);
			//	html+=`<img src="${data[0].floorImg1[i].img}" class="imgPosition-${i+1}">`;
			//}
			//var $floor1=$("#floor-1");
			//$floor1.html(html);



	})
				//贷款方案与现金的切换
			$(".text>.pay").on("click","li",function(e){
				e.preventDefault();

			var $tar=$(e.target);

				//$price.children().first().html("王帅");
				//$tar.css("color","white").parent().css("background","#2C2C2C");
				$tar.parent().removeClass("hover").siblings().addClass("hover");
				$tar.removeClass("color2").addClass("color1").parent().siblings().children().removeClass("color1").addClass("color2");
				var $price=$(".price");
				var $p1=$("#d1");
                var $p3=$("#d3");
                var $p4=$("#d4");
                var $p2=$("#d2");
                var $p5=$(".prepay>p");
				if($tar.html()=="贷款方案"){
					$price.children().first().html("￥8,229/月");
				$p3.html("￥9,329/月").css({"font-size":30,"color":"#fff"});
				 $p4.html("1年|3年|5年")
					$p2.html("15%|30%|40%")
					$p5.html("预计交付时间：3月")
				}else{
                    $p1.css("bottom","1px solid #464646");
                    $p3.html("大扭矩+直接档+小速比").css({"font-size":23,"color":"red"});
                    $p4.html("动力传输系统匹配优化，实现体系节油，燃烧雾化更好，更充分")
					$p2.html("估计5年能够节省的燃油费")
                    $p5.html("预计交付时间： 2月下旬")
					$price.children().first().html("￥ 320000~1200000");
				}
			})

		});
