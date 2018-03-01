(()=>{
	function loadCart(){
	ajax({
		type:"get",
		url:"shopping_cart/get_shoppingCart",
		dataType:"json"
	}).then(data=>{
		//传入数据库中的数据
		html="",total=0;
		for(var p of data){
			html+=`<tr>
								<td><img src="${p.href}"/> <input type="checkbox" ${p.is_checked=="1"?"checked":""}/></td>
                <td>${p.title}</td>
                <td>¥${parseFloat(p.price).toFixed(2)}</td>
								<td>
									<button>-</button>
									<span>${p.count}</span>
									<button>+</button>
									<input type="hidden" value="${p.iid}"/>
								</td>
                <td>¥${(p.price*p.count).toFixed(2)}</td>
								<td><button>删除</button></td>
								
            </tr>`;
								total+=p.price*p.count;
		}
		var table=document.getElementById("data");
		table.querySelector("tbody").innerHTML=html;
		table.querySelector("tfoot td:nth-child(2)").innerHTML="¥"+total.toFixed(2);
		
		//数量button的增减
		var btns=table.querySelectorAll("tbody td:nth-child(4) button");
		
			for(var i=0;i<btns.length;i++){
				btns[i].onclick=function(){
					
					var span=this.parentNode.children[1];
					var n=parseInt(span.innerHTML);
					this.innerHTML=="+"?n++:n--;
					var iid=this.parentNode.children[3].value;
					ajax({
						type:"post",
						url:"/shopping_cart/updateCart",
						data:`iid=${iid}&count=${n}`
					}).then(loadCart);
				}
			}
		//绑定复选框事件.
		var chbAll=table.querySelector("thead th:first-child>input");
		chbAll.checked=table.querySelector("tbody input[type=checkbox]:not(:checked)")==null?true:false;
		
		chbAll.onclick=e=>{
			
			var checked=chbAll.checked;
			ajax({
				type:"post",
				url:"/shopping_cart/checkCart",
				data:`chkAll=${checked}`
			}).then(loadCart);
		}

    var chbs=table.querySelectorAll("tbody td:first-child>input");
		for(var chb of chbs){
			chb.onclick=e=>{
				
				var chb=e.target;
				var iid=chb.parentNode.parentNode.children[3].children[3].value;
				ajax({
					type:"get",
					url:"/shopping_cart/checkCart",
					data:`iid=${iid}&chk=${chb.checked}`
				}).then(loadCart);
			}
		}
		//批量删除
	
			
		var chbs=table.querySelectorAll("table>tbody input[checked]");
		var butt=document.getElementById("btnDelete");
			butt.onclick=e=>{
				for(var tt of chbs){
			var iid=tt.parentNode.parentNode.children[3].children[3].value;
					ajax({
						type:"post",
						url:"/shopping_cart/deleteCart",
						data:`iid=${iid}`
					}).then(loadCart)
				}
		  }
		
		var chb=table.querySelector("table>tbody input[checked]");
		var btns=table.querySelectorAll("table>tbody td:last-child>button");
			
				
			for(var btn of btns){
				btn.onclick=e=>{
				var btn=e.target;
				var iid=chb.parentNode.parentNode.children[3].children[3].value;
			ajax({
				type:"post",
				url:"/shopping_cart/deleteCart",
				data:`iiid=${iid}`
			}).then(loadCart)
			}
			}
		
		
	});
 }loadCart();
})()