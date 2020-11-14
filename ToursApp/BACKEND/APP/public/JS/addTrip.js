$(document).ready(function(){
    $("#msg").hide();
    $("#addTrip_form").on("submit",function(e){
        e.preventDefault();
        let trip_name = $("#trip_name").val();
        let trip_price = $("#trip_price").val();
        let trip_description = $("#trip_description").val();
        if(trip_name == '' || trip_price == '' || trip_description == '')
        {
            $("#msg").html("All fields are neccessary").show();
        }
        else
        {
            let data = new FormData(this);
            $.ajax({
                url:"http://localhost/projects/TripsApp/API/addTrip.php",
                type:"POST",
                data:data,
                dataType:"JSON",
                processData:false,
                contentType:false,
                beforesend:function(){
                    $("#msg").html("Loading ...").show();
                },
                success:function(data){
                    console.log(data);
                    if(data.flg == 1)
                    {
                        $(this).trigger("reset");
                        $("#msg").html("Trip added successfully").show();
                        setTimeout(function(){
                            window.location.assign("./homepage.php");
                        },3000);
                    }
                    else if(data.flg == -1)
                    {
                        $(this).trigger("reset");
                        $("#msg").html("Enough data not Provided").show();
                    }
                    else if(data.flg == -2)
                    {
                        $("#msg").html("Error connecting ..").show();
                    }
                    else if(data.flg == -3)
                    {
                        $("#msg").html("Internal Server Error").show();
                    }
                    else if(data.flg == -4)
                    {
                        $("#image").val("");
                        $("#msg").html("Please Upload an image File").show();
                    }
                    else if(data.flg == -5)
                    {
                        $("#image").val("");
                        $("#msg").html("Size should be less than 5 MB").show();
                    }
                    else if(data.flg == -6)
                    {
                        $(this).trigger("reset");
                        $("#msg").html("There was an Error while uploading the image").show();
                    }
                }
            });
        }
        setTimeout(function(){
            $("#msg").html("").hide();
        },2500);
    });
});