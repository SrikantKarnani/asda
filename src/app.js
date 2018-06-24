const openStream = require('./openStream');
const playVideo = require('./playVideos');
const peer = require('simple-peer');
const $ = require('jquery');


openStream(function(stream){
  playVideo(stream,'localStream')
  const p = new peer({
    initiator: location.hash==='#1', trickle: false ,stream  ,reconnectTimer: 5000,
      config: {
        iceTransportPolicy: "relay",
        iceServers: [
          {
            urls: "stun:daphnis.labs.com",
            username: "root",
            credential: "daphnis123"
          },
          { urls: "turn:206.189.158.233:5349",
          username: "root",
          credential: "daphnis123" }

          //{ urls: "stun:stun.l.google.com:19302" },
          //{ urls: "stun:global.stun.twilio.com:3478?transport=udp" }
        ]  }
      });
  p.on('signal',token=>
  $('#txtMySignal').val(JSON.stringify(token))
  );
  p.on('connect',()=> {
    setInterval(()=> p.send(Math.random()),500);
  });

  p.on('data',data=> console.log('Data Received' + data));
  $('#btnConnect').click(()=>{
    const friendSignal  = JSON.parse($('#txtFriendSignal').val());
    p.signal(friendSignal);
  });

  p.on('stream' , friendStream => playVideo(friendStream , 'friendStream' ));
});
