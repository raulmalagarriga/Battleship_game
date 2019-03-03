var socket = io();

$(function() {
    
//Successfully connected to server event
     
    socket.on('connect', function() {
      console.log('Connected to server.');
  
    });
  
    
//Disconnected from server event
     
    socket.on('disconnect', function() {
      console.log('Disconnected from server.');
     
    });
});