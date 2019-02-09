// make connection
var socketfrontend = io.connect('http://localhost:4000');

// Query handler;
var kerberos = document.getElementById('kerberos');
var ip = document.getElementById('ipaddr')
var userbtn = document.getElementById('userlogin');
var hostbtn = document.getElementById('hostlogin');
var output = document.getElementById('ip');

userbtn.addEventListener('click',function(){
  socketfrontend.emit('ball',{
    kerberos: kerberos.value,
    ip : ip.value
  });
  kerberos.value = "";
});
hostbtn.addEventListener('click',function(){
  socketfrontend.emit('socket',{
    kerberos: kerberos.value,
    ip : ip.value
  });
  kerberos.value = "";
});

// Listen for addEventListener
socketfrontend.on('connector',function(data){
  output.innerHTML += '<p><strong>'+data.kerberos+':</strong>'+data.ip+'</p>';
});
