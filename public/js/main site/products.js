console.log("nk");      
$(".loader").css("display", 'block'); 
console.log()
$(document).ready(function(){  
    console.log("nk");    
    $.ajax({
        url: "/get/all/products",
        method: "POST",
        success: function(result){
            if(result.body.success){
                result.body.result.forEach(product => {
                   $(".product-detail").append("<div class='col-lg-4 col-md-6 box wow bounceInUp ' data-wow-duration='1.4s' id='product1'><a href='/products/"+product.productId+"'> "+
                    " <img src='images/ProductImages/"+product.productImage+"'  alt='' class='img-fluid'></a><br><br><h4 class='title'><a href='/products/"+product.productId+"'> "+product.name+" </a></h4> "+
                    " <div id='moreinfo'><a  class='btn btn-success' href='/products/"+product.productId+"'> More Info</a></div></div>");
                });
                 $(".loader").css("display", 'none');   
            }
        },
        error: function(err){
            console.log("error can't make the request");
        }
    });         
});