$(document).ready(function(){
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
                    token: window.sessionStorage.getItem('authToken')
                },
                success: function(result){
                    if(result.body.success){
                        var div = $("<div>"+result.body.user+" added successfully </div>");
                        $('body').append(div);
                    } else {
                        console.log("error in adding the user");
                    }
                },
                error: function(err){
                    console.log("error in ajax");
                }
            })
        }
    });
});