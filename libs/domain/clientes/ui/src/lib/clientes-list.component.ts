import {
  Component,
  input,
  output,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ClienteViewModel } from '@proj/domain/clientes/model';

// ── Componente presentacional puro (Dumb) ──
// Por qué: recibe TODO vía input() y emite vía output().
// Decide qué renderizar (loading, error, lista) según sus props.
// Zero lógica de negocio. Zero llamadas HTTP.
@Component({
  selector: 'clientes-ui-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (loading()) {
      <div class="flex items-center justify-center p-8">
        <p class="text-gray-500">Cargando clientes...</p>
      </div>
    } @else if (error()) {
      <div class="p-4 bg-red-50 rounded-lg">
        <p class="text-red-800">{{ error() }}</p>
      </div>
    } @else {
      <div class="divide-y divide-gray-200 rounded-lg border border-gray-200">
        @for (cliente of clientes(); track cliente.id) {
          <div
            class="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer transition-colors"
            role="button"
            tabindex="0"
            (click)="clienteSeleccionado.emit(cliente.id)"
            (keydown.enter)="clienteSeleccionado.emit(cliente.id)"
            (keydown.space)="clienteSeleccionado.emit(cliente.id)"
          >
            <div>
              <p class="font-medium text-gray-900">
                {{ cliente.nombreCompleto }}
              </p>
              <p class="text-sm text-gray-500">{{ cliente.email }}</p>
            </div>
            <span
              class="text-xs font-medium px-2.5 py-0.5 rounded-full"
              [class]="
                cliente.estado === 'Activo'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              "
            >
              {{ cliente.estado }}
            </span>
          </div>
        } @empty {
          <p class="p-4 text-gray-500 text-center">
            No se encontraron clientes.
          </p>
        }
      </div>
    }
  `,
})
export class ClientesListComponent {
  // Signal-based inputs (Angular 19+)
  clientes = input.required<ClienteViewModel[]>();
  loading = input<boolean>(false);
  error = input<string | null>(null);

  // Signal-based output
  clienteSeleccionado = output<number>();
}
