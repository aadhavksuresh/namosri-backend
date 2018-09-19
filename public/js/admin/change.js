$(document).ready(function(){
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
                        window.location.href="/user?content="+result.body.token;
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
});