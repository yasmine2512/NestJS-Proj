import { OnModuleInit } from '@nestjs/common';
import { MessageBody, SubscribeMessage, WebSocketGateway,WebSocketServer } from '@nestjs/websockets';
import {Server} from "socket.io"
import { io,Socket } from 'socket.io-client';
import { ConnectedSocket } from '@nestjs/websockets';
@WebSocketGateway({
  cors: {
    origin: "*", // frontend URL
  },
})
export class GatewayGateway implements OnModuleInit{
@WebSocketServer()
server: Server;
// public socketClient: Socket;  
onModuleInit() {
  this.server.on("connection",(socket)=> {
    console.log("connected :",socket.id);   //recive from client
  })
}

  @SubscribeMessage('message')
  handleMessage(@ConnectedSocket() client: Socket, @MessageBody() payload: any){
    console.log("welcome back");
    console.log("recived from body:",payload);  
    this.server.emit('onMessage',{     //send back to client
      msg: 'New message :)',
      content: payload,
    })
  }
}
 