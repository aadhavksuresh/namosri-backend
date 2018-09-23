$(document).ready(function(){
    $("#submit-add-product").css("visibility" , "hidden");
    $("#picture").css("visibility" , "hidden");
    if(window.localStorage.getItem("authToken")){
        $.ajax({
            url: '/user/verifier',
            method: "POST",
            data: {
                token: window.localStorage.getItem('authToken')
            },
            success: function(result){
                if(result.body.success){
                    $('.loader').css("display", "none");
                    $('.main').css("display", "block");
                    $('.errors').css("display", "none");

                    $('#picture-form').submit(function(e){
                         e.preventDefault();
                         var title = "nk"; 
                         $(this).ajaxSubmit({
                           data: {title: title},
                           contentType: 'application/json',
                           success: function(result){
                             console.log('image uploaded and form submitted');   
                             if(result.body.success) {
                                $("#submit-add-product").css("visibility" , "visible");
                                $("#picture").css("visibility" , "visible");
                                $("#picture").attr("value" , result.body.result);
                                $("#submit-add-product").addClass("waves-effect");
                                $("#submit-add-product").addClass("waves-light");
                                $("#picture-form").css("visibility" , "hidden");
                                
                                console.log(result.body.result);
                             }  
                           },
                           error: function (err) {
                               console.log(err);
                           }
                       });
                         return false;
                    });

                    $("#productForm").submit(function(e){
                        e.preventDefault();
                        var name = $("#name").val();
                        var description = $("#description").val();
                        var position = $("#position").val();
                        var pImage = $("#picture").val();
                        $.ajax({
                            url: "/add/products",
                            method: "POST",
                            data: {
                                name: name,
                                description: description,
                                position: position,
                                productImage: pImage,
                                token: window.localStorage.getItem("authToken")
                            },
                            success: function(result){
                                if(result.body.success){
                                    var div = $("<div class='card-panel green'>"+result.body.result.name+" added Successfully</div>");
                                    $(".info").append(div);
                                } else {
                                    if(result.header.code == 807){
                                        var div = $("<div class='card-panel red'>A Product already exists at that position</div>");
                                        $(".info").append(div);
                                    } else {
                                        var div = $("<div class='card-panel red'>Error in adding the product</div>");
                                        $(".info").append(div);
                                    }
                                }
                            },
                            error: function(err){
                                var div = $("<div class='card-panel red'>Either the Server is Down or Your Internet</div>");
                                $(".info").append(div);
                            }
                        })

                    })
                } else {
                    window.localStorage.removeItem("authToken");
                    $('.loader').css("display", "none");
                    $('.main').css("display", "none");
                    $('.errors').css("display", "block");
                }
            },
            error: function(err){
                window.localStorage.removeItem("authToken");
                $('.errors').text("Either the Server is down or Check Your internet connectivity");
                $('.loader').css("display", "none");
                $('.main').css("display", "none");
                $('.errors').css("display", "block");
            }            
        })
    } else {
        $('.loader').css("display", "none");
        $('.main').css("display", "none");
        $('.errors').css("display", "block");
    }
});