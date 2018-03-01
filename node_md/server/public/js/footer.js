ajax({
    type:"get",
    url:"html_template/footer.html"
}).then(html=>{
    document.getElementById("footer-1").innerHTML=html;
});