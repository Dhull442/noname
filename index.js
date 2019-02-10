var express = require('express');
var socket = require('socket.io');
var ejs = require('ejs');
var bodyParser = require('body-parser');

// App setup
var app = express();
app.set('view engine','ejs');
app.use('/assets',express.static('assets'));
app.listen(process.env.PORT||4000, function(){
    console.log('listening for requests on port 4000');
});

app.get('/',function(req,res){
  // res.send('this is a homepage' );
  console.log('loaded homepage');
  res.render('index');
})
var urlencoded = bodyParser.urlencoded({ extended: false })
app.post('/login',urlencoded,function(req,res){
  // var ip = document.getElementById('ipaddr');
  console.log(req.body);
  if(req.body.logintype === "user")
  {res.render('postuserlogin',{data: req.body});}
  else{
    res.render('posthostlogin',{data: req.body});
  }
})

app.post('/getdata',urlencoded,function(req,res){
  console.log(req.body);
  res.send(req.body);
  res.end();
})
app.post('/logout',function(req,res){
  // close connection method
  res.send("You can close this now :), Thanks for helping!");
  console.log(req.data+"logged out");
})
// Static files
// app.use(express.static('public'));

// // Socket
// var io = socket(server);
// io.on('connection',(socket) => {
//   console.log('maid io connect',socket.id);
//   socket.on('ball',function(data){
//     io.sockets.emit('connector',data);
//   })
// })
