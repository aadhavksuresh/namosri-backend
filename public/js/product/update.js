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

                    $('#productUpdate').submit(function(e){
                        e.preventDefault();
                        var oldName = $("#oldName").val();
                        var newName = $("#newName").val();
                        var newDescription = $("#newDescription").val();
                        var newPosition = $("#newPosition").val();

                        $.ajax({
                            url: '/update/products',
                            method: "POST",
                            data: {
                                oldName: oldName,
                                newName: newName,
                                newDescription: newDescription,
                                newPosition: newPosition,
                                token: window.sessionStorage.getItem("authToken")
                            },
                            success: function(result){
                                if(result.body.success){
                                    var div = $("<div>product modified</div>");
                                    $("body").append(div);
                                } else {
                                    var div = $("<div>error in response</div>");
                                    $("body").append(div);
                                }
                            }, 
                            error: function(err){  
                                var div = $("<div>errors while making ajax request</div>");
                                $("body").append(div);
                            }
                        });
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