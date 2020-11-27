
};
$.each(myJson.address, function (index, value) {
    var city_id;
    var district_id;
    var wards_id;
        
        $("#city").append('<option rel="' + index + '" value="'+value.name+'">'+value.name+'</option>');
        
        $("#city").change(function () {
            $("#district, #wards").find("option:gt(0)").remove();
            $("#district").find("option:first").text("Loading...");
            city_id = $(this).find('option:selected').attr('rel');
            $.each(myJson.address[city_id].districts, function (index1, value1) {
                $("#district").find("option:first").text("Chọn Huyện");
                $("#district").append('<option rel="' + index1 + '" value="'+value1.name+'">'+value1.name+'</option>');
            });
            
        });
    
        
        $("#district").change(function () {
            $("#wards").find("option:gt(0)").remove();
            $("#wards").find("option:first").text("Loading...");
            district_id = $(this).find('option:selected').attr('rel');          
            $.each(myJson.address[city_id].districts[district_id].wards, function (index2, value2) {
                $("#wards").find("option:first").text("Chọn phường/xã");
                $("#wards").append('<option rel="' + index2 + '" value="'+value2.name+'">'+value2.name+'</option>');
            });
            
                   
        });     
    
});