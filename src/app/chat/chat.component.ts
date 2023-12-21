import { Component, OnInit, OnDestroy } from '@angular/core';
import { WebSocketService } from './websocket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  messages: string[] = [];
  message: string = '';
  username: string = 'User';

  constructor(private webSocketService: WebSocketService) { }

  ngOnInit(): void {
    this.webSocketService.connect();
    this.webSocketService.onMessage().subscribe((message: any) => {
      this.messages.push(`${message.user}: ${message.content}`);
    });
  }

  ngOnDestroy(): void {
    this.webSocketService.disconnect();
  }

  sendMessage() {
    const message = { user: this.username, content: this.message };
    this.webSocketService.sendMessage(message);
    this.messages.push(`${message.user}: ${message.content}`);
    this.message = '';
  }
}
