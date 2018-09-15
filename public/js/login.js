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
                    console.log("fuck off");
                }
            }
        })
    });

    function post(path, parameters) {
        var form = $('<form></form>');
    
        form.attr("method", "post");
        form.attr("action", path);
    
        $.each(parameters, function(key, value) {
            var field = $('<input></input>');
    
            field.attr("type", "hidden");
            field.attr("name", key);
            field.attr("value", value);
    
            form.append(field);
        });
    
        // The form needs to be a part of the document in
        // order for us to be able to submit it.
        $(document.body).append(form);
        form.submit();
    }
});