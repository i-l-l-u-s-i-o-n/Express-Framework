var request=require("request");



request("https://api.sunrise-sunset.org/json?lat=36.7201600&lng=-4.4203400&date=2019-02-10",function(error,response,body){
     
     //Checking if there is no error or status code is 200 i.e OK.
    if (!error && response.statusCode == 200) {
        var parsedData= JSON.parse(body);
        console.log("SUNSET AND SUNRISE AT lat=36.7201600 & lng=-4.4203400 on date = 2019-02-10 is : ");
        console.log("Sunset time is :"+ parsedData.results.sunset+" Sunrise time is : "+parsedData.results.sunrise+
                   " Day Length is : "+ parsedData.results.day_length);
    }
})
