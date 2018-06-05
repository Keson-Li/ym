$(document).ready(function(){
    $('#productImg').on('change', function(){
        var files = $(this).get(0).files;
                
        if (files.length > 0){
            img    = files[0];
            console.log(img);  
            $.ajax({
                type: "POST",
                url: "/testupload",
                data: {'img':img},// serializes the form's elements.
                success: function(data){
                        if(data.status == 'success'){
                            location.reload();
                        };

                        if(data.status == 'failed'){
                            alert('Adding product failed!');

                        }
                }
            });
        }
      
      });
    
    $("#uploadfile").submit(function(e) {
        // console.log(document.getElementById('productImg').get(0).files);
        // $.ajax({
        //     type: "POST",
        //     url: "/addProducts",
        //     data: $("#productDetail").serialize(), // serializes the form's elements.
        //     success: function(data){
        //             if(data.status == 'success'){
        //                 location.reload();
        //             };

        //             if(data.status == 'failed'){
        //                 alert('Adding product failed!');

        //             }
        //     }
        // });
    
        // document.getElementById('cancel').addEventListener("click", function(  ){
        //         document.getElementById("addProduct").style.display = 'inline';
        //         document.getElementById("confirmInfo").innerHTML= '';
    
        // });
        
          e.preventDefault(); // avoid to execute the actual submit of the form.
      });   
})

