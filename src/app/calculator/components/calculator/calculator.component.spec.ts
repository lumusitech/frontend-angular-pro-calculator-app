import { CalculatorService } from '@/calculator/services/calculator.service';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CalculatorButtonComponent } from '../calculator-button/calculator-button.component';
import { CalculatorComponent } from './calculator.component';

class MockCalculatorService {
  public resultText = jasmine.createSpy('resultText').and.returnValue('100.00');
  public subResultText = jasmine.createSpy('resultText').and.returnValue('20');
  public lastOperator = jasmine.createSpy('resultText').and.returnValue('-');

  public constructNumber = jasmine.createSpy('constructNumber');
}

describe(`CalculatorComponent`, () => {
  let fixture: ComponentFixture<CalculatorComponent>;
  let compiled: HTMLElement;
  let component: CalculatorComponent;

  let mockCalculatorService: MockCalculatorService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorComponent],
      providers: [
        {
          provide: CalculatorService,
          useClass: MockCalculatorService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CalculatorComponent);
    compiled = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;

    // Inject the mock service to be used by the component
    mockCalculatorService = TestBed.inject(
      CalculatorService
    ) as unknown as MockCalculatorService;
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create the app', () => {
    expect(compiled).toBeTruthy();
    expect(component).toBeTruthy();
  });

  it('should has the current properties values', () => {
    expect(component.resultText()).toBe('100.00');
    expect(component.subResultText()).toBe('20');
    expect(component.lastOperator()).toBe('-');
  });

  it('should display calculation values', () => {
    mockCalculatorService.resultText.and.returnValue('123');
    mockCalculatorService.subResultText.and.returnValue('456');
    mockCalculatorService.lastOperator.and.returnValue('*');

    fixture.detectChanges();

    // html values
    expect(compiled.querySelector('#subResult')?.textContent).toContain(
      '456 *'
    );
    expect(compiled.querySelector('#result')?.textContent).toContain('123');

    // component values
    expect(component.resultText()).toBe('123');
    expect(component.subResultText()).toBe('456');
    expect(component.lastOperator()).toBe('*');
  });

  it('should have 19 calculator-button components', () => {
    expect(component.calculatorButtons()).toBeTruthy();
    expect(component.calculatorButtons().length).toBe(19);
  });

  it('should have 19 calculator-button components with content projection', () => {
    const buttonsByDirective = fixture.debugElement.queryAll(
      By.directive(CalculatorButtonComponent)
    );

    expect(buttonsByDirective).toBeTruthy();
    expect(buttonsByDirective.length).toBe(19);

    const buttonsByCss = fixture.debugElement.queryAll(
      By.css('calculator-button')
    );
    expect(buttonsByCss).toBeTruthy();
    expect(buttonsByCss.length).toBe(19);

    // Better way
    const buttons = compiled.querySelectorAll('calculator-button');

    expect(buttons).toBeTruthy();
    expect(buttons.length).toBe(19);

    expect(buttons[0].textContent?.trim()).toBe('C');
    expect(buttons[1].textContent?.trim()).toBe('+/-');
    expect(buttons[2].textContent?.trim()).toBe('%');
    expect(buttons[3].textContent?.trim()).toBe('÷');
  });

  it('should handle keyboard Enter event correctly', () => {
    const eventEnter = new KeyboardEvent('keyup', { key: 'Enter' });
    document.dispatchEvent(eventEnter);
    expect(mockCalculatorService.constructNumber).toHaveBeenCalledWith('=');
  });

  it('should handle keyboard Escape event correctly', () => {
    const eventEscape = new KeyboardEvent('keyup', { key: 'Escape' });
    document.dispatchEvent(eventEscape);
    expect(mockCalculatorService.constructNumber).toHaveBeenCalledWith('C');
  });

  it('should display result correctly', () => {
    mockCalculatorService.resultText.and.returnValue('123');
    fixture.detectChanges();
    const result = compiled.querySelectorAll('span')[1].innerText;

    expect(result).toBe('123');
  });
});
