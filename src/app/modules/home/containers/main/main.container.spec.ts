import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';

import { State, IHomeState } from '../../home.model';
import { HomeService } from '../../home.service';
import { HomeMainContainer } from './main.container';

function createState(state: IHomeState): State {
  return {
    'home': state
  } as State;
}

describe('HomeMainContainer', () => {
  let component: HomeMainContainer;
  let fixture: ComponentFixture<HomeMainContainer>;
  let store: MockStore<State>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeMainContainer],
      imports: [],
      providers: [
        HomeService,
        provideMockStore({
          initialState: createState({
            loading: false
          })
        }),
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    store.setState(
      createState({
        loading: false
      }),
    );

    fixture = TestBed.createComponent(HomeMainContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
