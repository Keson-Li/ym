$(document).ready(function(){
    var $form = $('productDetail');
    $form.submit(function(){
       $.post($(this).attr('action'), $(this).serialize(), function(response){
             console.log(response);
       },'json');
       return false;
    });
 });