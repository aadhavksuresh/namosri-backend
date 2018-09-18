$(document).ready(function(){
    $('#loginForm').submit(function(e){
        const USERNAME = $('#username').val();
        const PASSWORD = $('#password').val();

        e.preventDefault();
        $.ajax({
            url: '/user/login',
            headers: {
                "Authorization": "Basic " + btoa(USERNAME + ":" + PASSWORD)
            },
            type: 'POST',
            success: function(response){
                if(response.body.success){
                    window.sessionStorage.setItem('authToken', response.body.token);
                    post('/user', {token: window.sessionStorage.getItem('authToken')});
                } else {
                    console.log("request unsuccessfull");
                }
            }
        })
    });
});