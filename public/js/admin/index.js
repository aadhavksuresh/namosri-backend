$(document).ready(function() {
    $(".collapsible").collapsible();

    // let modal=new M.Modal($("#modal1"));
    if (window.localStorage.getItem("authToken")) {
        $("#logout").on("click" , function () {
            window.localStorage.removeItem("authToken");
            window.location = "/user/login";
        });


        $.ajax({
            url: "/user/verifier",
            method: "POST",
            data: {
                token: window.localStorage.getItem("authToken")
            },
            success: function(result) {
                if (result.body.success) {
                    $(".agree-btn").on("click", function() {
                        console.log("nk");
                        deleteProduct($(".modal-content > h4").html());
                    });

                    $(".recipe-agree-btn").click(function(){
                        deleteRecipe($(".modal-content > h4").html());
                    });

                    function deleteProduct(productName) {
                        var value = productName;
                        $.ajax({
                            url: "/delete/products",
                            method: "POST",
                            data: {
                                token: window.localStorage.getItem("authToken"),
                                name: value
                            },
                            success: function(result) {
                                if (result.body.success) {
                                    // var div = $("<div class='card-panel green'>Product Deleted successfully</div>");
                                    // $(".info").append(div);
                                    $("#products-row").html("");
                                    console.log("anc");
                                    getProducts();
                                } else {
                                    var div = $(
                                        "<div class='card-panel red'>Error in Deleting the Product</div>"
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
                    }

                    function deleteRecipe(recipeName){
                        var value = recipeName;

                        $.ajax({
                            url: "/delete/recipe",
                            method: "POST",
                            data: {
                                token: window.localStorage.getItem("authToken"),
                                name: value
                            },
                            success: function(result){
                                if(result.body.success){
                                    $("#recipes-row").html("");
                                    getRecipes();
                                } else {
                                    var div = $("<div class='card-panel red'>Error in Deleting the Recipe</div>");
                                    $(".info").append(div);
                                }
                            },
                            error: function(err){
                                var div = $("<div class='card-panel red'>Either the Server is Down or Your Internet</div>");
                                $(".info").append(div);
                            }
                        });
                    }

                    console.log(result.body.result);
                    M.toast({ html: "Welcome " + result.body.result });
                    $(".clickMe").click(function(e) {
                        window.location.href = $(e.target).attr("data-url");
                    });

                    function getProducts() {
                        $.ajax({
                            url: "/get/all/products",
                            method: "POST",
                            success: function(result) {
                                if (result.body.success) {
                                    $(".loader").css("display", "none");
                                    $(".main").css("display", "block");
                                    $(".errors").css("display", "none");
                                    var products = result.body.result;

                                    products.forEach(product => {
                                        $("#products-row").append(
                                            "<div class='col s12 m4'><div class='card blue-grey darken-1'><div class='card-content white-text'> <span class='card-title'>" +
                                                product.name +
                                                "</span><p>" +
                                                product.description.substr(
                                                    0,
                                                    20
                                                ) +
                                                "</p></div> <div class='card-action'><a href='#' id='" +
                                                product.productId +
                                                "anc'>Delete</a><a href='../update/product/" +
                                                product.productId +
                                                "'>Update</a></div></div></div>"
                                        );

                                        $("#" + product.productId + "anc").on(
                                            "click",
                                            function() {
                                                $(".modal-content > h4").html(
                                                    product.name
                                                );
                                                // $(".agree-btn").attr("id" , product.productId +"agree");
                                                $("#modal1")
                                                    .modal()
                                                    .modal("open");
                                                console.log("anc");
                                            }
                                        );
                                    });
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

                    function getRecipes() {
                        $.ajax({
                            url: "/get/all/recipe",
                            method: "POST",
                            success: function(result) {
                                if (result.body.success) {
                                    $(".loader").css("display", "none");
                                    $(".main").css("display", "block");
                                    $(".errors").css("display", "none");
                                    var recipes = result.body.result;

                                    recipes.forEach(recipe => {
                                        $("#recipes-row").append(
                                            "<div class='col s12 m4'><div class='card blue-grey darken-1'><div class='card-content white-text'> <span class='card-title'>" +
                                                recipe.name +
                                                "</span><p>" +
                                                recipe.description.substr(
                                                    0,
                                                    20
                                                ) +
                                                "</p></div> <div class='card-action'><a href='#' id='" +
                                                recipe.id +
                                                "anc'>Delete</a><a href='../update/recipe/" +
                                                recipe.id +
                                                "'>Update</a></div></div></div>"
                                        );

                                        $("#" + recipe.id + "anc").on(
                                            "click",
                                            function() {
                                                $(".modal-content > h4").html(
                                                    recipe.name
                                                );
                                                // $(".agree-btn").attr("id" , product.productId +"agree");
                                                $("#modal2")
                                                    .modal()
                                                    .modal("open");
                                                console.log("anc");
                                            }
                                        );
                                    });
                                } else {
                                    console.log("incorrect");
                                }
                            },
                            error: function(err) {
                                console.log("error can't make the request");
                            }
                        });
                    }
                    getRecipes();
                } else {
                    window.localStorage.removeItem("authToken");
                    $(".loader").css("display", "none");
                    $(".main").css("display", "none");
                    $(".errors").css("display", "block");
                }
            },
            error: function(err) {
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
