// make connection
var socketfrontend = io.connect('https://iitd-vpn.herokuapp.com:4000');

// Query handler;
var kerberos = document.getElementById('kerberos');
var ip = document.getElementById('ipaddr')
var userbtn = document.getElementById('userlogin');
var hostbtn = document.getElementById('hostlogin');
var output = document.getElementById('ip');

userbtn.addEventListener('click',function(){
  socketfrontend.emit('ball',{
    // Functions of user
    kerberos: kerberos.value,
    ip : ip.value
  });
  kerberos.value = "";
});
hostbtn.addEventListener('click',function(){
  socketfrontend.emit('socket',{
    // Functions to be done by host login
    kerberos: kerberos.value,
    ip : ip.value
  });
  kerberos.value = "";
});

// Listen for addEventListener
socketfrontend.on('connector',function(data){
  output.innerHTML += '<p><strong>'+data.kerberos+':</strong>'+data.ip+'</p>';
});
