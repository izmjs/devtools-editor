import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DependenciesComponent } from './dependencies.component';

describe('DependenciesComponent', () => {
  let component: DependenciesComponent;
  let fixture: ComponentFixture<DependenciesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DependenciesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DependenciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
