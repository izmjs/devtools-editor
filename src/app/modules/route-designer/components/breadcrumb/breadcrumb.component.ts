import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  @Input() currentUrl: string;
  @Output() goToUrl: EventEmitter<string> = new EventEmitter();

  ngOnInit() {}

  /**
   * split url in parts form on deleting the slash separator
   * @param str The string url to be splitted
   */
  getParts(str = '') {
    if (!str || typeof str !== 'string') {
      return [];
    }

    return str.split('/').filter(Boolean);
  }
  /**
   * GoTo : by clicking on the appropriate element, it will return the right url of the arboressence
   * @param ev read-only property indicates which button was pressed on the mouse to trigger the event.
   * @param index  the index of clicked element
   */
  goto(ev: MouseEvent, index: number) {
    const url = (this.currentUrl || '')
      .split('/')
      .filter(Boolean)
      .splice(0, index + 1)
      .join('/');
    this.goToUrl.emit(url);
  }
}
