import { OnModuleInit } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { io,Socket } from 'socket.io-client';



const socketClient = io('http://localhost:3000');

   
socketClient.on("connect",()=>{
    console.log("connected to gateway:",socketClient.id);

socketClient.emit('message',{   //send to backend
      msg: "sending from client",
      text: "Hello server 👋",
    })    
  })


socketClient.on("onMessage",(data)=>{  //recive from backend
console.log(data);
  })
  



setInterval(() => {}, 1000);
console.log("shutting down");