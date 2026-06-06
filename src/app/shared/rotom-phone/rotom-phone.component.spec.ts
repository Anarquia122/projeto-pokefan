import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RotomPhoneComponent } from './rotom-phone.component';

describe('RotomPhoneComponent', () => {
  let component: RotomPhoneComponent;
  let fixture: ComponentFixture<RotomPhoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RotomPhoneComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RotomPhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
