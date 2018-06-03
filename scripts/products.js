$(document).ready(function(){
    console.log('javascript is woring');   
    $(function(){
        $("#catagoryDiv").load("/header"); 
      });
    
    $(function(){
        $("#menu").load("/menu"); 
      });
    var productBody = document.getElementById("productBody")
    var cata = (getQueryVariable("cata"));
    var host = location.protocol + '//' + location.host

    
    $.ajax({
        url:"/products",
        type:"post",
        data:{cata:cata},
        success:function(resp){
            console.log(resp)
            for(var i=0;i<resp.product.length;i=i+2){
                console.log(resp.product[i])
                createProduct(i,resp.product[i],resp.product[i+1])
            }
        }
    })

    function createProduct(i,product1,product2){
        var tableRow = document.createElement("tr");
        tableRow.className="productTableRow";
        
        var leftTd = document.createElement("td");
        var rightTd = document.createElement("td");
        leftTd.className="productDivL";
        rightTd.className = "productDivR";
        
        var productDiv1 = document.createElement("div");
        var productDiv2 = document.createElement("div");
        productDiv1.className="productTableDiv";
        productDiv2.className="productTableDiv";
        
        var img1 = document.createElement("img");
        img1.src="/imgs/ludan.jpg";
        img1.className="productImg";
        img1.onclick=function(){
            goToProductDetail(product1.id)
        }
        var img2 = document.createElement("img");
        img2.className="productImg"

        var breakSpace1 = document.createElement("br");
        var breakSpace2 = document.createElement("br");

        var productName1 = document.createElement("h5");
        productName1.className="productTitle";
        productName1.innerHTML=product1.name;
        var productName2 = document.createElement("h5");
        productName2.className="productTitle";

        var productDesc1=document.createElement("div");
        productDesc1.className="productDesc";
        productDesc1.innerHTML=product1.title;
        var productDesc2=document.createElement("div");
        productDesc2.className="productDesc";

        var productPrice1=document.createElement("div");
        productPrice1.className="productPrice";
        var productPrice2=document.createElement("div");
        productPrice2.className="productPrice";

        var newPrice1=document.createElement("div");
        newPrice1.className="newPrice";
        newPrice1.innerHTML="$"+product1.price;
        var newPrice2=document.createElement("div");
        newPrice2.className="newPrice";

        var oldPrice1= document.createElement("div");
        oldPrice1.className="oldPrice";
        oldPrice1.innerHTML="$"+product1.origin_price;
        var oldPrice2= document.createElement("div");
        oldPrice2.className="oldPrice";

        var tag1=document.createElement("div");
        tag1.className="tag";
        var tag2=document.createElement("div");
        tag2.className="tag";

        productBody.appendChild(tableRow);
        tableRow.appendChild(leftTd);
        leftTd.appendChild(productDiv1);
        productDiv1.appendChild(img1);
        productDiv1.appendChild(breakSpace1);
        productDiv1.appendChild(productName1);
        productDiv1.appendChild(productDesc1);
        productDiv1.appendChild(productPrice1);
        productPrice1.appendChild(newPrice1);
        productPrice1.appendChild(oldPrice1);
        productDiv1.appendChild(tag1);

        if(product1.is_own == 1){
            var selfTag = document.createElement("div");
            selfTag.className="selfTag";
            selfTag.innerHTML="自营";
            tag1.appendChild(selfTag);
            selfTag.onclick=function(){
                goToSales("self")
            }
        }
        if(product1.is_promoting ==1){
            var promoting = document.createElement("div");
            promoting.className="otherTag";
            promoting.innerHTML="限时抢购";
            tag1.appendChild(promoting);
            promoting.onclick=function(){
                goToSales("promoting")
            }
        }

        if(product1.is_heat ==1){
            var heat = document.createElement("div");
            heat.className="otherTag";
            heat.innerHTML="今日疯抢";
            tag1.appendChild(heat);
            heat.onclick=function(){
                goToSales("heat")
            }
        }

        if(product1.is_event_sale ==1){
            var eventSale = document.createElement("div");
            eventSale.className="otherTag";
            eventSale.innerHTML="节日促销";
            tag1.appendChild(eventSale);
            eventSale.onclick=function(){
                goToSales("eventSale")
            }
        }

        if(product2 != undefined){
            productName2.innerHTML=product2.name;
            productDesc2.innerHTML=product2.title;
            newPrice2.innerHTML="$"+product2.price;
            oldPrice2.innerHTML="$"+product2.origin_price;
            img2.src="/imgs/ludan.jpg"
            img2.onclick=function(){
                goToProductDetail(product2.id)
            }

            tableRow.appendChild(rightTd);
            rightTd.appendChild(productDiv2);
            productDiv2.appendChild(img2);
            productDiv2.appendChild(breakSpace2);
            productDiv2.appendChild(productName2);
            productDiv2.appendChild(productDesc2);
            productDiv2.appendChild(productPrice2);
            productPrice2.appendChild(newPrice2);
            productPrice2.appendChild(oldPrice2);
            productDiv2.appendChild(tag2);

            if(product2.is_own == 1){
                var selfTag = document.createElement("div");
                selfTag.className="selfTag";
                selfTag.innerHTML="自营";
                tag2.appendChild(selfTag);
                selfTag.onclick=function(){
                    goToSales("self")
                }
            }
            if(product2.is_promoting ==1){
                var promoting = document.createElement("div");
                promoting.className="otherTag";
                promoting.innerHTML="限时抢购";
                tag2.appendChild(promoting);
                promoting.onclick=function(){
                    goToSales("promoting")
                }
            }
            if(product2.is_heat ==1){
                var heat = document.createElement("div");
                heat.className="otherTag";
                heat.innerHTML="今日疯抢";
                tag2.appendChild(heat);
                heat.onclick=function(){
                    goToSales("heat")
                }
            }
            if(product2.is_event_sale ==1){
                var eventSale = document.createElement("div");
                eventSale.className="otherTag";
                eventSales.innerHTML="节日促销";
                tag2.appendChild(eventSale);
                eventSale.onclick=function(){
                    goToSales("eventSale")
                }
            }
        }
        
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

    function goToProductDetail(id){
        location.href = host+"/productDetails?id="+id;
    };

    function goToSales(type){
        location.href = host+"/sales?type="+type;
    };
})
