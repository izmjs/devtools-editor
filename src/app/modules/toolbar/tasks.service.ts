import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  constructor(private socket: Socket) {}

  getMessage() {
    return this.socket.fromEvent('tasks');
  }
}
