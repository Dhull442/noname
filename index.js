var express = require('express');
var socket = require('socket.io');
var ejs = require('ejs');
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');
// var request = require('request');
var shell = require('shelljs');
// App setup
var app = express();
app.set('view engine','ejs');
app.use('/.assets',express.static('assets'));
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
  if(req.body.logintype === "user"){
    res.render('postuserlogin',{data: req.body});
  }
  else{
    res.render('posthostlogin',{data: req.body});
  }
})

app.post('/getdata',urlencoded,function(req,res){
  shell.exec('bash cleanup.sh')
  shell.exec('wget --page-requisites --html-extension --convert-links --restrict-file-names=windows --no-parent '+ req.body.url);
  shell.exec('echo \"'+req.body.url+'\" >> cache.txt');
  // var responsedata
  fs.readFile(path.join(__dirname+'/'+req.body.url+'index.html'),function (err, data){
        res.writeHead(200, {'Content-Type': 'text/html','Content-Length':data.length});
        res.write(data);
        res.end();});
  // res.render('postuserlogin',{data: { kerberos: 'cs1170370', url: 'dhull442.github.io/' , page: responsedata }})
  // res.send(path.join(__dirname+'/'+req.body.url+'index.html'))
  console.log(req.body);
  // res.render('postuserlogin',{data: req.})
//   request(req.body.url, function (error, response, body) {
//   console.log('error:', error); // Print the error if one occurred
//   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//   // console.log('body:', body); // Print the HTML for the Google homepage.
//   res.render(body);
//   // res.end();
// });
// request
//   .get(req.body.url)
//   .on('response', function(response) {
//     console.log(response.statusCode) // 200
//     console.log(response.headers['content-type']) // 'image/png'
//   })
//   .pipe(res);
// });
// app.post('/logout',function(req,res){
//   // close connection method
//   res.send("You can close this now :), Thanks for helping!");
//   console.log(req.data+"logged out");
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
