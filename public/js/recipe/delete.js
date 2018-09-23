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

                    function getRecipes(){
                        $.ajax({
                            url: "/get/all/recipe",
                            method: "POST",
                            data: {
                                token: window.localStorage.getItem("authToken")
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
                                        $("#recipeDelete").append($('<input class="waves-effect waves-light btn" type="submit" value="Delete Product">'));
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
                                token: window.localStorage.getItem("authToken"),
                                name: value
                            },
                            success: function(result){
                                if(result.body.success){
                                    getRecipes();
                                    var div = $("<div>"+result.body.result+" deleted successfully</div>");
                                    $("body").append(div);
                                    var div = $("<div class='card-panel green'>"+result.body.result+" Deleted Successfully</div>");
                                    $(".info").append(div);
                                } else {
                                    var div = $("<div class='card-panel red'>Error in Deleting the Recipe</div>");
                                    $(".info").append(div);
                                }
                            },
                            error: function(err){
                                var div = $("<div class='card-panel red'>Either the Server is Down or Your Internet</div>");
                                $(".info").append(div);
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