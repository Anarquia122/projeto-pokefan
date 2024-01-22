import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SegredoComponent } from './segredo.component';

describe('SegredoComponent', () => {
  let component: SegredoComponent;
  let fixture: ComponentFixture<SegredoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SegredoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SegredoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
