import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  signal,
  viewChild,
  type ElementRef,
} from '@angular/core';

@Component({
  selector: 'calculator-button',
  standalone: true,
  imports: [],
  templateUrl: './calculator-button.component.html',
  styleUrls: ['./calculator-button.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'border-r border-b border-indigo-400',
    '[class.w-2/4]': 'isDoubleSize()',
    '[class.w-1/4]': '!isDoubleSize()',
    //? We can add more attributes to the host component
    // attribute: 'something',
    // 'x-data': 'XL',
  },
})
export class CalculatorButtonComponent {
  public isPressed = signal(false);
  // output property
  public onClick = output<string>();
  public contentValue = viewChild<ElementRef<HTMLButtonElement>>('button');

  // property
  public isCommand = input(false, {
    //? transform method is called before the signal value is set, before ngOnInit
    transform: (value: boolean | string) =>
      typeof value === 'string' ? value === '' : value,
  });

  // property
  public isDoubleSize = input(false, {
    transform: (value: boolean | string) =>
      typeof value === 'string' ? value === '' : value,
  });

  //? Not recommended
  //? is-command is a local CSS class, so if we use it here,
  //? it will not be applied to the host component,
  // @HostBinding('class.is-command') get commandStyle() {
  //   return this.isCommand();
  // }

  //? Not recommended
  //? w-2/4 is a GLOBAL tailwind class, so we can use it in any component
  //? BETTER: it will be applied to the host component directly
  // @HostBinding('class.w-2/4') get doubleSizeStyle() {
  //   return this.isDoubleSize();
  // }

  public handleClick() {
    if (!this.contentValue()?.nativeElement) return;

    const value = this.contentValue()!.nativeElement.innerText;

    this.onClick.emit(value.trim());
  }

  public keyboardPressedStyle(key: string) {
    if (!this.contentValue()) return;

    const value = this.contentValue()!.nativeElement.innerText;

    if (value !== key) return;

    this.isPressed.set(true);

    setTimeout(() => {
      this.isPressed.set(false);
    }, 100);
  }
}
