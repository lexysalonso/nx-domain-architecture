// ── API Backend (forma cruda que viene del HTTP) ──
export interface ClienteApi {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  activo: boolean;
  fechaCreacion: string;
}

// ── ViewModel para la UI ──
// Por qué separado: la UI no necesita conocer los 15 campos del backend.
// El ViewModel es el contrato entre data-access y la vista.
export interface ClienteViewModel {
  id: number;
  nombreCompleto: string;
  email: string;
  estado: 'Activo' | 'Inactivo';
  fechaCreacion: Date;
}

// ── Filtros de búsqueda ──
export interface ClienteFiltros {
  busqueda?: string;
  soloActivos?: boolean;
}
