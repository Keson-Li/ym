$(document).ready(function(){
    var host = location.protocol + '//' + location.host

    $("#homePage")[0].onclick=function(){
        location.href = host
    }
    $("#shopCart")[0].onclick=function(){
        location.href = host+"/shopingCart"
    }
    $("#homePage")[0].onclick=function(){
        location.href = host
    }

})
    