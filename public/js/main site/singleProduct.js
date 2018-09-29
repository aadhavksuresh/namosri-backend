$(document).ready(function(){  
   var i = 0;
   $("#requestForm").submit(function(e){ 
        e.preventDefault();
        $.ajax({
        url: "/request/product",
        method: "POST",
        data: {
            productId :  $("#pid").html(),
            mobile: $("#tf4").val(),
            address: $("#tf5").val(),
            name: $("#tf3").val()
        },
        success: function(result){
            if(result.body.success){
                $(".modal-body").html("Application Submitted Successfully");
                $('#exampleModal').modal();
                $("#requestBtn").html("Your Request is Received by Us");
                $("#requestBtn").attr("disabled" , "");
            }
        },
        error: function(err){
            console.log("error can't make the request");
        }
    });  
   });
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
                $(".instructions>h3").html(result.body.result.name+" Recipie: ");
                $("#productImage").attr("src" , "../images/ProductImages/" +product.productImage);
                var desc = product.description.split("\n");

                var descp = $('#description');

                descp.append("<ul>");
                desc.forEach(des => {
                    descp.append("<li>"+des+"</li><br>")
                });
                descp.append("</ul>");
                i++;
                if(i == 2) {
                     $(".loader").css("display", 'none');   
                     i = 0;
                }
                
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
                // console.log(result.body);
                var inst = $(".instructions");
                instruction = result.body.result;
                instruction.forEach(instr => {
                    inst.append("<ul>");
                    desc = instr.description.split("\n");
                    var i = 0;
                     desc.forEach(des => {
                        if(!i) {
                            inst.append("<h5>"+des+"</h5><br>")
                            i++;
                        }
                        inst.append("<li>"+des+"</li><br>")
                    });
                    inst.append("</ul>");
                }); 
                if(!instruction.length) {
                    $(".instructions").append("No Instruction provided!!<br><br>");
                }
                i++;
                if(i == 2) {
                     $(".loader").css("display", 'none');   
                     i = 0;
                }

            }else {

            }
        },
        error: function(err){
            console.log("error can't make the request");
        }
    });         
});