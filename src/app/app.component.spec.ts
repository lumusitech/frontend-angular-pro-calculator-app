import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();

    // this is a wrapper for the component
    //it gives us access to the component instance and other utils functions
    fixture = TestBed.createComponent(AppComponent);
  });

  it('should create the app', () => {
    // literally give us access to the component instance
    const app = fixture.componentInstance;

    expect(app).toBeTruthy();
  });

  // my first basic test
  it('should be 2', () => {
    // Arrange
    const a = 1;
    const b = 1;

    // Act
    const result = a + b;

    // Assert
    expect(result).toBe(2);
  });

  it(`should have the 'frontend-angular-zoneless-calculator-app' title`, () => {
    const app = fixture.componentInstance;
    expect(app.title).toEqual('frontend-angular-zoneless-calculator-app');
  });

  it('should has a router-outlet', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    console.log(compiled);

    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  });
});
