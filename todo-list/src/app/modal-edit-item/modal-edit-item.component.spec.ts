import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditItemComponent } from './modal-edit-item.component';

describe('ModalEditItemComponent', () => {
  let component: ModalEditItemComponent;
  let fixture: ComponentFixture<ModalEditItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalEditItemComponent]
    });
    fixture = TestBed.createComponent(ModalEditItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
