var express = require('express');
var ejs = require('ejs');
var bodyParser = require('body-parser');
var path = require('path');
var request=require('request');
var urlcurrent;

// App Setup
var app = express();
app.set('view engine','ejs');
app.use('/.assets',express.static('.assets'));
app.listen(process.env.PORT||4000, function(){ // if port is specified in .env file
  console.log('listening for requests on port 4000');
});

// Get Routine
app.get('/*',function(req,res){
  // res.send('this is a homepage' );
  if(req.url==="/" || req.url==="/home")
  {
    console.log('loaded homepage');
    res.render('index');
  }
  else{
    // if(req.body.url !== ''){
    //   request
    //   .get('https://'+urlcurrent+req.url)
    //   .on('response', function(response) {
    //     //console.log(response.statusCode) // 200
    //     //console.log(response.headers['content-type']) // 'image/png'
    //     // Uncomment if you want to get headers and error codes
    //   })
    //   .pipe(res);
    // }
    // else
    request
    .get('https://'+urlcurrent+req.url)
    .on('response', function(response) {
      //console.log(response.statusCode) // 200
      //console.log(response.headers['content-type']) // 'image/png'
      // Uncomment if you want to get headers and error codes
    })
    .pipe(res);
  }
})

// Post routine
app.post('/*',bodyParser.urlencoded({ extended: false }),function(req,res){
  if(req.url==='/login'){
    console.log(req.body);
    if(req.body.logintype === "user"){
      res.render('postuserlogin',{data: req.body});
    }
    else{
      res.render('posthostlogin',{data: req.body});
    }
  }
  else if(req.url==='/getdata'){
    urlcurrent=req.body.url;
    request
    .get('https://'+req.body.url)
    .on('response', function(response) {
      console.log(response.statusCode) // 200
      console.log(response.headers['content-type']) // 'image/png'
    })
    .pipe(res);
  }
  else if(req.url==='/logout'){
    res.render('index');
  }
  else{
    request
    .get('https://'+urlcurrent+req.body.url)
    .on('response', function(response) {
      // console.log(response.statusCode) // 200
      // console.log(response.headers['content-type']) // 'image/png'
    })
    .pipe(res);
  }
})
