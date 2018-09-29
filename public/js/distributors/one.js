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
                    function getDistributor() {
                        $.ajax({
                            url: "/get/one/distributor",
                            method: "POST",
                            data: {
                                id: $("#did").html().trim()
                            },
                            success: function(result) {
                                console.log(result);
                                if (result.body.success) {
                                    distributor = result.body.result;

                                    $("#nameOfFirm").html(
                                        distributor.nameOfFirm
                                    );
                                    $("#background").html(
                                        distributor.background
                                    );
                                    $("#address").html(
                                        distributor.address
                                    );
                                    $("#city").html(
                                        distributor.city
                                    );
                                    $("#infrastructure").html(
                                        distributor.infrastructure
                                    );
                                    $("#state").html(
                                        distributor.state
                                    );
                                    $("#pin").html(
                                        distributor.pin
                                    );
                                    $("#infrastructure1").html(
                                        distributor.infrastructure1
                                    );
                                    $("#telephoneNumber").html(
                                        distributor.telephoneNumber
                                    );
                                    $("#mobileNumber").html(
                                        distributor.mobileNumber
                                    );
                                    $("#faxNumber").html(
                                        distributor.faxNumber
                                    );
                                    $("#emailId").html(
                                        distributor.emailId
                                    );
                                    $("#yearOfEstabilshment").html(
                                        distributor.yearOfEstabilshment
                                    );
                                    $("#businessType").html(
                                        distributor.businessType
                                    );
                                    $("#annualSales").html(
                                        distributor.annualSales
                                    );
                                    $("#capacityToInvest").html(
                                        distributor.capacityToInvest
                                    );
                                    $("#keyPerson").html(
                                        distributor.keyPerson
                                    );
                                    $("#name").html(
                                        distributor.name
                                    );
                                    $("#existingManpower").html(
                                        distributor.existingManpower
                                    );
                                    $("#age").html(
                                        distributor.age
                                    );
                                    $("#qualification").html(
                                        distributor.qualification
                                    );
                                    $("#propose").html(
                                        distributor.propose
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
                    getDistributor();
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
