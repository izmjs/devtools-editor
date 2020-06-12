import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostmanKeyComponent } from './postman-key.component';

describe('PostmanKeyComponent', () => {
  let component: PostmanKeyComponent;
  let fixture: ComponentFixture<PostmanKeyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostmanKeyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostmanKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
