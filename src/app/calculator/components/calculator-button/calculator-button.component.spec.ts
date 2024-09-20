import { Component } from '@angular/core';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { CalculatorButtonComponent } from './calculator-button.component';

@Component({
  standalone: true,
  imports: [CalculatorButtonComponent],
  template: ` <calculator-button>
    <span class="projected-content underline">Test Content</span>
  </calculator-button>`,
})
class TestHostComponent {}

describe(`CalculatorButtonComponent`, () => {
  let fixture: ComponentFixture<CalculatorButtonComponent>;
  let compiled: HTMLElement;
  let component: CalculatorButtonComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CalculatorButtonComponent);
    compiled = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;

    // It Detects component's input changes
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(compiled).toBeTruthy();
    expect(component).toBeTruthy();
  });

  it('should should apply w-1/4 class if doubleSize is false', () => {
    const hostCssClasses: string[] = compiled.classList.value.split(' ');

    expect(hostCssClasses).toContain('w-1/4');
    expect(component.isDoubleSize()).toBeFalsy();
  });

  it('should should apply w-2/4 class if doubleSize is true', () => {
    fixture.componentRef.setInput('isDoubleSize', true);
    fixture.detectChanges();

    const hostCssClasses: string[] = compiled.classList.value.split(' ');

    expect(hostCssClasses).toContain('w-2/4');
    expect(component.isDoubleSize()).toBeTruthy();
  });

  it('should emit onclick when handleClick is called', () => {
    // spies
    spyOn(component.onClick, 'emit');

    component.handleClick();

    expect(component.onClick.emit).toHaveBeenCalled();
  });

  it('should set isPressed to true and then false when keyboardPressedStyle is called with a matching key', (done) => {
    // Arrange: set content value of button to '1'
    component.contentValue()!.nativeElement.innerText = '1';

    // Act: call keyboardPressedStyle with '1'
    component.keyboardPressedStyle('1');

    // Assert:
    expect(component.isPressed).toBeTruthy();

    setTimeout(() => {
      expect(component.isPressed()).toBeFalsy();
      done();
    }, 101);
  });
  it('should not set isPressed to true if key is not matching', () => {
    component.contentValue()!.nativeElement.innerText = '1';

    component.keyboardPressedStyle('2');

    expect(component.isPressed()).toBeFalsy();
  });

  it('should render projected content', () => {
    const testHostFixture = TestBed.createComponent(TestHostComponent);
    const compiled = testHostFixture.nativeElement as HTMLDivElement;

    const projectedContent = compiled.querySelector('.projected-content');

    expect(projectedContent?.textContent).not.toBeNull();
    expect(projectedContent?.textContent).toBe('Test Content');

    expect(projectedContent?.classList.contains('underline')).toBeTruthy();
  });
});
