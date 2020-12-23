import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyDetailPage } from './my-detail.page';

describe('MyDetailPage', () => {
  let component: MyDetailPage;
  let fixture: ComponentFixture<MyDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
