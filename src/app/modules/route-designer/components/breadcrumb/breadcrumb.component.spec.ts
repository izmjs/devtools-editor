import {
  async,
  ComponentFixture,
  TestBed,
  tick,
  fakeAsync
} from '@angular/core/testing';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { SuiPopupModule } from 'ng2-semantic-ui';
import { SharedModule } from '@app/shared';
describe('BreadcrumbComponent', () => {
  let component: BreadcrumbComponent;
  let fixture: ComponentFixture<BreadcrumbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, SuiPopupModule],
      declarations: [BreadcrumbComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadcrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('should display the breadcrumb depending on the current url ', () => {
    it('Default breadcrumb , should display the home button ', () => {
      const homeButton = fixture.nativeElement.querySelectorAll('div > button');
      // Should contain the home button
      expect(homeButton.length).toEqual(1);
      const [btn] = homeButton;
      // Should contain the home icon
      expect(btn.innerText).toEqual('home');
    });
    it('breadcrumb testing url - 2 entries', () => {
      component.currentUrl = 'api/test';
      fixture.detectChanges();
      const items = fixture.nativeElement.querySelectorAll('div > a');
      // Should contain the two elements
      expect(items.length).toEqual(2);
      const [firstItem] = items;
      // should contain the name of the first entry of the current url - api
      expect(firstItem.innerText).toEqual('api');
      const secondItem = items[1];
      // should contain the name of the second entry of the current url - test
      expect(secondItem.innerText).toEqual('test');
    });
    it('should raises the selected event when clicked', fakeAsync(() => {
      component.currentUrl = 'api';
      let value: string;
      component.goToUrl.subscribe(event => {
        value = event;
      });
      fixture.detectChanges();
      const matchip = fixture.nativeElement.querySelectorAll(
        'div > a > mat-chip'
      );
      const [btn] = matchip;
      // Fire the click event on the click btn
      btn.click();
      fixture.detectChanges();
      tick();
      // should contain the value of the selected item : api
      expect(btn.innerText).toEqual(value);
    }));
  });
});
