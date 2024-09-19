import { TestBed, type ComponentFixture } from '@angular/core/testing';
import CalculatorViewComponent from './calculator-view.component';

describe(`CalculatorViewComponent`, () => {
  let fixture: ComponentFixture<CalculatorViewComponent>;
  let compiled: HTMLElement;
  let component: CalculatorViewComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CalculatorViewComponent);
    compiled = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;

    // delete if not needed
    fixture.detectChanges();
  });

  it('should create the app', () => {
    console.log(compiled);

    expect(compiled).toBeTruthy();
    expect(component).toBeTruthy();
  });

  it('should contains calculator component', () => {
    expect(compiled.querySelector('calculator')).toBeTruthy();
  });

  it('should contains basic css classes', () => {
    const divElement = compiled.querySelector('div');
    const classList = divElement?.classList.value.split(' ');
    const mustHaveClasses =
      'w-full mx-auto rounded-xl bg-gray-100 shadow-xl text-gray-800 relative overflow-hidden'.split(
        ' '
      );

    mustHaveClasses.forEach((className) => {
      expect(classList).toContain(className);
    });
  });
});
