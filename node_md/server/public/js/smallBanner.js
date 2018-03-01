$(()=>{
  var i=1,canShake=true;
  function shake(imgS){
   // console.log(imgS)
    if(canShake==true){
      canShake=false;
      if(i==5) i=1;
      else i++;

      var arr=[0,1,2,3,4,5,6,7];
      arr.sort((a,b)=>Math.random()<0.5?1:-1);
      arr.sort((a,b)=>Math.random()<0.5?1:-1);
      arr.sort((a,b)=>Math.random()<0.5?1:-1);
      //console.log(arr);
      var j=0;

     setInterval(()=>{
        $(`#box>div:eq(${arr[j++]})`).css(
          "backgroundImage",
          `url(img/coolCarImg/${i}.jpg)`
        ).addClass("shake");
      },50);

      $(".container-list a").removeClass("hover");
      $(".container-top").children(`:eq(${i-1})`).children().first().addClass("hover");

      setTimeout(()=>{
        $("#box>div").removeClass("shake");
        $("#box>img")
          .attr("src",`img/coolCarImg/${i}.jpg`);
        canShake=true;
      },1000);
    }
  }
  /*
    v1 切换图片 bug
   */
  /*$(".container-top").on("mouseover",".container-list",function(){
    var $list=$(this);
    var g=$list.index();
    i=g+1;
   // $("#box>div").css("backgroundImage",`url(img/coolCarImg/${i}.jpg)`).removeClass("shake");
    clearInterval(timer);
    timer=null;
    $(".container-list a").removeClass("hover");
    $(".container-top").children(`:eq(${i-1})`).children().first().addClass("hover");
    $("#box>div").css("backgroundImage",`url(img/coolCarImg/${i}.jpg)`).addClass("shake");
    $("#box>img").attr("src",`img/coolCarImg/${i}.jpg`);
  })*/
  /*
    v3 切换 shake传入的img参数

  $(".container-top").on("mouseover",".container-list",function(){
    clearInterval(timer);
    timer=null;
    var $list=$(this);
    var g=$list.index();
    i=g+1;
    var imgShake=`url(img/coolCarImg/${i}.jpg)`;
    shake(imgShake);
    //$("#box>div").css("backgroundImage",`url(img/coolCarImg/${i}.jpg)`)
        //.removeClass("shake");
  })
  */
  /*
   v2
  */
  $(".container-top").on("mouseover",".container-list",function(){
    var $list=$(this);
    var g=$list.index();
    i=g+1;
    $("#box>div").css("backgroundImage",`url(img/coolCarImg/${i}.jpg)`).removeClass("shake");
  })
  var timer=setInterval(shake,3000);
  $(".banner").hover(function(){
    clearInterval(timer);
    timer=null;
  },function(){
    timer=setInterval(shake,3000);
  })

});
