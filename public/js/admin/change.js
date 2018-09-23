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
                                    token: window.localStorage.getItem("authToken")
                                },
                                success: function(result){
                                    if(result.body.success){
                                        window.localStorage.setItem("authToken", result.body.token);
                                        var div = $("<div class='card-panel green'>"+result.body.result+" User Updated Successfully</div>");
                                        $(".info").append(div);
                                    } else {
                                        var div = $("<div class='card-panel red'>Error in Updating the User</div>");
                                        $(".info").append(div);
                                    }
                                },
                                error: function(err){
                                    var div = $("<div class='card-panel red'>Either the Server is Down or Your Internet</div>");
                                    $(".info").append(div);
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