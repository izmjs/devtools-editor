import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from '../../api-designer.model';

@Component({
  selector: 'app-router-designer',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContainerComponent implements OnInit {
  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private store: Store<State>) {}

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit() {}
}
