var socket = io();

$(function() {
    
//Successfully connected to server event
     
    socket.on('connect', function() {
      console.log('Connected to server.');
      $('#disconnected').hide(); //
      $('#waiting-room').show();  //
  
    });
  
    
//Disconnected from server event
     
    socket.on('disconnect', function() {
      console.log('Disconnected from server.');
      $('#waiting-room').hide();
      $('#game').hide();
      $('#disconnected').show();
    });
});