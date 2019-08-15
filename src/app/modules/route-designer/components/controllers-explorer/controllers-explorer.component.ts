import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ILoadable } from '../../route-designer.model';

@Component({
  selector: 'app-controllers-explorer',
  templateUrl: './controllers-explorer.component.html',
  styleUrls: ['./controllers-explorer.component.scss']
})
export class ControllersExplorerComponent implements OnInit {
  @Input() entries: ILoadable[];
  @Output() select: EventEmitter<ILoadable[]> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  eventClick(entry) {
    this.select.emit(entry);
  }

  /**
   * Will be executed every time check the type of an entry
   * @param entry The entry to verify
   */
  getType(entry: ILoadable): boolean {
    if (entry.type === 'file' || entry.type === 'folder') {
      return true;
    } else {
      return false;
    }
  }
  /**
   * Will be executed every time we fetch the params of an entry of type controller
   * @param entry The entry(controller) that we are looking for his parameters
   */
  getParams(entry: ILoadable): string {
    if (entry.type === 'controller') {
      const paramsStr = entry.params.map(
        param => `${param.name}?: ${param.type}  `
      );
      return `${paramsStr}`;
    }
  }
}
