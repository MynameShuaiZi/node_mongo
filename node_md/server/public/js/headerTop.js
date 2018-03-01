/**
 * Created by web-01 on 2017/12/16.
 */
$(()=>{
    window.onscroll=function(){
        var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
        var headerTop=document.getElementById("header-top");
        if(scrollTop>=30)
            headerTop.className="fixed main";
        else
            headerTop.className="main";
    }
})