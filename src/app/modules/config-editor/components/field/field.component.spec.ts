import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldComponent } from './field.component';
import { SharedModule } from '@app/shared';

describe('FieldComponent', () => {
  let component: FieldComponent;
  let fixture: ComponentFixture<FieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FieldComponent],
      imports: [SharedModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('render an input number if schema type is "number"', () => {
    component.item = {
      key: 'SOME_KEY',
      schema: {
        type: 'number'
      }
    };
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input[type="number"]');
    expect(input).toBeTruthy();
  });

  it('render an input text if schema type is "string"', () => {
    component.item = {
      key: 'SOME_KEY'
    };
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input[type="text"]');
    expect(input).toBeTruthy();
  });

  it('render a tag number if schema type is "integer"', () => {
    component.item = {
      key: 'SOME_KEY',
      schema: {
        type: 'integer'
      }
    };
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input[type="number"]');
    expect(input).toBeTruthy();
  });

  it('render a checkbox if schema type is "boolean"', () => {
    component.item = {
      key: 'SOME_KEY',
      schema: {
        type: 'boolean'
      }
    };
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input[type="checkbox"]');
    expect(input).toBeTruthy();
  });
});
