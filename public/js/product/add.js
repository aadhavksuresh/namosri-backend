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

                    $("#productForm").submit(function(e){
                        e.preventDefault();
                        var name = $("#name").val();
                        var description = $("#description").val();
                        var position = $("#position").val();

                        $.ajax({
                            url: "/add/products",
                            method: "POST",
                            data: {
                                name: name,
                                description: description,
                                position: position,
                                token: window.sessionStorage.getItem("authToken")
                            },
                            success: function(result){
                                if(result.body.success){
                                    var div = $("<div>"+result.body.result.name+" added successfully</div>");
                                    $("body").append(div);
                                } else {
                                    if(result.header.code == 807){
                                        var div = $("<div>A Product already exists at that position</div>");
                                        $('body').append(div);
                                    } else {
                                        var div = $("<div>Some error occured</div>");
                                        $('body').append(div);
                                    }
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