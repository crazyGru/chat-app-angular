import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private socket$: WebSocketSubject<any> = webSocket('ws://localhost:8080/ws');

  constructor() {}

  connect() {
    this.socket$ = webSocket('ws://localhost:8080/ws');
  }

  disconnect() {
    this.socket$.complete();
  }

  onMessage() {
    return this.socket$.asObservable();
  }

  sendMessage(message: any) {
    this.socket$.next(message);
  }
}
