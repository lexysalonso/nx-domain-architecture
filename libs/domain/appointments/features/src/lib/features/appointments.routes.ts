import { Routes } from '@angular/router';

export const APPOINTMENTS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./appointments-list-container').then(
        (m) => m.AppointmentsListContainer,
      ),
  },
];
