import { Injectable, inject, signal } from '@angular/core';
import { ClientesService } from './clientes.service';
import { toViewModel } from './clientes.mapper';
import { ClienteViewModel, ClienteFiltros } from '@proj/domain/clientes/model';

// ── Estado de carga ──
export interface ClientesState {
  loading: boolean;
  clientes: ClienteViewModel[];
  error: string | null;
}

// ── Facade: orquesta service + mapper + signals ──
// Por qué: features NUNCA consume el service directamente.
// El facade es el contrato único entre data-access y features.
//
// NOTA: NO usamos toObservable + switchMap porque en zoneless mode
// no emite el valor inicial del signal. Usamos un approach directo
// con subscribe() que funciona en todos los modes.
@Injectable({ providedIn: 'root' })
export class ClientesFacade {
  private readonly service = inject(ClientesService);

  // Signal de estado — la UI lo lee
  readonly state = signal<ClientesState>({
    loading: true,
    clientes: [],
    error: null,
  });

  constructor() {
    this.cargarClientes();
  }

  cargarClientes(filtros?: ClienteFiltros): void {
    this.state.set({ loading: true, clientes: [], error: null });

    this.service.getAll(filtros).subscribe({
      next: (lista) =>
        this.state.set({
          loading: false,
          clientes: lista.map(toViewModel),
          error: null,
        }),
      error: (err) =>
        this.state.set({
          loading: false,
          clientes: [],
          error: err?.message ?? 'Error al cargar clientes',
        }),
    });
  }
}
