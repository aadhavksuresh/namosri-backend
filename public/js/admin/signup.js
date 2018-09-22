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

                    $("#signupForm").submit(function(e){
                        e.preventDefault();
                        var Username = $("#username").val();
                        var Password = $("#password").val();
                        var VerifyPassword = $("#verifyPassword").val();
                
                        if(Password != VerifyPassword){
                            var div = $("<div>enter same password</div>");
                            $('body').append(div);
                        } else {
                            $.ajax({
                                url: "/user/signup",
                                method: "POST",
                                data: {
                                    username: Username,
                                    password: Password,
                                    verifyPassword: VerifyPassword,
                                    token: window.localStorage.getItem('authToken')
                                },
                                success: function(result){
                                    if(result.body.success){
                                        var div = $("<div>"+result.body.user+" added successfully </div>");
                                        $('body').append(div);
                                    } else {
                                        var div = $("<div>Error in adding the user</div>");
                                        $('body').append(div);
                                    }
                                },
                                error: function(err){
                                    var div = $("<div>server not responding</div>");
                                        $('body').append(div);
                                }
                            })
                        }
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