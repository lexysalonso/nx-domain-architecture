import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-exercise-placeholder',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="p-8 text-center">
      <h2 class="text-2xl font-semibold text-gray-700">Listo para implementar</h2>
      <p class="mt-2 text-gray-500">
        La estructura del dominio está disponible para trabajar.
      </p>
      <p class="mt-1 text-sm text-gray-400">
        Capas: model · data-access · features · ui
      </p>
    </div>
  `,
})
export class ExercisePlaceholderComponent {}
