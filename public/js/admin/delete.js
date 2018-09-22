$(document).ready(function(){
    
});

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

                    function getUsers(){
                        $.ajax({
                            url: "/user/getAll",
                            method: "POST",
                            data: {
                                token: window.localStorage.getItem("authToken")
                            },
                            success: function(result){
                                if(result.body.success){
                                    if($("#userName").length == 0){
                                        var selectTag = $("<select></select>");
                                        selectTag.attr("id", "userName");
                                        var options = $('<option value="0">Choose Which User to Delete</option>');
                                        selectTag.append(options);
                                        for(var i=0;i<result.body.result.length;i++){
                                            var options = $("<option></option>");
                                            options.attr("value", result.body.result[i]);
                                            options.text(result.body.result[i]);
                                            $(selectTag).append(options);
                                        }
                                        $("#userDelete").append(selectTag);
                                        $("#userDelete").append($('<input class="waves-effect waves-light btn" type="submit" value="Delete User">'));
                                        $("#userDelete").css("display", "block");
                                        $("#userName").formSelect();
                                    } else {
                                        $("#userDelete").empty();
                                        getUsers();
                                    }
                                } else {
                                    console.log("incorrect");
                                }
                            },
                            error: function(err){
                                console.log("error can't make the request");
                            }
                        });
                    }
                
                    getUsers();
                
                    $("#userDelete").submit(function(e){
                        e.preventDefault();
                        var value = $("#userName").val();
                        if(value == 0 || !value){
                            console.log("Enter Valid Option");
                        } else {
                            $.ajax({
                                url: "/user/delete",
                                method: "POST",
                                data: {
                                    username: value,
                                    token: window.localStorage.getItem("authToken")
                                },
                                success: function(result){
                                    if(result.body.success){
                                        getUsers();
                                    } else {   
                                        $("#userDelete").css("display", "none");
                                        console.log("wow");
                                    }
                                },
                                error: function(err){
                                    console.log("can't make ajax request");
                                }
                            });
                        }
                    })
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