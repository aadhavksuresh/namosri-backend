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
                product = result.body.result;
                $("#productId").html(result.body.result.name);
                $("#productImage").attr("src" , "../images/ProductImages/" +product.productImage);
                var desc = product.description.split("\n");

                var descp = $('#description');

                descp.append("<ul>");
                desc.forEach(des => {
                    descp.append("<li>"+des+"</li><br>")
                });
                descp.append("</ul>");
                
            }
        },
        error: function(err){
            console.log("error can't make the request");
        }
    });   

    $.ajax({
        url: "/get/one/instruction",
        method: "POST",
        data: {
            productId :  $("#pid").html() 
        },
        success: function(result){
            if(result.body.success){
                console.log(result.body);
                // product = result.body.result;
                // $("#productId").html(result.body.result.name);
                // $("#productImage").attr("src" , "../images/ProductImages/" +product.productImage);
                // var desc = product.description.split("\n");

                // var descp = $('#description');

                // descp.append("<ul>");
                // desc.forEach(des => {
                //     descp.append("<li>"+des+"</li><br>")
                // });
                // descp.append("</ul>");
                
            }
        },
        error: function(err){
            console.log("error can't make the request");
        }
    });         
});