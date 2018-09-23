$(document).ready(function() {
    if (window.localStorage.getItem("authToken")) {
        $.ajax({
            url: "/user/verifier",
            method: "POST",
            data: {
                token: window.localStorage.getItem("authToken")
            },
            success: function(result) {
                if (result.body.success) {
                    function getRecipe() {
                        $.ajax({
                            url: "/get/one/recipe",
                            method: "POST",
                            data: {
                                id: $("#rid").html().trim()
                            },
                            success: function(result) {
                                console.log(result);
                                if (result.body.success) {
                                    recipe = result.body.result;

                                    $("#oldName").attr("value", recipe.name);
                                    $("#newDescription").text(
                                        recipe.description
                                    );

                                    M.textareaAutoResize($("#newDescription"));
                                    M.updateTextFields();
                                } else {
                                    console.log("can't fetch the recipe");
                                }
                            },
                            error: function(err) {
                                console.log("error can't make the request");
                            }
                        });
                    }

                    getRecipe();
                    $(".loader").css("display", "none");
                    $(".main").css("display", "block");
                    $(".errors").css("display", "none");

                    $("#recipeUpdate").submit(function(e) {
                        e.preventDefault();
                        var oldName = $("#oldName").val();
                        var newName = $("#newName").val();
                        var newDescription = $("#newDescription").val();

                        $.ajax({
                            url: "/update/recipe",
                            method: "POST",
                            data: {
                                oldName: oldName,
                                newName: newName,
                                newDescription: newDescription,
                                token: window.localStorage.getItem("authToken")
                            },
                            success: function(result) {
                                if (result.body.success) {
                                    console.log(result);
                                    var div = $(
                                        "<div class='card-panel green'>Recipe Updated Successfully</div>"
                                    );
                                    $(".info").append(div);
                                } else {
                                    var div = $(
                                        "<div class='card-panel red'>Error in Updating the Recipe</div>"
                                    );
                                    $(".info").append(div);
                                }
                            },
                            error: function(err) {
                                var div = $(
                                    "<div class='card-panel red'>Either the Server is Down or Your Internet</div>"
                                );
                                $(".info").append(div);
                            }
                        });
                    });
                } else {
                    window.localStorage.removeItem("authToken");
                    $(".loader").css("display", "none");
                    $(".main").css("display", "none");
                    $(".errors").css("display", "block");
                }
            },
            error: function(err) {
                window.localStorage.removeItem("authToken");
                $(".errors").text(
                    "Either the Server is down or Check Your internet connectivity"
                );
                $(".loader").css("display", "none");
                $(".main").css("display", "none");
                $(".errors").css("display", "block");
            }
        });
    } else {
        $(".loader").css("display", "none");
        $(".main").css("display", "none");
        $(".errors").css("display", "block");
    }
});
