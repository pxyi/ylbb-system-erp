import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  ws: WebSocket;

  interval;

  constructor() { }

  createObservableSocket(url: string): Observable<any> {
    this.ws = new WebSocket(url);
    this.interval = setInterval(_ => {
      this.ws.send('土豆土豆，我是地瓜，我是地瓜，收到请回答！收到请回答！！');
    }, 10 * 1000)
    return new Observable( observer => {
      this.ws.onmessage = (event) => observer.next(JSON.parse(event.data));
      this.ws.onerror = (event) => observer.error(event);
      this.ws.onclose = (event) => { 
        observer.next('close');
        clearInterval(this.interval);
        observer.complete(); 
      };
    })
  }
    
  // 向服务器端发送消息
  sendMessage(message: any) {
    this.ws.send(JSON.stringify(message));
  }
}
