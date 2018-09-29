$(document).ready(function() {
    // let modal=new M.Modal($("#modal1"));
    if (window.localStorage.getItem("authToken")) {

        $.ajax({
            url: "/user/verifier",
            method: "POST",
            data: {
                token: window.localStorage.getItem("authToken")
            },
            success: function(result) {
                if (result.body.success) {
                    $(".agree-btn").on("click", function() {
                        deleteDistributos($(".distributor-content > h4").html());
                    });

                    function deleteDistributos(distributorName) {
                        var value = distributorName;
                        $.ajax({
                            url: "/delete/distributor",
                            method: "POST",
                            data: {
                                token: window.localStorage.getItem("authToken"),
                                name: value
                            },
                            success: function(result) {
                                if (result.body.success) {
                                    $("#distributors-row").html("");
                                    getDistributors();
                                } else {
                                    var div = $(
                                        "<div class='card-panel red'>Error in Deleting the Distributor</div>"
                                    );
                                    $(".info").append(div);
                                }
                            },
                            error: function(err) {
                                var div = $(
                                    "<div class='card-panel red'>Either the Server is Down or Your Internet</div>"
                                );
                                $(".info").append(div);
                            }
                        });
                    }

                    function getDistributors() {
                        $.ajax({
                            url: "/get/all/distributors",
                            method: "POST",
                            success: function(result) {
                                console.log(result);
                                if (result.body.success) {
                                    $(".loader").css("display", "none");
                                    $(".main").css("display", "block");
                                    $(".errors").css("display", "none");
                                    var distributors = result.body.result;

                                    distributors.forEach(distributor => {
                                        
                                        // productObj[product.productId] = product.name;

                                        $("#distributors-row").append(
                                            "<div class='col s12 m4'><div class='card blue-grey darken-1'><div class='card-content white-text'> <span class='card-title'>" +
                                                distributor.nameOfFirm +
                                                "</span></div> <div class='card-action'><a href='#' id='distributor" +
                                                distributor.id +
                                                "'>Delete</a><a id="+distributor.id+">See</a></div>"
                                        );

                                        $("#"+distributor.id).click(function(){
                                            window.location.href = '/get/one/distributor/'+distributor.id;
                                        });

                                        $("#distributor" + distributor.id).on(
                                            "click",
                                            function() {
                                                $(".distributor-content > h4").html(
                                                    distributor.nameOfFirm
                                                );
                                                // $(".agree-btn").attr("id" , product.productId +"agree");
                                                $("#modal1")
                                                    .modal()
                                                    .modal("open");
                                                console.log("anc");
                                            }
                                        );
                                    });
                                } else {
                                    console.log("incorrect");
                                }
                            },
                            error: function(err) {
                                console.log("error can't make the request");
                            }
                        });
                    }
                    getDistributors();

                } else {
                    window.localStorage.removeItem("authToken");
                    $(".loader").css("display", "none");
                    $(".main").css("display", "none");
                    $(".errors").css("display", "block");
                }
            },
            error: function(err) {
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
