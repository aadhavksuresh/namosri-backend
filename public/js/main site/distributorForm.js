$("document").ready(function(){
    console.log("yeepee");
    $(".distributorForm").submit(function(e){
        e.preventDefault();
        var nameOfFirm = $("#newtf1").val();
        var background = $("#newtf2").val();
        var address = $("#newtf3").val();
        var city = $("#newtf4").val();
        var infrastructure = $("#newtf5").val();
        var state = $("#newtf6").val();
        var pin = $("#newtf7").val();
        var infrastructure1 = $("#newtf8").val();
        var telephoneNumber = $("#newtf9").val();
        var mobileNumber = $("#newtf10").val();
        var faxNumber = $("#newtf11").val();
        var emailId = $("#newtf12").val();
        var yearOfEstabilshment = $("#newtf13").val();
        var businessType = $("#newtf14").val();
        var annualSales = $("#newtf15").val();
        var capacityToInvest = $("#newtf16").val();
        var keyPerson = $("#newtf17").val();
        var name = $("#newtf18").val();
        var existingManpower = $("#newtf19").val();
        var age = $("#newtf20").val();
        var qualification = $("#newtf21").val();
        var propose = $("#newtf22").val();

        $.ajax({
            url: '/add/dis',
            method: "post",
            data: {
                nameOfFirm: nameOfFirm,
                background: background,
                address: address,
                city: city,
                infrastructure: infrastructure,
                state: state,
                pin: pin,
                infrastructure1: infrastructure1,
                telephoneNumber: telephoneNumber,
                mobileNumber: mobileNumber,
                faxNumber: faxNumber,
                emailId: emailId,
                yearOfEstabilshment: yearOfEstabilshment,
                businessType: businessType,
                annualSales: annualSales,
                capacityToInvest: capacityToInvest,
                keyPerson: keyPerson,
                name: name,
                existingManpower: existingManpower,
                age: age,
                qualification: qualification,
                propose: propose,
            },
            success: function(result){
                console.log(result);
                if(result.body.success){
                    $(".modal-body").html("Application Submitted Successfully");
                    $('#exampleModal').modal();
                }else {
                    $(".modal-body").html("Some Error in Submitting Application");
                    $('#exampleModal').modal();
                }
            },
            error: function(err){
                $(".modal-body").html("Some Error in Submitting Application");
                $('#exampleModal').modal();
            }
        });
      
    });
});