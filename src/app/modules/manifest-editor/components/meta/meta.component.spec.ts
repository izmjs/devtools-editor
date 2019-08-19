import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetaComponent } from './meta.component';
import { FormsModule } from '@angular/forms';

describe('MetaComponent', () => {
  let component: MetaComponent;
  let fixture: ComponentFixture<MetaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MetaComponent],
      imports: [FormsModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
