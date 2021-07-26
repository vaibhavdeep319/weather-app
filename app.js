const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/", function(req,res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req,res){
  var cityName = req.body.cityName;
  const apiKey = "enter your key here";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid="+apiKey+"&units=metric";

  https.get(url, function(response){
    response.on("data", function(data){
      const weatherObject = JSON.parse(data);




        if(weatherObject.cod == 200) {
          const temp = weatherObject.main.temp;
          const description = weatherObject.weather[0].description;
          const icon = weatherObject.weather[0].icon;
          const iconPath = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
          res.send(`<!doctype html>
          <html lang="en">
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
              <meta name="description" content="">
              <meta name="author" content="">
              <title>Weather-App</title>

              <!-- Bootstrap core CSS -->
              <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

              <!-- Custom styles for this template -->
              <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;400&display=swap" rel="stylesheet">

              <link href="css/style.css" rel="stylesheet">
              <link rel="icon" href="images/favicon.png" type="image/gif" sizes="18x18">
            </head>
            <body  style="background-color:#333333">
              <div class="jumbotron jumbotron-fluid  text-center">
              <div class="container text-center">
              <h1 class="display-4 m-3">Temperature in ${cityName} is ${temp}°C</h1>
              <p class="lead m-3"><img src="${iconPath}"> ${description.toUpperCase()}</p>
            </div>
            <form action="/return" method="post">
          <button class="btn btn-lg btn-info p-3 mx-auto m-3 rounded-lg" type="submit" name="button"> Search Another Location</button>
          </form>
            </div>
            <p class="text-center mt-3 mb-3 text-muted">&#169 2021 Vaibhav Deep.</p>
            </body>
          </html>`);
            }

        else {
          res.send(`<!doctype html>
          <html lang="en">
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
              <meta name="description" content="">
              <meta name="author" content="">
              <title>Weather-App</title>

              <!-- Bootstrap core CSS -->
              <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

              <!-- Custom styles for this template -->
              <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;400&display=swap" rel="stylesheet">

              <link href="css/style.css" rel="stylesheet">
              <link rel="icon" href="images/favicon.png" type="image/gif" sizes="18x18">
            </head>
            <body  style="background-color:#333333">
              <div class="jumbotron jumbotron-fluid  text-center">
              <div class="container  text-center">
              <h1 class="display-4 m-3">OOPS</h1>
              <p class="lead m-3 mb-5">Sorry! Weather Data not available for the location you specified. Try another Location.</p>
            </div>
            <form action="/return" method="post">
          <button class="btn btn-lg btn-info p-3 mx-auto m-3 rounded-lg" type="submit" name="button"> Search Another Location</button>
          </form>
            </div>
            <p class="text-center mb-3 text-muted">&#169 2021 Vaibhav Deep.</p>
            </body>
          </html>`);
        }



    });
  })


})

app.post("/return", function(req, res){
  res.redirect("/");
})

app.listen(process.env.PORT || 3000, function() {
  console.log("Server Started at Port 3000");
})



