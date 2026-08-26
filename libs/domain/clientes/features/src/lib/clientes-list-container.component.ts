import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { ClientesFacade } from '@proj/domain/clientes/data-access';
import { ClientesListComponent } from '@proj/domain/clientes/ui';

// ── Container (Smart Component) ──
// Por qué: solo orquesta datos desde el facade y los pasa al componente
// presentacional. NO tiene lógica de renderizado condicional — eso vive en ui.
@Component({
  selector: 'clientes-features-list-container',
  standalone: true,
  imports: [ClientesListComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <clientes-ui-list
      [clientes]="facade.state().clientes"
      [loading]="facade.state().loading"
      [error]="facade.state().error"
      (clienteSeleccionado)="onSeleccion($event)"
    />
  `,
})
export class ClientesListContainerComponent {
  readonly facade = inject(ClientesFacade);

  onSeleccion(id: number): void {
    console.log('Cliente seleccionado:', id);
  }
}
