import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewOperationComponent } from './new-operation.component';

describe('NewOperationComponent', () => {
  let component: NewOperationComponent;
  let fixture: ComponentFixture<NewOperationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewOperationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
