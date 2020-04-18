import { Injectable } from '@angular/core';
import { of } from 'rxjs';
// import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  // constructor(private socket: Socket) {}

  getMessage() {
    return of([]);
    // return this.socket.fromEvent('tasks');
  }
}
