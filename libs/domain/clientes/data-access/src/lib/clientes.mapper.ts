import { ClienteApi, ClienteViewModel } from '@proj/domain/clientes/model';

// ── Mapper: Api → ViewModel ──
// Por qué: la conversión vive aquí, no en el componente.
// Si el backend cambia un campo, un solo punto de corrección.
export function toViewModel(api: ClienteApi): ClienteViewModel {
  return {
    id: api.id,
    nombreCompleto: `${api.nombre} ${api.apellido}`,
    email: api.email,
    estado: api.activo ? 'Activo' : 'Inactivo',
    fechaCreacion: new Date(api.fechaCreacion),
  };
}
