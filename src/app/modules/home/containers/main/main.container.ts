import { Component, OnInit, OnDestroy } from '@angular/core';

import { StrategyService } from './strategy.service';

@Component({
  selector: 'app-home',
  templateUrl: './main.container.html',
  styleUrls: ['./main.container.scss'],
})
export class HomeMainContainer implements OnInit, OnDestroy {
  constructor(public readonly strategy: StrategyService) { }

  ngOnDestroy() {
    this.strategy.unlisten();
  }

  ngOnInit() {
    this.strategy.listen();
  }
}
