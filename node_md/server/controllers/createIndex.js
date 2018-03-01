require("../config/mongoose")
var mongoose=require("mongoose");
var Index=mongoose.model("Index");
var index=new Index({
    "banner":[
        {bnrId:1,img:"/img/14823879805808.jpg"},
        {bnrId:2,img:"/img/14823880578080.jpg"},
        {bnrId:3,img:"/img/15010388391452.jpg"},
        {bnrId:4,img:"/img/404.jpg"}
    ],
    "floorImg1":[
        {fr:1,img:"/img/hotcar_t7.png"},
        {fr:2,img:"/img/hotcar_h7.png"},
        {fr:3,img:"/img/hotcar_m3.png"}
    ],
    "floorImg2":[
        {fr:1,img:"/img/productList/14743530557135.jpg"},
        {fr:2,img:"/img/productList/14743555095008.jpg"},
        {fr:3,img:"/img/productList/14743528638748.jpg"},
        {fr:4,img:"/img/productList/14743528638748.jpg"},
        {fr:5,img:"/img/productList/14743560673017.jpg"}
    ],
    "floorImg3":[
        {fr:1,img:"/img/15054600336513.png"},
        {fr:2,img:"/img/15054599066545.png"},
        {fr:3,img:"/img/15021802704543.jpg"},
        {fr:4,img:"/img/15005400548288.png"}
    ]
});

index.save()
	.then(res=>{
	console.log(res)
})
	.catch(err=>{
	console.log(err)
});
