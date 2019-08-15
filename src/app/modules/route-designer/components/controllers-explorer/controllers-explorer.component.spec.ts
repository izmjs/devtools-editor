import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick
} from '@angular/core/testing';
import { ControllersExplorerComponent } from './controllers-explorer.component';
import { RouterDesignerContainerComponent } from '../container/container.component';
import { MatTooltipModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ILoadable } from '../../route-designer.model';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { SuiPopupModule } from 'ng2-semantic-ui';
import { SharedModule } from '@app/shared';
describe('ControllersExplorerComponent Under Test', () => {
  let component: ControllersExplorerComponent;
  let fixture: ComponentFixture<ControllersExplorerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        BrowserAnimationsModule,
        MatTooltipModule,
        SharedModule,
        SuiPopupModule
      ],
      declarations: [
        ControllersExplorerComponent,
        RouterDesignerContainerComponent,
        BreadcrumbComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControllersExplorerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  // function that initializes the value of a mouse event once it's been created -in this case : the mouse event type is "mouseover"
  function mouseover(el) {
    const ev = new MouseEvent('mouseover', {});
    // var ev = document.createEvent("MouseEvent");
    // ev.initMouseEvent(
    //   "mouseover",
    //   true /* bubble */,
    //   true /* cancelable */,
    //   window,
    //   null,
    //   0,
    //   0,
    //   0,
    //   0 /* coordinates */,
    //   false,
    //   false,
    //   false,
    //   false /* modifier keys */,
    //   0 /*left*/,
    //   null
    // );
    el.dispatchEvent(ev);
  }
  it('ControllersExplorerComponent should be created ', () => {
    expect(component).toBeTruthy();
  });
  describe('should render the list of the folders', () => {
    it('Display one folder not scanned', fakeAsync(() => {
      component.entries = [
        {
          name: 'folderNotScanned',
          type: 'folder',
          loaded: false,
          children: [],
          loading: false
        }
      ];
      fixture.detectChanges();
      const folder = fixture.nativeElement.querySelectorAll('div > mat-card');
      // Should contain only one entry folder
      expect(folder.length).toEqual(1);
      const [oneFolder] = folder;
      // should have a red border bottom => Folder Not Scanned
      expect(oneFolder.attributes.class.textContent).toContain('redb');
      const icon = oneFolder.querySelector('div > mat-icon');
      // Should contain the folder icon
      expect(icon.innerText).toEqual('folder');
      const popup = icon.attributes;
      // mat-icon hhould contain the suipopup attribute
      expect(popup['suipopup'].name).toEqual('suipopup');
      // MouseOver to show the popup
      mouseover(icon);
      fixture.detectChanges();
      tick(1000);
      const subtitle = oneFolder.querySelector('mat-card-subtitle');
      // Should contain the folder name
      expect(subtitle.innerText).toEqual('folderNotScanned');
    }));
    it('Display one folder already scanned', () => {
      component.entries = [
        {
          name: 'folderScanned',
          type: 'folder',
          loaded: true,
          children: [],
          loading: false
        }
      ];
      fixture.detectChanges();
      const folder = fixture.nativeElement.querySelectorAll('div > mat-card');
      // Should contain only one entry folder
      expect(folder.length).toEqual(1);
      const [oneFolder] = folder;
      // should have a green border bottom => Scanned Folder
      expect(oneFolder.attributes.class.textContent).toContain('greenb');
      const icon = oneFolder.querySelector('div > mat-icon');
      // Should contain the folder icon
      expect(icon.innerText).toEqual('folder');
      const subtitle = oneFolder.querySelector('mat-card-subtitle');
      // Should contain the folder name
      expect(subtitle.innerText).toEqual('folderScanned');
    });
    it('display one folder loading data by drawing a spinner loader', () => {
      component.entries = [
        {
          name: 'folderLoading',
          type: 'folder',
          loaded: false,
          children: [],
          loading: true
        }
      ];
      fixture.detectChanges();
      const folder = fixture.nativeElement.querySelectorAll('div > mat-card');
      // Should contain only one entry folder
      expect(folder.length).toEqual(1);
      const [oneFolder] = folder;
      // should have a red border bottom => Folder Not Scanned
      expect(oneFolder.attributes.class.textContent).toContain('redb');
      const divSpinner = oneFolder.querySelector(
        'mat-card-content > div > div'
      );
      expect(divSpinner.className).toEqual('uploader-status');
      expect(divSpinner.children[0].className).toContain('mat-spinner');
      const circleSpinner = divSpinner.querySelector(
        'mat-spinner > svg > circle'
      );
      // should draw the svg circle => Loading and waiting data from the server
      expect(circleSpinner.nodeName).toEqual('circle');
      const icon = oneFolder.querySelector('div > mat-icon');
      // Should contain the folder icon
      expect(icon.innerText).toEqual('folder');
      const subtitle = oneFolder.querySelector('mat-card-subtitle');
      // Should contain the folder name
      expect(subtitle.innerText).toEqual('folderLoading');
    });
    // Should raises the selected event when clicked
    it('should raises the selected event when clicked', fakeAsync(() => {
      const expectedResult: ILoadable = {
        name: 'Example',
        type: 'folder',
        loaded: false,
        children: [],
        loading: false
      };
      component.entries = [expectedResult];
      let value: ILoadable;
      component.select.subscribe(event => {
        value = event;
      });
      fixture.detectChanges();
      const folder = fixture.nativeElement.querySelectorAll('div > mat-card');
      const [oneFolder] = folder;
      // Get the parentElement of the icon
      const icon = oneFolder.querySelector('div > mat-icon');
      // Fire the click event on the click icon
      icon.click();
      fixture.detectChanges();
      tick();
      // should contain the value of the selected folder
      expect(expectedResult).toEqual(value);
    }));
  });
  describe('should render the list of the scanned files', () => {
    it('Display one scanned file containing 0 controller', () => {
      component.entries = [
        {
          name: 'fildeZeroController',
          type: 'file',
          loaded: true,
          children: [],
          loading: false
        }
      ];
      fixture.detectChanges();
      const file = fixture.nativeElement.querySelectorAll('div > mat-card');
      // Should contain only one entry file
      expect(file.length).toEqual(1);
      const [oneFile] = file;
      // should have a green border bottom => Scanned file
      expect(oneFile.attributes.class.textContent).toContain('greenb');
      const [icon] = oneFile.querySelectorAll('div > mat-icon');
      const badge = icon.querySelector('span').innerText;
      // Should contain the file icon
      expect(icon.firstChild.data).toEqual('insert_drive_file');
      // Should contain the badge which has the value 0 => the file doesn't contain any controller
      expect(badge).toEqual('0');
      const subtitle = oneFile.querySelector('mat-card-subtitle');
      // Should contain the file name
      expect(subtitle.innerText).toEqual('fildeZeroController');
    });
    it('Display one scanned file containing 1 controller', () => {
      component.entries = [
        {
          name: 'fileOneController',
          type: 'file',
          loaded: true,
          children: [
            {
              title: 'ok1',
              type: 'controller',
              description: 'Simple request check, just send a "true" word',
              name: 'Check results',
              params: [
                {
                  name: 'req',
                  description: 'The request',
                  type: 'IncommingMessage'
                },
                {
                  name: 'res',
                  description: 'The response',
                  type: 'OutcommingMessage'
                },
                {
                  name: 'next',
                  description: 'Go to the next middleware',
                  type: 'Function'
                }
              ]
            }
          ],
          loading: false
        }
      ];
      fixture.detectChanges();
      const file = fixture.nativeElement.querySelectorAll('div > mat-card');
      // Should contain only one entry file
      expect(file.length).toEqual(1);
      const [oneFile] = file;
      // should have a green border bottom => Scanned file
      expect(oneFile.attributes.class.textContent).toContain('greenb');
      const [icon] = oneFile.querySelectorAll('div > mat-icon');
      const badge = icon.querySelector('span').innerText;
      // Should contain the file icon
      expect(icon.firstChild.data).toEqual('insert_drive_file');
      // Should contain the badge which has the value 1 => the file contains one controller
      expect(badge).toEqual('1');
      const subtitle = oneFile.querySelector('mat-card-subtitle');
      // Should contain the file name
      expect(subtitle.innerText).toEqual('fileOneController');
    });
  });
  describe('should render the list Controllers', () => {
    it('One controller', () => {
      component.entries = [
        {
          title: 'ok1',
          type: 'controller',
          description: 'Simple request check, just send a "true" word',
          name: 'Check results',
          params: [
            {
              name: 'req',
              description: 'The request',
              type: 'IncommingMessage'
            },
            {
              name: 'res',
              description: 'The response',
              type: 'OutcommingMessage'
            },
            {
              name: 'next',
              description: 'Go to the next middleware',
              type: 'Function'
            }
          ]
        }
      ];
      fixture.detectChanges();
      const controller = fixture.nativeElement.querySelectorAll(
        'div > mat-card'
      );
      // Should contain only one entry controller
      expect(controller.length).toEqual(1);
      const [oneController] = controller;
      // Should have a gray border bottom => it's a controller
      expect(oneController.attributes.class.textContent).toContain('grayb');
      const [icon] = oneController.querySelectorAll('mat-icon');
      // Should contain the controller icon
      expect(icon.innerText).toEqual('functions');
      const subtitle = oneController.querySelector('mat-card-subtitle');
      // Should contain the controller name
      expect(subtitle.innerText).toEqual('Check results');
    });
  });
});
