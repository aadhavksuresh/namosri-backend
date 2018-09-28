$(document).ready(function(){
    if(window.localStorage.getItem("authToken")){
        $.ajax({
            url: '/user/verifier',
            method: "POST",
            data: {
                token: window.localStorage.getItem('authToken')
            },
            success: function(result){
                console.log(result);
                if(result.body.success){
                    $('.loader').css("display", "none");
                    $('.main').css("display", "block");
                    $('.errors').css("display", "none");

                    $("#send").on('click' , function() {
                        $.ajax({
                            url: '/request/send',
                            method: "POST",
                            data: {
                                token: window.localStorage.getItem('authToken'),
                                id : $("#requestId").html()
                            },
                            success: function(result){
                                if(result.body.success){
                                    console.log("king");
                                    $("#send").text("Sent");
                                    $("#send").css("pointer-events", "none");
                                }
                            },
                            error: function(err){
                                console.log("Cant make request");
                            }            
                        })
                    });
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