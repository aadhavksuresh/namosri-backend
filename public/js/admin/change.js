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

                    $('#changeForm').submit(function(e){
                        e.preventDefault();
                        var oldUsername = $("#oldUsername").val();
                        var newUsername = $("#newUsername").val();
                        var oldPassword = $("#oldPassword").val();
                        var newPassword = $("#newPassword").val();
                        var retypedPassword = $("#retypedPassword").val();
                
                        if(newPassword != retypedPassword){
                            alert("enter same passwords");
                        } else {
                            $.ajax({
                                url: '/user/changeInfo',
                                method: "POST",
                                data: {
                                    oldUsername: oldUsername,
                                    newUsername: newUsername,
                                    oldPassword: oldPassword,
                                    newPassword: newPassword,
                                    retypedPassword: retypedPassword,
                                    token: window.sessionStorage.getItem("authToken")
                                },
                                success: function(result){
                                    if(result.body.success){
                                        // div.text(result.body.result+" modified in the database");
                                        window.sessionStorage.setItem("authToken", result.body.token);
                                        window.location.href="/user";
                                        // $('body').append(div);
                                    } else {
                                        console.log(result);
                                    }
                                },
                                error: function(err){
                                    console.log("error");
                                }
                            })
                        }
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