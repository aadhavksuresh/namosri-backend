$(document).ready(function(){
    if(window.sessionStorage.getItem("authToken")){
        $.ajax({
            url: '/user/verifier',
            method: "POST",
            data: {
                token: window.sessionStorage.getItem('authToken')
            },
            success: function(result){
                if(result.body.success){
                    $('.loader').css("display", "none");
                    $('.main').css("display", "block");
                    $('.errors').css("display", "none");

                    function getRecipes(){
                        $.ajax({
                            url: "/get/all/recipe",
                            method: "POST",
                            data: {
                                token: window.sessionStorage.getItem("authToken")
                            },
                            success: function(result){
                                if(result.body.success){
                                    if($("#recipeName").length == 0){
                                        var selectTag = $("<select></select>");
                                        selectTag.attr("id", "recipeName");
                                        var options = $('<option value="0">Choose Which Product to Delete</option>');
                                        selectTag.append(options);
                                        for(var i=0;i<result.body.result.length;i++){
                                            var options = $("<option></option>");
                                            options.attr("value", result.body.result[i].name);
                                            options.text(result.body.result[i].name);
                                            $(selectTag).append(options);
                                        }
                                        $("#recipeDelete").append(selectTag);
                                        $("#recipeDelete").append($('<input type="submit" value="Delete Product">'));
                                        $("#recipeDelete").css("display", "block");
                                        $("#recipeName").formSelect();
                                    } else {
                                        $("#recipeDelete").empty();
                                        getRecipes();
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
                
                    getRecipes();

                    $("#recipeDelete").submit(function(e){
                        e.preventDefault();
                        var value = $("#recipeName").val();
                        $.ajax({
                            url: "/delete/recipe",
                            method: "POST",
                            data: {
                                token: window.sessionStorage.getItem("authToken"),
                                name: value
                            },
                            success: function(result){
                                if(result.body.success){
                                    console.log(result);
                                    getRecipes();
                                    var div = $("<div>"+result.body.result+" deleted successfully</div>");
                                    $("body").append(div);
                                } else {
                                    console.log(result);
                                    var div = $("<div>Some error occured</div>");
                                    $("body").append(div);
                                }
                            },
                            error: function(err){
                                console.log("Can't make the ajax request");
                                var div = $("<div>Server not responding</div>");
                                $("body").append(div);
                            }
                        })
                    });

                } else {
                    $('.loader').css("display", "none");
                    $('.main').css("display", "none");
                    $('.errors').css("display", "block");
                }
            },
            error: function(err){
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