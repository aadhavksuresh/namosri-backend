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
                            url: "/get/one/instruction",
                            method: "POST",
                            data: {
                                id: $("#iid").html().trim()
                            },
                            success: function(result) {
                                console.log(result);
                                if (result.body.success) {
                                    instruction = result.body.result;

                                    $("#newDescription").text(
                                        instruction.description
                                    );

                                    M.textareaAutoResize($("#newDescription"));
                                    M.updateTextFields();
                                } else {
                                    console.log("can't fetch the instruction");
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

                    $("#instructionUpdate").submit(function(e) {
                        e.preventDefault();
                        var newDescription = $("#newDescription").val();

                        $.ajax({
                            url: "/update/instruction",
                            method: "POST",
                            data: {
                                newDescription: newDescription,
                                token: window.localStorage.getItem("authToken"),
                                id: $("#iid").html().trim()
                            },
                            success: function(result) {
                                console.log(result);
                                if (result.body.success) {
                                    console.log(result);
                                    var div = $(
                                        "<div class='card-panel green'>Instruction Updated Successfully</div>"
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
