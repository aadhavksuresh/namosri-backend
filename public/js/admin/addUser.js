$(document).ready(function(){
    $('#addUserForm').submit(function(){
        const USERNAME = $('#username').val();
        const PASSWORD = $('#password').val();

        e.preventDefault();
        $.ajax({
            url: '/user/signup',
            headers: {
                "Authorization": "Basic " + btoa(USERNAME + ":" + PASSWORD)
            },
            data: {
                token: window.sessionStorage.getItem('authToken');
            },
            type: 'POST',
            success: function(response){
                if(response.body.success){

                } else {
                    console.log("request unsuccessfull");
                }
            }
        })
    });
});