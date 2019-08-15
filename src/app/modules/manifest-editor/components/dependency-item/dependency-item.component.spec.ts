import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DependencyItemComponent } from './dependency-item.component';

describe('DependencyItemComponent', () => {
  let component: DependencyItemComponent;
  let fixture: ComponentFixture<DependencyItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DependencyItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DependencyItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
