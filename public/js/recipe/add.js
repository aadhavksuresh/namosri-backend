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

                    $("#recipeForm").submit(function(e){
                        e.preventDefault();
                        var name = $("#name").val();
                        var description = $("#description").val();

                        $.ajax({
                            url: "/add/recipe",
                            method: "POST",
                            data: {
                                name: name,
                                description: description,
                                token: window.sessionStorage.getItem("authToken")
                            },
                            success: function(result){
                                if(result.body.success){
                                    console.log(result);
                                    var div = $("<div>"+result.body.result+" added successfully</div>");
                                    $("body").append(div);
                                } else {
                                    var div = $("<div>Some error occured added successfully</div>");
                                    $("body").append(div);
                                }
                            },
                            error: function(err){
                                var div = $("<div>Server down</div>");
                                $('body').append(div);
                            }
                        })

                    })
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