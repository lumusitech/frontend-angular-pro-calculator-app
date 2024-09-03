import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'calculator',
    loadComponent: () =>
      //? we can avoid "then" method if we set component class with default export
      // import(
      //   './calculator/views/calculator-view/calculator-view.component'
      // ).then((c) => c.CalculatorViewComponent),
      //? with this change:
      import('@/calculator/views/calculator-view/calculator-view.component'),
  },
  {
    path: '**',
    redirectTo: 'calculator',
  },
];
