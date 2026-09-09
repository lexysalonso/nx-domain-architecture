# Nx Domain Architecture Scaffold

Arquitectura escalable basada en dominios para aplicaciones **Angular 19** en un monorepo **Nx**. Este proyecto implementa un patrón de arquitectura hexagonal/screaming architecture enfocado en la separación de responsabilidades y la mantenibilidad a largo plazo.

## 🏗️ Filosofía de Arquitectura

El proyecto está diseñado bajo un modelo de **4 capas por dominio**, impuestas mediante `ESLint module boundaries`:

1.  **`model`**: Tipos, interfaces y mappers puros. Sin dependencias de Angular ni de librerías externas.
2.  **`data-access`**: Facades y servicios HTTP. El Facade es el contrato único hacia las capas superiores.
3.  **`features`**: Containers (smart components). Orquestan el estado (facades) y manejan la lógica de navegación.
4.  **`ui`**: Componentes presentacionales (dumb). Solo `input()`/`output()` (signals). Cero lógica de negocio.

### Reglas de Rendimiento y Reactividad
*   **OnPush Everywhere**: Todos los componentes utilizan `ChangeDetectionStrategy.OnPush` para maximizar el rendimiento.
*   **Signals-First**: Gestión de estado reactivo mediante `signal()`, `computed()` para derivados y `effect()` cuando es necesario.
*   **Zona-less readiness**: La arquitectura está preparada para trabajar en entornos sin Zone.js gracias al uso intensivo de Signals.

### Reglas de Oro
*   **Container/Presentational**: Los componentes UI son tontos; los containers son inteligentes.
*   **Facade Pattern**: Features nunca consumen el `Service` directo. El Facade abstrae la complejidad asíncrona.
*   **Boundary Enforcement**: El linter (`@nx/enforce-module-boundaries`) bloquea importaciones ilegales entre dominios o entre capas prohibidas (ej: `ui` no puede importar `data-access`).

## 🛠 Tech Stack
*   **Angular 19.2** (Standalone + Signals)
*   **Nx Monorepo**
*   **Tailwind CSS 3.4**
*   **RxJS** (integrado con signals vía `takeUntilDestroyed`)
*   **Vitest** (configurado en workspace)

## 📂 Estructura
```text
apps/
  shell/              # Entry point de la aplicación
libs/
  core/               # Interceptors, InjectionTokens, utils globales
  shared/             # UI kit, componentes transversales
  domain/
    {dominio}/
      model/          # Contratos y tipos
      data-access/    # Services y Facades
      features/       # Smart Containers y Rutas
      ui/             # Presentational Components
```

## 🚀 Comandos de Desarrollo

### Instalar dependencias
```bash
npm install
```

### Ejecutar la aplicación
```bash
npx nx serve shell
```

### Linting (Validación de Arquitectura)
Para verificar que se respetan los boundaries definidos en el linter:
```bash
npx nx run-many -t lint
```

### Testing
```bash
npx nx run-many -t test
```

---

*Proyecto configurado para pruebas técnicas. La estructura de dominios está blindada y lista para implementar nuevas funcionalidades escalables.*
