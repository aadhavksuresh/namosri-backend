  $(document).ready(function(){   
    $.ajax({
        url: "/get/all/products",
        method: "POST",
        success: function(result){
            if(result.body.success){
                len = 6;
                product = result.body.result;
                for (var i = 0; i < 6 && i < product.length ; i++) {
                   $(".product-detail").append("<div class='col-lg-4 col-md-6 box wow bounceInUp ' data-wow-duration='1.4s' id='product1'><a href='/products/"+product[i].productId+"'>  <img src='images/ProductImages/"+product[i].productImage+"'  alt='' class='img-fluid'></a><br><br><h4 class='title'><a href='/products/"+product[i].productId+"'> "+product[i].name+" </a></h4><form id='moreinfo'><input class='btn btn-success' onclick='window.location.href=\''/product/ "+product[i].productId+"\''' type='button' value='More Info' /></form></div>");
                };          
           }
        },
        error: function(err){
            console.log("error can't make the request");
        }
    });  

});