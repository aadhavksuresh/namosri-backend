$(document).ready(function() {
    if (window.localStorage.getItem("authToken")) {
        $.ajax({
            url: "/user/verifier",
            method: "POST",
            data: {
                token: window.localStorage.getItem("authToken")
            },
            success: function(result) {
                if (result.body.success) {
                    function getGetInTouch() {
                        $.ajax({
                            url: "/get/one/getInTouch",
                            method: "POST",
                            data: {
                                id: $("#gid")
                                    .html()
                                    .trim()
                            },
                            success: function(result) {
                                console.log(result);
                                if (result.body.success) {
                                    getInTouch = result.body.result;

                                    $("#title").html(getInTouch.title);
                                    $("#fName").html(getInTouch.fName);
                                    $("#lName").html(getInTouch.lName);
                                    $("#company").html(getInTouch.company);
                                    $("#designation").html(
                                        getInTouch.designation
                                    );
                                    $("#mobile").html(getInTouch.mobile);
                                    $("#typeOfBusiness").html(
                                        getInTouch.typeOfBusiness
                                    );
                                    $("#address").html(getInTouch.address);
                                    $("#yourMessage").html(
                                        getInTouch.yourMessage
                                    );
                                } else {
                                    console.log("can't fetch the recipe");
                                }
                            },
                            error: function(err) {
                                console.log("error can't make the request");
                            }
                        });
                    }
                    getGetInTouch();
                    $(".loader").css("display", "none");
                    $(".main").css("display", "block");
                    $(".errors").css("display", "none");
                } else {
                    window.localStorage.removeItem("authToken");
                    $(".loader").css("display", "none");
                    $(".main").css("display", "none");
                    $(".errors").css("display", "block");
                }
            },
            error: function(err) {
                window.localStorage.removeItem("authToken");
                $(".errors").text(
                    "Either the Server is down or Check Your internet connectivity"
                );
                $(".loader").css("display", "none");
                $(".main").css("display", "none");
                $(".errors").css("display", "block");
            }
        });
    } else {
        $(".loader").css("display", "none");
        $(".main").css("display", "none");
        $(".errors").css("display", "block");
    }
});
