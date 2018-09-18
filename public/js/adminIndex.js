$(document).ready(function(){
    $('#addUser').click(function(){
        post('/user/addUser', {token: window.sessionStorage.getItem('authToken')});
    });
});