import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestFunctionsComponent } from './test-functions.component';

describe('TestFunctionsComponent', () => {
  let component: TestFunctionsComponent;
  let fixture: ComponentFixture<TestFunctionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestFunctionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestFunctionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
