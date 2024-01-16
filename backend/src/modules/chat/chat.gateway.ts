import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  OnGatewayDisconnect,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

interface Message {
  id: number;
  username: string;
  type: string;
  message: string
}

@WebSocketGateway({
  cors: {
    origin: '*'
  }
})
export class ChatsGateway implements OnGatewayDisconnect {
  @WebSocketServer() server;

  private connectedUsers = new Map<string, Socket>();
  private messages: Message[] = [];

  @SubscribeMessage('join')
  join(@ConnectedSocket() client: Socket, @MessageBody() username: string ) {
    if (Array.from(this.connectedUsers.values()).some((user) => user['username'] === username)) {
      client.emit('userExist', 'User with this username already exists');
      return false;
    }

    client['username'] = username;
    this.connectedUsers.set(client.id, client);

    client.emit('previousMessages', this.messages);

    const message = {
      id: this.messages.length + 1,
      username,
      type: 'join',
      message: "user username joined chat"
     };
    this.messages.push(message);

   
    this.server.emit('chat', message);

    return true;
  }

  handleDisconnect(client: Socket) {
    if(this.connectedUsers.get(client.id)){
      this.connectedUsers.delete(client.id);
    }
  }

  @SubscribeMessage('chat')
  handleMessage(@ConnectedSocket() client: Socket, @MessageBody() message: string): string {
    const username = this.connectedUsers.get(client.id)['username'];

    const messageObj = { 
      id: this.messages.length + 1, 
      username,
      message,
      type: 'message'
     };

    this.messages.push(messageObj);
    this.server.emit('chat', messageObj);

    return message;
  }
}