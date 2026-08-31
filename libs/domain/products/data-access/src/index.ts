// products-data-access: service HTTP + facade con signals.
// Reglas:
//   - Esta capa es la UNICA que conoce la URL del backend.
//   - Features NUNCA consume el service directo: lo hace a través del facade.
//   - Inyectá API_URL (de @proj/core) para la base URL.
export {};
