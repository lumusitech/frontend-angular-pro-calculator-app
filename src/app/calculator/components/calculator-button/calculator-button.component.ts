import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  input,
  output,
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
    class: 'w-1/4 border-r border-b border-indigo-400',
    //? We can add more attributes to the host component
    // attribute: 'something',
    // 'x-data': 'XL',
  },
})
export class CalculatorButtonComponent {
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

  //? is-command is a local CSS class, so if we use it here,
  //? it will not be applied to the host component,
  // @HostBinding('class.is-command') get commandStyle() {
  //   return this.isCommand();
  // }

  //? w-2/4 is a GLOBAL tailwind class, so we can use it in any component
  @HostBinding('class.w-2/4') get doubleSizeStyle() {
    return this.isDoubleSize();
  }

  public handleClick() {
    if (!this.contentValue()?.nativeElement) return;

    const value = this.contentValue()!.nativeElement.innerText;

    this.onClick.emit(value.trim());
  }
}
