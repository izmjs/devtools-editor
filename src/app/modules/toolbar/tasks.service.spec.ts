import { TestBed } from '@angular/core/testing';

import { TasksService } from './tasks.service';
import { SocketIoModule } from 'ngx-socket-io';

describe('TasksService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [SocketIoModule.forRoot({ options: {}, url: '' })],
      providers: [TasksService]
    })
  );

  it('should be created', () => {
    const service: TasksService = TestBed.get(TasksService);
    expect(service).toBeTruthy();
  });
});
