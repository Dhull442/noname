var express = require('express');
var ejs = require('ejs');
var bodyParser = require('body-parser');
var path = require('path');
var request=require('request');
var urlcurrent="dhull442.github.io";

// App setup
var app = express();
app.set('view engine','ejs');
app.use('/.assets',express.static('.assets'));
app.listen(process.env.PORT||4000, function(){
  console.log('listening for requests on port 4000');
});

app.get('/*',function(req,res){
  // res.send('this is a homepage' );
  if(req.url==="/" || req.url==="/home")
  {
    console.log('loaded homepage');
    res.render('index');
  }
  else{
    request
    .get('https://'+urlcurrent+req.url)
    .on('response', function(response) {
      console.log(response.statusCode) // 200
      console.log(response.headers['content-type']) // 'image/png'
    })
    .pipe(res);
  }
})
var urlencoded = bodyParser.urlencoded({ extended: false })
app.post('/login',urlencoded,function(req,res){
  // var ip = document.getElementById('ipaddr');
  console.log(req.body);
  if(req.body.logintype === "user"){
    res.render('postuserlogin',{data: req.body});
  }
  else{
    res.render('posthostlogin',{data: req.body});
  }
})

app.post('/getdata',urlencoded,function(req,res){
  // shell.exec('bash cleanup.sh')
  // shell.exec('bash getsite.sh '+ req.body.url);
  // console.log('data sent');
  // var responsedata
  // urlcurrent='https://'+req.body.url;
  request
  .get('https://'+req.body.url)
  .on('response', function(response) {
    console.log(response.statusCode) // 200
    console.log(response.headers['content-type']) // 'image/png'
  })
  .pipe(res);
})
app.post('/logout',function(req,res){
  res.render('index');
})
