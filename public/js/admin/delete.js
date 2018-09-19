$(document).ready(function(){
    function getUsers(){
        $.ajax({
            url: "/user/getAll",
            method: "POST",
            data: {
                token: window.sessionStorage.getItem("authToken")
            },
            success: function(result){
                if(result.body.success){
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
                            $("#userDelete").append($('<input type="submit" value="Delete User">'));
                            $("#userDelete").css("display", "block");
                            $("#userName").formSelect();
                        } else {
                            $("#userDelete").empty();
                            getUsers();
                        }
                    } else {
                        console.log("incorrect");
                    }
                } else {
                    console.log(err);
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
        if(value == 0){
            console.log("Enter Valid Option");
        } else {
            $.ajax({
                url: "/user/delete",
                method: "POST",
                data: {
                    username: value,
                    token: window.sessionStorage.getItem("authToken")
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
});