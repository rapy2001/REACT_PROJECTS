$(document).ready(function(){
    let trips = [];
    $("#msg").hide();
    $("#update_form_div").hide();
    function loadTrips(page_num)
    {
        let obj = {page_num};
        let data = JSON.stringify(obj);
        $.ajax({
            url:"http://localhost/projects/TripsApp/API/getTrips.php",
            type:"POST",
            data:data,
            beforesend:function(){
                $("#msg").html("Loading ...").show();
            },
            success:function(data){
                console.log(data);
                if(data.flg == 1)
                {
                    
                    if(data.trips.length > 0)
                    {
                        trips = data.trips;
                        $.each(data.trips,function(key,trip){
                            $("#viewTrips_container").append(
                                "<div class = 'trip_card' id = 'trip_card_" + trip.trip_id + "' data-id = '" + trip.trip_id + "'>" +
                                    "<div class = 'trip_card_img_box'>" +
                                        "<img src = '" + trip.trip_image + "' alt = 'error'/>" +
                                    "</div>" +
                                    "<div class = 'trip_card_content_box'>" +
                                        "<div class = 'trip_card_title_price_box'>" +
                                            "<h3 id = 'trip_name_" + trip.trip_id + "'>" + trip.trip_name + "</h3>" +
                                            "<h4 id = 'trip_price_" + trip.trip_id + "'>$ " +trip.trip_price+ "</h4>" +
                                        "</div>" +
                                        "<div id = 'trip_card_description_box_" + trip.trip_id + "' class = 'trip_card_description_box'>" +
                                            "<p id = 'trip_description_" + trip.trip_id + "'>" + trip.trip_description.substring(0,200) +" ...</p>" +
                                            "<button id = 'read_more_btn' data-id = '" + trip.trip_id + "'" + ">Read More</button>" +
                                        "</div>" +
                                        "<div class = 'trip_card_int_btn_box'>" +
                                            "<button id = 'not_btn' data-id = '" + trip.trip_id + "'>Not Interested</button>" +
                                        "</div>" +
                                        "<div class = 'trip_card_upd_dlt_box'>" +
                                            "<button id = 'update_btn' data-upd_id = '" + trip.trip_id + "'>Update</button>" +
                                            "<button id = 'delete_btn' data-dlt_id = '" + trip.trip_id + "'>Delete</button>" +
                                        "</div>" +
                                    "</div>" +
                                "</div>" 
                            );
                        });
                        $("#viewTrips_container").append("<button id = 'loadMore_btn' data-page_num = '" + data.pageNum + "'>Load More</button>")
                    }
                    else
                    {
                        $("#loadMore_btn").remove();
                        $("#viewTrips_container").append("<h4>No More Trips</h4>");
                    }
                }
            }
        });
    }
    loadTrips(1);


    $(document).on("click","#loadMore_btn",function(){
        // alert("hello");
        let num = $(this).data("page_num");
        loadTrips(num);
    });

    function getTripData(tripId)
    {
        let obj = {tripId};
        let data = JSON.stringify(obj);
        $.ajax({
            url:"http://localhost/projects/TripsApp/API/getTrip.php",
            type:"POST",
            data:data,
            dataType:"JSON",
            beforesend:function(){
                $("#msg").html("Loading trip data ...").show();
            },
            success:function(data){
                if(data.flg == 1)
                {
                    $("#msg").hide();
                    $("#trip_name").val(data.tripData.trip_name);
                    $("#trip_price").val(data.tripData.trip_price);
                    $("#trip_description").val(data.tripData.trip_description);
                    $("#update_form").append("<input type = 'hidden' id = 'trip_id' value = '" + data.tripData.trip_id + "'/>");
                }
                else if(data.flg == -1)
                {
                    $("#msg").html("Enough data not provided").show();
                }
                else if(data.flg == -2)
                {
                    $("#msg").html("Error while connecting").show();
                }
                else if(data.flg == -3)
                {
                    $("#msg").html("Internal Server Error").show();
                }
            }
        });
        setTimeout(function(){
            $("#msg").hide();
        },2500);
    }


    $(document).on("click","#update_btn",function(){
        $("#update_form_div").show();
        let tripId = $(this).data('upd_id');
        getTripData(tripId);
    });

    $("#update_form").on("submit",function(e){
        e.preventDefault();
        let tripId = $("#trip_id").val();
        let tripName = $("#trip_name").val();
        let tripPrice = $("#trip_price").val();
        let tripDescription = $("#trip_description").val();
        if(tripName == '' || tripPrice == '' || tripDescription == '')
        {
            $("#msg").html("All fields are required").show();
        }
        else
        {
            let obj = {tripId,tripName,tripPrice,tripDescription};
            let data = JSON.stringify(obj);
            $.ajax({
                url:"http://localhost/projects/TripsApp/API/updateTrip.php",
                data:data,
                type:"POST",
                dataType:"JSON",
                beforesend:function(){
                    $("#msg").html("Loading ...").show();
                },
                success:function(data){
                    if(data.flg == 1)
                    {
                        $("#msg").html("Trip Updated Successfully").show();
                        $(this).trigger("reset");
                        $("#update_form_div").hide();
                        $("#trip_name_" + tripId).html(tripName);
                        $("#trip_card_description_box_" + tripId).html(
                            "<p id = 'trip_description_" + trip_id + "'>" + tripDescription.substring(0,200) +" ...</p>" +
                            "<button id = 'read_more_btn' data-id = '" + trip_id + "'" + ">Read More</button>"
                        );
                        $("#trip_price_" + tripId).html("$ " + tripPrice);
                        $("#update_form_div").hide();
                    }
                    else if(data.flg == -1)
                    {
                        $("#msg").html("Enough data not provided").show();
                    }
                    else if(data.flg == -2)
                    {
                        $("#msg").html("Error connecting ...").show();
                    }
                    else if(data.flg == -3)
                    {
                        $("#msg").html("Error while Updating").show();
                    }
                }
            });
        }
        setTimeout(function(){
            $("#msg").hide();
        },2500);
    });

    $(document).on("click","#delete_btn",function(){
        let tripId = $(this).data("dlt_id");
        let obj = {tripId};
        let data = JSON.stringify(obj);
        $.ajax({
            url:"http://localhost/projects/TripsApp/API/deleteTrip.php",
            type:"POST",
            data:data,
            dataType:"JSON",
            beforesend:function(){
                $("#msg").html("Loading ...").show();
            },
            success:function(data){
                if(data.flg == 1)
                {
                    $("#msg").html("Trip removed successfully").show();
                    $("#trip_card_" + tripId).remove();
                }
                else if(data.flg == -1)
                {
                    $("#msg").html("Enough data not provided").show();
                }
                else if(data.flg == -2)
                {
                    $("#msg").html("Error deleting").show();
                }
                else if(data.flg == -3)
                {
                    $("#msg").html("Error connecting").show();
                }
            }
        });
        setTimeout(function(){
            $("#msg").hide();
        },2500);
    });

    $(document).on("click","#not_btn",function(){
        let tripId = $(this).data("id");
        $("#trip_card_" + tripId).remove();
    });

    $(document).on("click","#read_more_btn",function(){
        let tripId = $(this).data('id');
        let des = '';
        for(let i = 0; i<trips.length; i++)
        {
            if(trips[i].trip_id == tripId)
                des = trips[i].trip_description;
        }
        $("#trip_description_" + tripId).html(des);
        $("#trip_card_description_box_" + tripId).append("<button id = 'show_less_btn' data-id = '" + tripId +  "'>Show Less</button>");
        $(this).remove();
    });
    $(document).on("click","#show_less_btn",function(){
        let tripId = $(this).data('id');
        let des = '';
        for(let i = 0; i<trips.length; i++)
        {
            if(trips[i].trip_id == tripId)
                des = trips[i].trip_description.substring(0,200) + " ...";
        }
        $("#trip_description_" + tripId).html(des);
        $("#trip_card_description_box_" + tripId).append("<button id = 'read_more_btn' data-id = '" + tripId +  "'>Read More</button>");
        $(this).remove();
    });

    $("#upd_cut").on("click",function(){
        $("#update_form_div").hide();
    });
});