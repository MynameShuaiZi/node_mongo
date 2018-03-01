/**
 * Created by web-01 on 2017/12/23.
 */
$(()=>{
    $(".findPage ul").on("click","li a",function(e){
        e.preventDefault();
       $(".findPage li>a").removeClass("hover");
        $(this).addClass("hover");
    })
    let pageNumber=1,pageSize=8,pageCount=null,kw=decodeURI(location.href.split('=')[1]),queryString=`?kw=${kw}&pageSize=${pageSize}&pageNumber=${pageNumber}&`;
    //console.log(kw);
    function getList(queryString){
        console.log(queryString);
        $.get(`/products/list${queryString}`).then(res=>{
            console.log(res);
            let html="";
            pageCount=res[res.length-1].pageCount;
            for(var i=0;i<res.length-1 && i<pageSize;i++){
                let data=res[i];
                var h2="";
                h2+=`${data.carType}`
                html+=`<div><a href="details?productId=${data.productId}">
                <img src="${data.familyImage}" alt=""/>
					<p>${data.productTitle}</p>
					<p>车型指导价<span>¥${data.price}</span></p>
					</a></div>`
            }
            $(".ListTag>h2").html(h2);
            $(".tagFlex").html(html);

            //page
            html ="";
            html += `<a class="prev ${pageNumber-1>0?'':'disabled'}" href="javascript:"><<上一页</a>
				<a data-role="page" data-page-value="${pageNumber-2}" class="${(pageNumber-2)>0 ? '' :'hide'}" href="#">${pageNumber-2}</a>
				<a data-role="page" data-page-value="${pageNumber-1}" class="${(pageNumber-1)>0 ? '' :'hide'}" href="#">${pageNumber-1}</a>
				<a class="current-page" href="javascript:">${pageNumber}</a>
				<a data-role="page"  data-page-value="${pageNumber+1}" class="${(pageNumber+1)>pageCount ? 'hide' :''}" href="javascript:">${pageNumber+1}</a>
				<a data-role="page"  data-page-value="${pageNumber+2}" class="${(pageNumber+2)>pageCount ? 'hide' :''}" href="javascript:">${pageNumber+2}</a>
				<a class="next ${(pageNumber+1)<=pageCount?'':'disabled'}" href="javascript:">下一页>></a>`
            $('.page-container').html(html);
        })
    }
    getList(queryString);

    function deleteKeyWord(str){
        let start=queryString.indexOf(str)
        let end=queryString.indexOf('&',start)
        if(start>-1){
            let arr=queryString.split('')
            arr.splice(start,end-start+1)
            queryString=arr.join('')
        }
    }



    //page
    $('.page-container').on('click','[data-role=page]',function (e) {
        e.preventDefault()
        pageNumber=$(this).data('pageValue')
        deleteKeyWord('pageNumber')
        queryString+=`pageNumber=${pageNumber}&`
        getList(queryString)
    })

    $('.page-container').on('click','.prev',function (e) {
        e.preventDefault()
        if(pageNumber>1){
            pageNumber--
            deleteKeyWord('pageNumber')
            queryString+=`pageNumber=${pageNumber}&`
            getList(queryString)
        }

    })

    $('.page-container').on('click','.next',function (e) {
        e.preventDefault()
        if(pageNumber<pageCount){
            pageNumber++
            deleteKeyWord('pageNumber')
            queryString+=`pageNumber=${pageNumber}&`
            getList(queryString)
        }
    })
    //deleteKeyWord('kw');
        //分类检索
    if(kw!=""){
        $('[data-select=carType]').children(":not(span)").hide();
    }
    //选择品系
    $('[data-select=carType]').on('click', 'a', e=> {
        e.preventDefault();
        let $tar = $(e.target)
        kw +=" "+$tar.html();
        $tar.siblings(":not(span)").hide();
        $tar.hide();
        //queryString=`?pageNumber=${pageNumber}&pageSize=${pageSize}&`
        //queryString += `kw=${kw}`
        queryString=`?kw=${kw}&pageSize=${pageSize}&pageNumber=${pageNumber}&`;
        deleteKeyWord('pageNumber')
        pageNumber=1
        queryString+=`pageNumber=1&`
        getList(queryString);

        //$('[data-select=show-all]').children('img').show()
        $('.productReadyUl>li:nth-child(1)').html(`<span>选择品系:</span><span>${kw}</span><a href="#">×</a>`).show();
    })
    //驾驶室
    $('[data-select=imperialroom]').on('click', 'a', e=> {
        e.preventDefault();
        let $tar = $(e.target)
        kw +=" "+$tar.html()
        $tar.siblings(":not(span)").hide();
        $tar.hide();
        queryString=`?kw=${kw}&pageSize=${pageSize}&pageNumber=${pageNumber}&`;
        //queryString=`?pageNumber=${pageNumber}&pageSize=${pageSize}&`
        //queryString += `${kw}`
        deleteKeyWord('pageNumber')
        pageNumber=1
        queryString+=`pageNumber=1&`
        getList(queryString);

        //$('[data-select=show-all]').children('img').show()
        $('.productReadyUl>li:nth-child(2)').html(`<span>驾驶室:</span><span>${kw}</span><a href="#">×</a>`).show();
    })


    //排放标准
    $('[data-select=emiStandard]').on('click', 'a', e=> {
        e.preventDefault();
        let $tar = $(e.target)
        kw +=" "+$tar.html()
        $tar.siblings(":not(span)").hide();
        $tar.hide();
        queryString=`?kw=${kw}&pageSize=${pageSize}&pageNumber=${pageNumber}&`;
        //queryString=`?pageNumber=${pageNumber}&pageSize=${pageSize}&`
        //queryString += `${kw}`
        deleteKeyWord('pageNumber')
        pageNumber=1
        queryString+=`pageNumber=1&`
        getList(queryString);

        //$('[data-select=show-all]').children('img').show()
        $('.productReadyUl>li:nth-child(3)').html(`<span>排放标准:</span><span>${kw}</span><a href="#">×</a>`).show();
    })
    //发动机、马力段
    $('[data-select=engine]').on('click', 'a', e=> {
        e.preventDefault();
        let $tar = $(e.target)
        kw +=" "+$tar.html()
        $tar.siblings(":not(span)").hide();
        $tar.hide();
        //queryString=`?pageNumber=${pageNumber}&pageSize=${pageSize}&`
        queryString=`?kw=${kw}&pageSize=${pageSize}&pageNumber=${pageNumber}&`;
        //queryString += `${kw}`
        deleteKeyWord('pageNumber')
        pageNumber=1
        queryString+=`pageNumber=1&`
        getList(queryString);

        //$('[data-select=show-all]').children('img').show()
        $('.productReadyUl>li:nth-child(4)').html(`<span>发动机:</span><span>${kw}</span><a href="#">×</a>`).show();
    })
    //驱动形式
    $('[data-select=driving]').on('click', 'a', e=> {
        e.preventDefault();
        let $tar = $(e.target)
        kw +=" "+$tar.html()
        $tar.siblings(":not(span)").hide();
        $tar.hide();
        //queryString=`?pageNumber=${pageNumber}&pageSize=${pageSize}&`
        queryString=`?kw=${kw}&pageSize=${pageSize}&pageNumber=${pageNumber}&`;
        //queryString +=  `${kw}`
        deleteKeyWord('pageNumber')
        pageNumber=1
        queryString+=`pageNumber=1&`
        getList(queryString);

        //$('[data-select=show-all]').children('img').show()
        $('.productReadyUl>li:nth-child(5)').html(`<span>发动机:</span><span>${kw}</span><a href="#">×</a>`).show();
    })


//绑定删除事件
    $(".productReadyUl").on("click","a",function(e){
        e.preventDefault();
        var $tar=$(e.target);
        $tar.parent().remove();
        location=location.href;
    })
});