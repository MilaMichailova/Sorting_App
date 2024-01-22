import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsAppComponent } from './students-app.component';

describe('StudentsAppComponent', () => {
  let component: StudentsAppComponent;
  let fixture: ComponentFixture<StudentsAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentsAppComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudentsAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
