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
                    function getProducts(){
                        $.ajax({
                            url: "/get/all/products",
                            method: "POST",
                            data: {
                                token: window.localStorage.getItem("authToken")
                            },
                            success: function(result){
                                if(result.body.success){
                                    if($("#productName").length == 0){
                                        var selectTag = $("<select></select>");
                                        selectTag.attr("id", "productName");
                                        var options = $('<option value="0">Choose Which Product to Delete</option>');
                                        selectTag.append(options);
                                        for(var i=0;i<result.body.result.length;i++){
                                            var options = $("<option></option>");
                                            options.attr("value", result.body.result[i].name);
                                            options.text(result.body.result[i].name);
                                            $(selectTag).append(options);
                                        }
                                        $("#productDelete").append(selectTag);
                                        $("#productDelete").append($('<input type="submit" value="Delete Product">'));
                                        $("#productDelete").css("display", "block");
                                        $("#productName").formSelect();
                                    } else {
                                        $("#productDelete").empty();
                                        getProducts();
                                    }
                                } else {
                                    console.log(result);
                                    console.log("incorrect");
                                }
                            },
                            error: function(err){
                                console.log("error can't make the request");
                            }
                        });
                    }
                
                    getProducts();

                    $("#productDelete").submit(function(e){
                        e.preventDefault();
                        var value = $("#productName").val();
                        $.ajax({
                            url: "/delete/products",
                            method: "POST",
                            data: {
                                token: window.localStorage.getItem("authToken"),
                                name: value
                            },
                            success: function(result){
                                if(result.body.success){
                                    console.log(result);
                                    getProducts();
                                } else {
                                    console.log(result);
                                }
                            },
                            error: function(err){
                                console.log("Can't make the ajax request");
                            }
                        })
                    });

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