$(document).ready(function(){
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

                    function getProducts() {
                        $.ajax({
                            url: "/get/all/products",
                            method: "POST",
                            success: function(result) {
                                if (result.body.success) {
                                    var products = result.body.result;
                                    console.log(products);

                                    var selectTag = $("<select></select>");
                                    selectTag.attr("id", "productId");
                                    var options = $('<option value="0">Choose Which Product to Delete</option>');
                                    selectTag.append(options);
                                    for(var i=0;i<products.length;i++){
                                        var options = $("<option></option>");
                                        options.attr("value", result.body.result[i].productId);
                                        options.text(result.body.result[i].name);
                                        $(selectTag).append(options);
                                    }
                                    $(".selectField").append(selectTag);
                                    $("#productId").formSelect();
                                
                                } else {
                                    console.log("incorrect");
                                }
                            },
                            error: function(err) {
                                console.log("error can't make the request");
                            }
                        });
                    }
                    getProducts();

                    $("#instructionForm").submit(function(e){
                        e.preventDefault();
                        var description = $("#description").val();
                        var productId = $("#productId").val();

                        $.ajax({
                            url: "/add/instruction",
                            method: "POST",
                            data: {
                                productId: productId,
                                description: description,
                                token: window.localStorage.getItem("authToken")
                            },
                            success: function(result){
                                if(result.body.success){
                                    var div = $("<div class='card-panel green'>Instruction Added Successfully </div>");
                                    $(".info").append(div);
                                } else {
                                    var div = $("<div class='card-panel red'>Some error occured added successfully</div>");
                                    $(".info").append(div);
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