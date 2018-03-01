(()=>{
    //动态加载
    $.get(`products/details?productId=${location.href.split("=")[1]}`).then(res=>{
        console.log(res);
        let currentId=location.href.split('=')[1];
        var html="";
        for(var val of res) {
            if (val.productId == currentId) {
                var current = val;
            }
        }
        //加载面包屑导航
        var html="";
        html+=`${current.carType}`;
        $("#fname").html(html);
        //加载小图片
        var html="";
        for(var i=0;i<current.images.length;i++){
            html+=`<li><img src="${current.images[i]}" data-md="${current.images[i]}" alt="">`;
        }
        $(".icon_list").html(html);
        $(".icon_list").on("mouseover","li",function(){
           $(this).css("border","1px solid #0AA1ED").siblings().css("border","1px solid transparent");
        })
        //加载放大镜
        var html="";
        html+=`<img src="${current.familyImage}" class="mImg" alt=""><div class="mask"></div>
            <div class="superMask"></div>`
        $(".bigMirror").html(html);

        //加载文字部分
        var html="";
        html+=`<p class="title">${current.productTitle}</p>
              <p class="code">${current.infoCode
            }</p>`
        $(".detailTitle").html(html);
        var html="";
        html+=`<p class="price">&yen;${current.price}</p>
              <p class="service">车辆已进行官方认证,享受以下服务 :
                  <a href="#">详情</a><img src="img/shopingDetails/gt.png" alt="">
              </p>
              <p class="serviceDetails">
                  <img src="img/shopingDetails/2017-12-20_133108.png" alt=""/><span>15天可退</span>
                  <img src="img/shopingDetails/2017-12-20_133108.png" alt=""/><span>首付20%</span>
                  <img src="img/shopingDetails/2017-12-20_133108.png" alt=""/><span>配件严格检测</span>
              </p>`;
        $(".detailPrice").html(html);
        //动态切换选择品系
        $(".selectClass").on("click","div a",function(e){
            e.preventDefault();
            var tar=$(e.target);
            $(".selectClass a").removeClass("hover");
            tar.addClass("hover").parent().children().siblings().removeClass("hover");
        });

        //动态加载车型图片
        var html="";
        html+=`<li class="no1"><img src="${current.detailsImages[0]}" alt=""></li>
               <li class="no2"><img src="${current.detailsImages[1]}" alt=""></li>
               <li class="no2"><img src="${current.detailsImages[2]}" alt=""></li>`;
        for(var i =3;i<current.detailsImages.length;i++){
            html+=`<li><img src="${current.detailsImages[i]}" alt=""></li>`
        }
        $(".imgList").html(html);


        //加载底部照片
        var html="";
        html+=`<img src="${current.detailsImg[0]}" alt=""><img src="${current.detailsImg[1]}" alt="">`;
        $(".img-list").html(html);



















        var lid=location.search.split("=")[1];
        //为icon_list绑定鼠标进入事件
        var icon_list=
                document.querySelector(".icon_list"),
            mImg=document.querySelector(".bigMirror>.mImg"),
            mask=document.querySelector(".mask"),
            smask=document.querySelector(".superMask"),
            lgDiv=document.querySelector(".largeDiv");

        //console.log(icon_list);
        icon_list.onmouseover=e=>{
            var tar=e.target;
            //console.log(tar);
            if(tar.nodeName=="IMG"){
                //更改mImg的src为tar的md属性
                mImg.src=tar.dataset.md;
                //console.log(mImg);
                lgDiv.style.background=
                    `url(${tar.dataset.md}) no-repeat`;
                lgDiv.style.backgroundSize="2600px 1462px";
            }
        };


        //为mImg绑定鼠标进入事件

        $(".largeDiv")[0].style.backgroundImage=`url(${$(".mImg").attr("src")})`;
        lgDiv.style.backgroundSize="2600px 1462px";
        lgDiv.style.backgroundRepeat="no-repeat";
        lgDiv.style.backgroundSize="auto";
        smask.onmouseover=e=>{
            lgDiv.style.backgroundSize="2600px 1300px";
            mask.style.display="block";
            lgDiv.style.display="block";

        };
        smask.onmouseout=e=>{
            mask.style.display="none";
            lgDiv.style.display="none";
        };
        var MSIZE=175,MAX=270;
        smask.onmousemove=e=>{
            var t=e.offsetY-MSIZE/2,l=e.offsetX-MSIZE/2;

            t=t<0?0:t>(MAX)?MAX:t;
            l=l<0?0:l>625?625:l;
            mask.style.cssText+=`top:${t}px; left:${l}px`;
            lgDiv.style.backgroundPosition=`-${l*27/9}px -${t*22.8/7}px`;
        }

    })

})();