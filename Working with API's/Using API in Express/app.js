// TO use any API , we have to amke request using "request" package 
// It will return data in XML(Extended Markup Language) or JSON(JS object notation) as STRING.
// We have to use JSON.parse() to parse the recieved data in an simple format(object).
// We can also use "curl <url or API link>" to request from terminal.
// To install request package- >
// npm i request --save

var request=require("request");

request("https://jsonplaceholder.typicode.com/users/1",function(error,response,body){
   
   
   //Checking if there is no error or status code is 200 i.e OK.
   if (!error && response.statusCode == 200) {
        var parsedData= JSON.parse(body);
        console.log(parsedData);
        console.log("Name : "+parsedData.name);
        console.log("Zip code : "+ parsedData.address.zipcode);
   }
})
