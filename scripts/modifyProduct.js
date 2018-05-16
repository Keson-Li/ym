$(document).ready(function(){
    $.ajax({
        url:"/checkAllProduct",
        type:"get",
        success:function(resp){
            if(resp.status == "success"){
                location.href = "/main";
            }else {
                alert("Incorrect Employee ID or password");
            }
        }
    });
})
    