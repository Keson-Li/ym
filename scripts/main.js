$(document).ready(function(){

    /**********************************VARS*************************************/
        var loginBut = document.getElementById("loginButton"),
            passInput = document.getElementById("passWord"),
            empInput =document.getElementById("empId"),
            regExEmpId = /^[A][0-9][0-9][0-9]{1,3}$/,
            regExPassword = /^[a-zA-Z0-9]{5,50}$/;
        
    /**********************************LOGIN*************************************/
        empInput.onkeyup = function(){
            if(!regExEmpId.test(empInput.value)){
                empInput.style.boxShadow = '0 0 35px 1px red';
                empInput.style.borderBottom = 'red';
            } else{
                empInput.style.boxShadow = '0 0 35px 1px limegreen';
                empInput.style.borderBottom = 'green';
            }
        }
    
        passInput.onkeyup = function () {
            if(!regExPassword.test(passInput.value)){
                passInput.style.boxShadow = '0 0 35px 1px red';
                passInput.style.borderBottom = 'red';
            } else{
                passInput.style.boxShadow = '0 0 35px 1px limegreen';
                passInput.style.borderBottom = 'green';
            }
        }
    
        loginBut.addEventListener("click", function(){
            console.log("Attempting to login");
            // if(!regExEmpId.test(empInput.value)||!regExPassword.test(passInput.value)){
            if(1==0){
                alert("Please make sure all inputs are valid.")
            } else{
                $.ajax({
                    url:"/login",
                    type:"post",
                    data:{
                        password: passInput.value,
                        empId: empInput.value
                    },
                    success:function(resp){
                        console.log(resp);
                        if(resp.status == "success"){
                            location.href = "/main";
                        }else {
                            alert("Incorrect Employee ID or password");
                        }
                    }
                });
            }
        });
    })
    