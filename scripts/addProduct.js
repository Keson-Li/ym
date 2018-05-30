$(document).ready(function(){
      regExPrice = /^[0-9]+(\.[0-9][0-9]?)?$/;
      isPriceValidated = false;
      isOriginPriceValidated = false;

      var   name = document.getElementById('name');
            title = document.getElementById('title');
            originPlace = document.getElementById('originPlace');
            catagory = document.getElementById('allCatagory');
            price = document.getElementById('price');
            originPrice = document.getElementById('originPrice');
            description = document.getElementById('description');

      $.ajax({
            url:"/checkAllCatagories",
            type:"get",
            success:function(resp){
                  if(resp.status == "success"){
                        var catagories = resp.catagories;
                        if(catagories.length > 0){
                              for(var i = 0; i < catagories.length; i++ ){
                                    var opt = document.createElement('option');
                                    opt.value = catagories[i].name;
                                    opt.innerHTML = catagories[i].name;
                                    catagory.appendChild(opt);
                              }
                        }          
                  }else {
                        alert("数据库查询分类失败或没有分类");
                }
            }
      });

      

      
      price.onkeyup = function () {
            if(!regExPrice.test(price.value)){
                  price.style.boxShadow = '0 0 35px 1px red';
                  price.style.borderBottom = 'red';
                  isPriceValidated = false;
            }else{
                  price.style.boxShadow = 'none';
                  price.style.borderBottom = 'medium none color';
                  isPriceValidated = true;

            }
      }

      originPrice.onkeyup = function () {
            if(!regExPrice.test(originPrice.value)){
                  originPrice.style.boxShadow = '0 0 35px 1px red';
                  originPrice.style.borderBottom = 'red';
                  isOriginPriceValidated = false;
            }else{
                  originPrice.style.boxShadow = 'none';
                  originPrice.style.borderBottom = 'medium none color';
                  isOriginPriceValidated = true;
            }
      }


      $("#productDetail").submit(function(e) {
            alert(name.value);     
            if(!isPriceValidated || !isOriginPriceValidated){
                  alert('请输入合法的数据。');
            }else{
                  document.getElementById("addProduct").style.display = 'none';
                  document.getElementById("confirmInfo").innerHTML = '<h1>请再一次确认输入无误！</h1><br>    <form>\
                  名字: <label>'+ name.value+'</label><br>\
                  显示标题: <label>'+title.value+'</label><br>\
                  产地: <label>'+originPlace.value+'</label><br>\
                  分类: <label>'+catagory.value+'</label><br>\
                  实际价钱: <label>'+price.value+'</label><br>\
                  原价: <label>'+originPrice.value+'</label><br>\
                  描述:<br> <label>'+description.value+'</label><br>\
                  </form><br>   <button id=\'confirm\'>确认</button><button id=\'cancel\'>返回</button> ';
      
                  document.getElementById('confirm').addEventListener("click", function(  ){
                        $.ajax({
                              type: "POST",
                              url: "/addProducts",
                              data: $("#productDetail").serialize(), // serializes the form's elements.
                              success: function(data){
                                    if(data.status == 'success'){
                                          location.reload();
                                    };
            
                                    if(data.status == 'failed'){
                                          alert('Adding product failed!');
            
                                    }
                              }
                       });
              
                  });
            
                  document.getElementById('cancel').addEventListener("click", function(  ){
                        document.getElementById("addProduct").style.display = 'inline';
                        document.getElementById("confirmInfo").innerHTML= '';
              
                  });
            }
            e.preventDefault(); // avoid to execute the actual submit of the form.
        });   
  })
  
