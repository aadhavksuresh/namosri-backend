$(document).ready(function(){
    $('button').click(function(e){
        window.location.href = $(e.target).attr('data-url')+"?content="+window.sessionStorage.getItem('authToken');
    });
});