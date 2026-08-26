import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClienteApi, ClienteFiltros } from '@proj/domain/clientes/model';

// ── Service HTTP puro ──
// Por qué: esta es la ÚNICA clase que conoce la URL y el shape del backend.
// Si cambia la API, solo se toca aquí.
@Injectable({ providedIn: 'root' })
export class ClientesService {
  private readonly http = inject(HttpClient);
  private readonly API = '/api/clientes';

  getAll(filtros?: ClienteFiltros): Observable<ClienteApi[]> {
    const params: Record<string, string> = {};
    if (filtros?.busqueda) params['busqueda'] = filtros.busqueda;
    if (filtros?.soloActivos !== undefined)
      params['soloActivos'] = String(filtros.soloActivos);

    return this.http.get<ClienteApi[]>(this.API, { params });
  }

  getById(id: number): Observable<ClienteApi> {
    return this.http.get<ClienteApi>(`${this.API}/${id}`);
  }
}
