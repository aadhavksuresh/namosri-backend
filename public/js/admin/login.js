$(document).ready(function(){
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
                    window.sessionStorage.setItem("authToken", result.body.token);
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
    })
});