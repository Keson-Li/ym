$(document).ready(function(){
    console.log('javascript is woring');   
    
    var id = (getQueryVariable("id"));
    var host = location.protocol + '//' + location.host
    

    $.ajax({
        url:"productDetail",
        type:"post",
        data:{id:id},
        success:function(resp){
            createItem(resp.product[0])
        }
        
    })

    function createItem(product){
        $("#productTitle")[0].innerHTML=product.name;
        $("#productImg")[0].src="/imgs/ludan.jpg";
        if(product.is_promoting ==1){
            $("#productTag1")[0].innerHTML="限时抢购";
        }
        if(product.is_heat ==1){
            $("#productTag2")[0].innerHTML="今日特价";
        }
        if(product.is_event_sale ==1){
            $("#productTag3")[0].innerHTML="节日促销";
        }
        $("#newPrice")[0].innerHTML="$"+product.price;
        $("#oldPrice")[0].innerHTML="$"+product.origin_price;
        if(product.is_own ==1){
            $("#selfTag")[0].innerHTML="自营";         
        }
        $("#desc")[0].innerHTML=product.description;

    }

    function getQueryVariable(variable)
    {
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
    }
    
})
