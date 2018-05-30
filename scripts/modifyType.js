$(document).ready(function(){
    // var title = document.getElementById("controlTitle");
    // contemt = document.getElementById("controlContent");
    // $.ajax({
    //     url:"/checkAllProduct",
    //     type:"get",
    //     success:function(resp){
    //         if(resp.status == "success"){
    //             var products = resp.products;
    //             if(products.length > 0){
    //                 for(var i = 0; i < products.length; i++ ){
    //                     title.innerHTML = '<h1>修改产品分类：</h1>';
    //                     var oneProduct          = document.createElement('div');
    //                         setBut              = document.createElement('button');
    //                     setBut.innerHTML        = '指定推广';
    //                     setBut.productID = products[i].id;
    //                     setBut.addEventListener('click', function(){
    //                         setCatagory(this.productID);
    //                     });
    //                     oneProduct.innerHTML    = '分类-'+ (products[i].cata +'    ').substring(0,8)+'-产品-' + products[i].id + ' : ' + products[i].name + '  ';
    //                     oneProduct.appendChild(setBut);

    //                     document.getElementById("controlContent").appendChild(oneProduct);
    //                 }
    //             }          
    //         }else {
    //             alert("数据库查询产品失败或没有产品");
    //         }
    //     }
    // });
    

    document.getElementById('productCatagory').addEventListener('click', function(){
        listProductWithCatagory();
    })
    

    document.getElementById('catagoryControl').addEventListener('click', function(){
        prepareCatagory();
    });

    document.getElementById('promoteCatagory').addEventListener('click', function(){
        preparePromote();
    });

})

function preparePromote(){
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
                            setPromote(this.productID);
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

}

function listProductWithCatagory(){
    var title = document.getElementById("controlTitle");
    document.getElementById("controlContent").innerHTML='';
    $.ajax({
        url:"/checkProductsWithCatagory",
        type:"get",
        success:function(resp){
            if(resp.status == "success"){
                var products = resp.products;
                if(products.length > 0){
                    for(var i = 0; i < products.length; i++ ){
                        title.innerHTML = '<h1>修改产品分类：</h1>';
                        var oneProduct          = document.createElement('div');
                            setBut              = document.createElement('button');
                        setBut.innerHTML        = '指定分类';
                        setBut.productID = products[i].id;
                        setBut.addEventListener('click', function(){
                            setCatagory(this.productID);
                        });
                        oneProduct.innerHTML    = '分类-'+ (products[i].cata +'    ').substring(0,8)+'-产品-' + products[i].id + ' : ' + products[i].name + '  ';
                        oneProduct.appendChild(setBut);

                        document.getElementById("controlContent").appendChild(oneProduct);
                    }
                }          
            }else {
                alert("数据库查询产品失败或没有产品");
            }
        }
    });
}

function prepareCatagory(){
    var title = document.getElementById("controlTitle");

    title.innerHTML = '<h1>分类管理（添加/删除/修改）</h1>';
    var addBut              = document.createElement('button');
    addBut.innerHTML = '添加分类';
    addBut.id = 'addCatagory';
    addBut.addEventListener('click', function(){
        addCatagory();
    })
    document.getElementById("controlContent").innerHTML='';
    document.getElementById("controlContent").appendChild(addBut);



    $.ajax({
        url:"/checkAllCatagories",
        type:"get",
        success:function(resp){
            if(resp.status == "success"){
                var catagories = resp.catagories;
                if(catagories.length > 0){
                    for(var i = 0; i < catagories.length; i++ ){
                        var oneCatagory         = document.createElement('div');
                        var delBut              = document.createElement('button');
                        var modBut              = document.createElement('button');
                        delBut.innerHTML        = '删除';
                        delBut.catagoryID = catagories[i].id;
                        modBut.innerHTML        = '修改';
                        modBut.catagoryID = catagories[i].id;
                        delBut.addEventListener('click', function(){
                            deleteCatagory(this.catagoryID);//---------need to write
                        });
                        modBut.addEventListener('click', function(){
                            modifyCatagory(this.catagoryID);//---------need to write
                        });
                        oneCatagory.innerHTML    = '分类-'+(i+1)+ ' : ' + catagories[i].name;
                        oneCatagory.appendChild(delBut);
                        oneCatagory.appendChild(modBut);

                        document.getElementById("controlContent").appendChild(oneCatagory);
                    }  
                    
                          
                }else {
                    alert("数据库查询分类失败或没有分类");
                }
            }else{
                alert("数据库查询分类失败");
            }
        }
    });

}

function setCatagory(productID){
    document.getElementById('setCatagoryDiv').style.display = 'inline';
    var allCatagories          = document.createElement('div');
        yesBut                 = document.createElement("input");
        noBut                  = document.createElement("input");
    $.ajax({
        url:"/checkAllCatagories",
        type:"get",
        success:function(resp){
            if(resp.status == "success"){
                document.getElementById("setCatagoryForm").innerHTML = '';

                var catagories = resp.catagories;
                if(catagories.length > 0){
                    for(var i = 0; i < catagories.length; i++ ){

                        var input = document.createElement("input");
                            label = document.createElement("label");
                            br    = document.createElement("br");

                         
                        input.type = "checkbox";
                        input.className = 'catagoryCheckbox';
                        input.name = "cata" + catagories[i].id;
                        
                        label.innerHTML = catagories[i].name;
                        document.getElementById("setCatagoryForm").appendChild(input);
                        document.getElementById("setCatagoryForm").appendChild(label);
                        document.getElementById("setCatagoryForm").appendChild(br);
                    }

                    $('.catagoryCheckbox').click(function() {
                        $('.catagoryCheckbox').not(this).prop('checked', false);
                    });

                    yesBut.type = 'submit';
                    yesBut.value        = '确认';
                    yesBut.id               ='yes';
                    noBut.type = 'submit';
                    noBut.value        = '取消';
                    noBut.id = 'no';
                    document.getElementById("setCatagoryForm").appendChild(yesBut);
                    document.getElementById("setCatagoryForm").appendChild(noBut);
                    yesBut.addEventListener('click', function(e){
                        e.preventDefault(); 

                        if(!$("#setCatagoryForm").serializeArray().length == 0){
                            
                            var cataID = $("#setCatagoryForm").serializeArray()[0]['name'].substring(4);
                            console.log('productid is '+productID+'cataid' + cataID);
                            $.ajax({
                                type: "POST",
                                url: "/setCatagory",
                                data: {
                                    'productID': productID,
                                    'cataID': cataID,

                                },
                                success: function(data){
                                    if(data.status == 'success'){
                                        document.getElementById('setCatagoryDiv').style.display = 'none';
                                        // location.reload();
                                    };
            
                                    if(data.status == 'failed'){
                                        alert('无法修改分类');
            
                                    }
                            }
                         });
                        }else{
                            alert('请选择一个分类');
                        }
                    });
                    noBut.addEventListener('click', function(e){
                        document.getElementById('setCatagoryDiv').style.display = 'none';
                        e.preventDefault();
                    });

                }          
            }else {
                alert("数据库查询分类失败或没有分类");
            }
        }
    });

}

function addCatagory(){
    var catagoryName = document.createElement("input");
        addButton = document.createElement("button");
        cancelButton = document.createElement("button");

        catagoryDiv = document.getElementById('setCatagoryDiv');
    
    
    catagoryName.type = 'text';
    catagoryName.id = 'catagoryName';
    addButton.innerHTML = '添加';
    cancelButton.innerHTML = '取消';

    catagoryDiv.innerHTML = '请输入分类名字';
    catagoryDiv.appendChild(catagoryName);
    catagoryDiv.appendChild(addButton);
    catagoryDiv.appendChild(cancelButton);
    catagoryDiv.style.display = 'inline';

    addButton.addEventListener('click', function(){
        var name = document.getElementById('catagoryName').value;
        if(!name == ''){
            $.ajax({
                type: "POST",
                url: '/addCatagory',
                data: {'name' : name},
                success: function(data){
                    if(data.status == 'success'){
                        alert('添加分类成功！');
                        catagoryDiv.innerHTML = '<form id=\'setCatagoryForm\'></form>';
                        catagoryDiv.style.display = 'none';
                    };
    
                    if(data.status == 'failed'){
                        alert('添加分类失败');
                        catagoryDiv.innerHTML = '<form id=\'setCatagoryForm\'></form>';
                        catagoryDiv.style.display = 'none';
                    }
                }
         });

        }else{
            alert('分类名不能为空。');
        }
        

    });
    cancelButton.addEventListener('click', function(){
        catagoryDiv.innerHTML = '<form id=\'setCatagoryForm\'></form>';
        catagoryDiv.style.display = 'none';
    })
}

function deleteCatagory(catagoryID){
    $.ajax({
        url:"/deleteACatagories",
        type:"post",
        data:{'purpose':'delete','catagoryID':catagoryID},
        success:function(resp){
            if(resp.status == "success"){
              prepareCatagory();         
            }else {
                if(resp.reason == 'foreign key failed'){
                    alert('删除失败：该分类存在有效产品');
                }else{
                    alert("删除分类失败或没有分类");
                }
                
            }
        }
    });


}

function modifyCatagory(catagoryID){
    var catagoryName = document.createElement("input");
        addButton = document.createElement("button");
        cancelButton = document.createElement("button");

        catagoryDiv = document.getElementById('setCatagoryDiv');
    
    
    catagoryName.type = 'text';
    catagoryName.id = 'catagoryName';
    addButton.innerHTML = '修改';
    cancelButton.innerHTML = '取消';

    catagoryDiv.innerHTML = '请输入新的分类名字';
    catagoryDiv.appendChild(catagoryName);
    catagoryDiv.appendChild(addButton);
    catagoryDiv.appendChild(cancelButton);
    catagoryDiv.style.display = 'inline';

    addButton.addEventListener('click', function(){
        var name = document.getElementById('catagoryName').value;
        if(!name == ''){
            $.ajax({
                type: "POST",
                url: '/modifyACatagories',
                data:{'purpose':'modify','catagoryID':catagoryID, 'name':name},
                success: function(data){
                    if(data.status == 'success'){
                        alert('修改分类成功！');
                        catagoryDiv.innerHTML = '<form id=\'setCatagoryForm\'></form>';
                        catagoryDiv.style.display = 'none';
                    };
    
                    if(data.status == 'failed'){
                        alert('修改分类失败');
                        catagoryDiv.innerHTML = '<form id=\'setCatagoryForm\'></form>';
                        catagoryDiv.style.display = 'none';
                    }
                }
         });

        }else{
            alert('分类名不能为空。');
        }
        

    });
    cancelButton.addEventListener('click', function(){
        catagoryDiv.innerHTML = '<form id=\'setCatagoryForm\'></form>';
        catagoryDiv.style.display = 'none';
    })
    


}

function setPromote(productID){
    document.getElementById('setCatagoryDiv').style.display = 'inline';
    var allCatagories          = document.createElement('div');
        yesBut                 = document.createElement("input");
        noBut                  = document.createElement("input");
        allPromoto             = ['人气榜单','新人福利社','四月更新','今日疯抢','节日推广','当红牛市'];
    $.ajax({
        url:"/checkProductPromoto",
        type:"POST",
        data:{
            'productID':productID
        },
        success:function(resp){
            if(resp.status == "success"){
                console.log('response success');
                document.getElementById("setCatagoryForm").innerHTML = '';

                var promoteTypes = resp.promoteTypes;
                    productInfo = document.createElement("label");
                    productInfo.innerHTML = promoteTypes[0].name;
                    br    = document.createElement("br");
                document.getElementById("setCatagoryForm").appendChild(productInfo);
                document.getElementById("setCatagoryForm").appendChild(br);
                if(true){
                    for(var i = 0; i < allPromoto.length; i++ ){

                        var input = document.createElement("input");
                            label = document.createElement("label");
                            br    = document.createElement("br");

                         
                        input.type = "checkbox";
                        input.className = 'promoteCheckbox';
                        // input.name = "cata" + catagories[i].id;
                        
                        label.innerHTML = allPromoto[i];
                        document.getElementById("setCatagoryForm").appendChild(input);
                        document.getElementById("setCatagoryForm").appendChild(label);
                        document.getElementById("setCatagoryForm").appendChild(br);
                    }

                    // $('.catagoryCheckbox').click(function() {
                    //     $('.catagoryCheckbox').not(this).prop('checked', false);
                    // });

                    yesBut.type = 'submit';
                    yesBut.value        = '确认';
                    yesBut.id               ='yes';
                    noBut.type = 'submit';
                    noBut.value        = '取消';
                    noBut.id = 'no';
                    document.getElementById("setCatagoryForm").appendChild(yesBut);
                    document.getElementById("setCatagoryForm").appendChild(noBut);
                    yesBut.addEventListener('click', function(e){
                        e.preventDefault(); 
                        console.log($("#setCatagoryForm").serializeArray());

                        // if(!$("#setCatagoryForm").serializeArray().length == 0){
                            
                        //     var cataID = $("#setCatagoryForm").serializeArray()[0]['name'].substring(4);
                        //     console.log('productid is '+productID+'cataid' + cataID);
                        //     $.ajax({
                        //         type: "POST",
                        //         url: "/setCatagory",
                        //         data: {
                        //             'productID': productID,
                        //             'cataID': cataID,

                        //         },
                        //         success: function(data){
                        //             if(data.status == 'success'){
                        document.getElementById('setCatagoryDiv').style.display = 'none';
                        //                 // location.reload();
                        //             };
            
                        //             if(data.status == 'failed'){
                        //                 alert('无法修改分类');
            
                        //             }
                        //     }
                        //  });
                        // }else{
                        //     alert('请选择一个分类');
                        // }
                    });
                    noBut.addEventListener('click', function(e){
                        document.getElementById('setCatagoryDiv').style.display = 'none';
                        e.preventDefault();
                    });
                }
            }
        }
    });
}