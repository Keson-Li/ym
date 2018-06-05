$(document).ready(function(){
    var title = document.getElementById("controlTitle");
        document.getElementById("controlContent").innerHTML='';
    $.ajax({
        url:"/checkAllProduct",
        type:"get",
        success:function(resp){
            if(resp.status == "success"){
                var products = resp.products;
                if(products.length > 0){
                    for(var i = 0; i < products.length; i++ ){
                        title.innerHTML = '<h1>设定推广类别：</h1>';
                        var oneProduct          = document.createElement('div');
                            proDetail           = document.createElement('p');
                            t                   = document.createTextNode('产品-' + products[i].id + ' : ' + products[i].name + '  ');
                            // setBut              = document.createElement('button');
                        oneProduct.className = 'singleProduct';
                        // setBut.innerHTML        = '指定推广';
                        oneProduct.productID = products[i].id;
                        oneProduct.addEventListener('click', function(){
                            modifyProduct(this.productID);
                        });
                        // proDetail.innerHTML    = '产品-' + products[i].id + ' : ' + products[i].name + '  ';
                        proDetail.appendChild(t);
                        oneProduct.appendChild(proDetail);
                        document.getElementById("controlContent").appendChild(oneProduct);
                    }
                }          
            }else {
                alert("数据库查询产品失败或没有产品");
            }
        }
    });
})
    
function modifyProduct(productID){
    console.log(productID);
}