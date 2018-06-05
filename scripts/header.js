$(document).ready(function(){
    var host = location.protocol + '//' + location.host
    
    var protocol = location.protocol;
    var cataHidden = document.getElementById("cataHidden")
    var meat = document.getElementById("meat")
    var cataShow = document.getElementById("cataShow")
    var cataHidden = document.getElementById("cataHidden")
    
    function goTo (cata){
        location.href = host+"/products?cata="+cata
    }

    $.ajax({
        url:"checkAllCatagories",
        type:"post",
        success:function(resp){
            for(var i=0;i<resp.catagories.length;i++){
                createCata(i,resp.catagories[i].id,resp.catagories[i].name,resp.catagories.length)
            
            }
        }
    })

    function createCata (i,id,name,length){ 
        var cataDiv = document.createElement("div");
        cataDiv.className = "cataDiv";
        var img = document.createElement("img");
        img.className="cataImg"
        var textDiv = document.createElement("small");
        textDiv.className="cataText"
        var breakSpace = document.createElement("br");
       
        if(length <= 5){
            
            cataDiv.onclick=function(){
                goTo(id)
            }
            img.src="/imgs/meat.jpg"
            textDiv.innerHTML=name;
            
            cataShow.appendChild(cataDiv);
            cataDiv.appendChild(img);
            cataDiv.appendChild(breakSpace);
            cataDiv.appendChild(textDiv)
        } else {
            if(i<4){
                cataDiv.onclick=function(){
                    goTo(id)
                }
                img.src="/imgs/meat.jpg"
                textDiv.innerHTML=name;
                
                cataShow.appendChild(cataDiv);
                cataDiv.appendChild(img);
                cataDiv.appendChild(breakSpace);
                cataDiv.appendChild(textDiv)
            } 
            if (i==4){
                img.src="/imgs/more.png"
                textDiv.innerHTML="更多分类"

                cataShow.appendChild(cataDiv);
                cataDiv.appendChild(img);
                cataDiv.appendChild(breakSpace);
                cataDiv.appendChild(textDiv);

                cataDiv.addEventListener("click",function(){
                    if (cataHidden.style.maxHeight) {
                        cataHidden.style.maxHeight = null;
                    } else {
                        cataHidden.style.maxHeight = "100vh";
                    }
                })
                
            }
            if(i>4){
                cataDiv.onclick=function(){
                    goTo(id)
                }
                img.src="/imgs/meat.jpg"
                textDiv.innerHTML=name;
                
                cataHidden.appendChild(cataDiv);
                cataDiv.appendChild(img);
                cataDiv.appendChild(breakSpace);
                cataDiv.appendChild(textDiv)
            }
        }

    }

    function goTo (cata){
        location.href = host+"/products?cata="+cata
    }

})
