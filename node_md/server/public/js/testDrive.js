$(()=>{
var provice=["北京","上海","云南","内蒙古","吉林","四川"];
var cities=["市辖区","市辖区","昆明","包头","长春","南充"];
    var buyer=["北京华夏双龙汽车贸易有限公司","上海泓兆投资发展有限公司","云南百灵汽车销售有限公司","包头市林杰重工有限公司","吉林省东风乘龙汽车销售服务有限公司","南充捷顺车业有限公司"];
     $("#province").change(function(){

         var i=this.selectedIndex-1;

         if(i>=0){
             var cts=cities[i];
             var buys=buyer[i];
                var html="";
             html+= `<option value="" selected>请选择城市</option>`
             html+=`<option value="${cts}">${cts}</option>`
             $("#city").html(html);
             var html="";
             html+= `<option value="" selected>请选择城市</option>`
             html+=`<option value="${buys}">${buys}</option>`
             $("#buyer").html(html);
         }
     })
         //$("#city").change(function(){
         //
         //    var i=$().selectedIndex-1;
         //    if(i>=0){
         //        console.log(i);
         //        var buys=buyer[i];
         //        var html="";
         //        html+= `<option value="" selected>请选择城市</option>`
         //        html+=`<option value="${buys}">${buys}</option>`
         //        $("#buyer").html(html);
         //    }
         //});
    $("#buyer").change(function(){
        $(".address").show();
        if($("#province").val()!=""&&$("#city").val()!=""&&$("#buyer").val()!=""){

            if($("#buyer").val()=="北京华夏双龙汽车贸易有限公司"){
                var html="";
                html+=`<h3>北京华夏双龙汽车贸易有限公司</h3>
                <p>北京汽车海淀区万寿路公路169号</p>
                <p class="tel">18818818880</p>`
                $(".address").html(html);

            }
            if($("#buyer").val()=="上海泓兆投资发展有限公司"){
                var html="";
                html+=`<h3>上海泓兆投资发展有限公司</h3>
                <p>上海海淀区万寿路公路169号</p>
                <p class="tel">18818818880</p>`
                $(".address").html(html);
            }
            if($("#buyer").val()=="云南百灵汽车销售有限公司"){
                var html="";
                html+=`<h3>云南百灵汽车销售有限公司</h3>
                <p>云南百灵万寿路公路169号</p>
                <p class="tel">18818818880</p>`
                $(".address").html(html);
            }
            if($("#buyer").val()=="包头市林杰重工有限公司"){
                var html="";
                html+=`<h3>包头市林杰重工有限公司</h3>
                <p>包头市林杰万寿路公路169号</p>
                <p class="tel">18818818880</p>`
                $(".address").html(html);
            }
            if($("#buyer").val()=="吉林省东风乘龙汽车销售服务有限公司"){
                var html="";
                html+=`<h3>吉林省东风乘龙汽车销售服务有限公司</h3>
                <p>包头市林杰万寿路公路169号</p>
                <p class="tel">18818818880</p>`
                $(".address").html(html);
            }

            if($("#buyer").val()=="吉林省东风乘龙汽车销售服务有限公司"){
                var html="";
                html+=`<h3>南充捷顺车业有限公司</h3>
                <p>南充捷顺万寿路公路169号</p>
                <p class="tel">18818818880</p>`
                $(".address").html(html);
            }

        }

    });

     //提交 插入数据库
    $("#btnSubmit").click(function(){

        $.post("/products/testUser",$(".FormDrive").serialize()).then(res=>{
            if(res.ok==1){
                alert(res.msg);
                location=location.href;
            }
        })
    })



        //var city=$("#province").val();
        // console.log(city);
        // var html="";
        // html+=`<option value="" selected>请选择城市</option>`;
        // html+=`<option value="${city}" selected>${city}</option>`
        // //console.log(html);
        // $("#city").html(html);
        // var buyer=$("#city").val();
        // console.log(buyer);
        // var html="";
        // html+=`<option value="" selected>请选择经销商</option>`;






    $.get("users/isLogin").then(res=>{
        if(res.ok==0){
            alert("请车主登录");
            return;
        }else{
            $("#name").val(res.msg);
        }
    })

        $('form').on("change","select",function(e){
            var carType=$('#type').val();
            var drive=$('#drive').val();
            var emiStandard=$('#emiStandard').val();

  if(carType&&drive&&emiStandard){
      $.get("products/testDrive",
                 {carType:carType,drive:drive,emiStandard:emiStandard}
                 ).then(res=>{
                     var html="";
                     html+=`<option value="" selected>选择驾驶室</option>`;
                 for(var i of res){
                     html+=`<option value="${i.imperialroom}" selected>${i.imperialroom}</option>`;
                 }
                 $('#imperialroom').html(html);

             })
         }
        })









})