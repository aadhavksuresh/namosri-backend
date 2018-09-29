
$(document).ready(function(){   
    $.ajax({
        url: "/get/all/products",
        method: "POST",
        success: function(result){
            if(result.body.success){
                len = 6;
                product = result.body.result;
                for (var i = 0; i < 6 && i < product.length ; i++) {
                     $(".product-detail").append("<div class='col-lg-4 col-md-6 box wow bounceInUp ' data-wow-duration='1.4s' id='product1'><a href='/products/"+product[i].productId+"'> "+
                    " <img src='images/ProductImages/"+product[i].productImage+"'  alt='' class='img-fluid'></a><br><br><h4 class='title'><a href='/products/"+product[i].productId+"'> "+product[i].name+" </a></h4> "+
                    " <div id='moreinfo'><a  class='btn btn-success' href='/products/"+product[i].productId+"'> More Info</a></div></div>");
                };    
                $(".loader").css("display", 'none');   
            
           }
        },
        error: function(err){
            console.log("error can't make the request");
        }
    });  

});