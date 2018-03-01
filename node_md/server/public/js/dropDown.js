if(typeof jQuery!=="function"){
    throw new Error("dong_ui库依赖于jQuery,必须先引入jquery.js")
}else{
    /******dropDown****************/
    $(()=>{
        $("[data-toggle=dropdown]").parent()
    .hover(//mouseover or mouseenter
      function(){//this->div
        $(this).children(".dropdown-menu").css({
          height:152, border:"1px solid #000"
        });
      },
      function(){
        $(this).children(".dropdown-menu").css({
          height:0,border:""
        });
      }
    )
    })
}

