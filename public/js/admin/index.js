$(document).ready(function() {
    $(".collapsible").collapsible();
    // $(".collapsible").css("position" , "fixedw");


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
                        deleteProduct($(".product-content > h4").html());
                    });

                    $(".recipe-agree-btn").click(function(){
                        deleteRecipe($(".recipe-content > h4").html());
                    });

                    $(".instruction-agree-btn").click(function(){
                        deleteInstruction($(".instructionId").text());
                    });

                    $(".clickMe").click(function(e) {
                        window.location.href = $(e.target).attr("data-url");
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
                    M.toast({ html: "Welcome " + result.body.result });
                    
                    function deleteInstruction(instructionId){
                        $.ajax({
                            url: "/delete/instruction",
                            method: "POST",
                            data: {
                                token: window.localStorage.getItem("authToken"),
                                id: instructionId
                            },
                            success: function(result){
                                if(result.body.success){
                                    $("#instructions-row").html("");
                                    getInstructions();
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


                    var productObj = {};
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

                                    if(products.length > 0){
                                        $("#products-row").append("<h3>Products</h3>");
                                    }

                                    products.forEach(product => {
                                        
                                        productObj[product.productId] = product.name;

                                        $("#products-row").append(
                                            "<div class='col s12 m4'><div class='card blue-grey darken-1'><div class='card-content white-text'> <span class='card-title'>" +
                                                product.name +
                                                "</span><p>" +
                                                product.description.substr(
                                                    0,
                                                    20
                                                ) +
                                                "</p></div> <div class='card-action'><a href='javascript:void(0)' id='product" +
                                                product.productId +
                                                "'>Delete</a><a href='../update/product/" +
                                                product.productId +
                                                "'>Update</a></div></div></div>"
                                        );

                                        $("#product" + product.productId).on(
                                            "click",
                                            function() {
                                                $(".product-content > h4").html(
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

                                    if(recipes.length > 0){
                                        $("#recipes-row").append("<h3>Recipes</h3>");
                                    }

                                    recipes.forEach(recipe => {
                                        $("#recipes-row").append(
                                            "<div class='col s12 m4'><div class='card blue-grey darken-1'><div class='card-content white-text'> <span class='card-title'>" +
                                                recipe.name +
                                                "</span><p>" +
                                                recipe.description.substr(
                                                    0,
                                                    20
                                                ) +
                                                "</p></div> <div class='card-action'><a href='javascript:void(0)' id='recipe" +
                                                recipe.id +
                                                "'>Delete</a><a href='../update/recipe/" +
                                                recipe.id +
                                                "'>Update</a></div></div></div>"
                                        );

                                        $("#recipe" + recipe.id).on(
                                            "click",
                                            function() {
                                                $(".recipe-content > h4").html(
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

                    function getInstructions() {
                        $.ajax({
                            url: "/get/all/instruction",
                            method: "POST",
                            success: function(result) {
                                if (result.body.success) {
                                    $(".loader").css("display", "none");
                                    $(".main").css("display", "block");
                                    $(".errors").css("display", "none");
                                    var instructions = result.body.result;

                                    if(instructions.length > 0){
                                        $("#instructions-row").append("<h3>Instructions</h3>");
                                    }

                                    instructions.forEach(instruction => {
                                        $("#instructions-row").append(
                                            "<div class='col s12 m4'><div class='card blue-grey darken-1'><div class='card-content white-text'> <span class='card-title'>" +
                                                productObj[instruction.productId] +
                                                "</span><p>" +
                                                instruction.description.substr(
                                                    0,
                                                    20
                                                ) +
                                                "</p></div> <div class='card-action'><a href='javascript:void(0)' id='instruction" +
                                                instruction.id +
                                                "'>Delete</a><a href='../update/instruction/" +
                                                instruction.id +
                                                "'>Update</a></div></div></div>"
                                        );

                                        $("#instruction" + instruction.id).on(
                                            "click",
                                            function() {
                                                $(".instruction-content > h4").html(
                                                    productObj[instruction.productId]
                                                );
                                                $(".instructionId").text(instruction.id);
                                                
                                                $("#modal3").modal().modal("open");
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
                    getInstructions();
                    function getRequests() {
                        $.ajax({
                            url: "/get/all/requests",
                            method: "POST",
                            data: { 
                                    token: window.localStorage.getItem("authToken")
                                },
                            success: function(result) {
                                if (result.body.success) {
                                    $(".loader").css("display", "none");
                                    $(".main").css("display", "block");
                                    $(".errors").css("display", "none");
                                    var requests = result.body.result;

                                    if(requests.length > 0){
                                        $("#request-row").append("<h3>Requests</h3>");
                                    }

                                    requests.forEach(request => {
                                        $("#request-row").append(
                                            "<div class='col s12 m4'><div class='card blue-grey darken-1'><div class='card-content white-text'> <span class='card-title'>" +
                                                productObj[request.productId] +
                                                "</span><h5>"+request.name.substr(0,10)  +"<br>" + request.mobile+"<h5><p>" +
                                                request.address.substr(
                                                    0,
                                                    20
                                                ) +
                                                "</p></div> <div class='card-action'><a href='/request/"+request.id+"' id='request" +
                                                request.id +
                                                "'>Send</a></div></div></div>"
                                        );
                                        if(request.served){
                                            $('#request' + request.id).html("Sent");
                                            // $('#request' + request.id).css("disabled" , "");
                                        }
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
                    getRequests()
                   

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
