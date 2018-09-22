console.log("nk");      
$(document).ready(function(){  
   
    $.ajax({
        url: "/get/one/product",
        method: "POST",
        data: {
            productId :  $("#pid").html() 
        },
        success: function(result){
            if(result.body.success){
                console.log(result.body.result);
                $("#productId").html(result.body.result.name);
                $("#productImage").attr("src" , "../images/ProductImages/" +result.body.result.productImage);
            }
        },
        error: function(err){
            console.log("error can't make the request");
        }
    });         
});