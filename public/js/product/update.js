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
                    function getProducts() {
                        $.ajax({
                            url: "/get/one/product",
                            method: "POST",
                            data: {
                                productId: $("#pid").html()
                            },
                            success: function(result) {
                                if (result.body.success) {
                                    product = result.body.result;

                                    $("#oldName").attr("value", product.name);
                                    // $("#newName").attr("value" , product.name);
                                    $("#newDescription").text(
                                        product.description
                                    );
                                    $("#newPosition").attr(
                                        "value",
                                        product.position
                                    );

                                    M.textareaAutoResize($("#newDescription"));
                                    M.updateTextFields();
                                }
                            },
                            error: function(err) {
                                console.log("error can't make the request");
                            }
                        });
                    }

                    getProducts();
                    $(".loader").css("display", "none");
                    $(".main").css("display", "block");
                    $(".errors").css("display", "none");

                    $("#productUpdate").submit(function(e) {
                        e.preventDefault();
                        var oldName = $("#oldName").val();
                        var newName = $("#newName").val();
                        var newDescription = $("#newDescription").val();
                        var newPosition = $("#newPosition").val();

                        $.ajax({
                            url: "/update/products",
                            method: "POST",
                            data: {
                                oldName: oldName,
                                newName: newName,
                                newDescription: newDescription,
                                newPosition: newPosition,
                                token: window.localStorage.getItem("authToken")
                            },
                            success: function(result) {
                                if (result.body.success) {
                                    var div = $(
                                        "<div class='card-panel green'>Product Modified Successfully</div>"
                                    );
                                    $(".info").append(div);
                                } else {
                                    var div = $(
                                        "<div class='card-panel red'>Error in modifing the Product</div>"
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
