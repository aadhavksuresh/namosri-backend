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
                    window.location.href = '/user';
                } else {
                    window.localStorage.removeItem("authToken");
                    $('.loader').css("display", "none");
                    $('.main').css("display", "block");
                    loginForm();
                }
            },
            error: function(err){
                window.localStorage.removeItem("authToken");
                $('.loader').css("display", "none");
                $('.main').css("display", "block");
                loginForm();
            }            
        })
    } else {
        $('.loader').css("display", "none");
        $('.main').css("display", "block");
        loginForm();
    }

    function loginForm(){
        $("#loginForm").submit(function(e){
            let Username = $("#username").val();
            let Password = $("#password").val();
        
            e.preventDefault();
            $.ajax({
                url: "/user/login",
                method: "POST",
                headers:{
                    'Authorization': "Bearer " + btoa(Username+":"+Password) 
                },
                success: function(result){
                    if(result.body.success){
                        window.localStorage.setItem("authToken", result.body.token);
                        console.log("yeep");
                        window.location.href = '/user';
                    } else {
                        console.log("error");
                        window.location.href = '/user/login?invalid=true'
                    }
                },
                error: function(err){
                    var div = $("<div>Server not responding</div>");
                    $('body').append(div);
                }
            });
        });
    }
});