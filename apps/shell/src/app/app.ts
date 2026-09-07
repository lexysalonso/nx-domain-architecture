import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="min-h-screen bg-gray-50">
      <header class="bg-white shadow-sm">
        <div class="max-w-4xl mx-auto px-4 py-4 flex items-center gap-8">
          <h1 class="text-xl font-bold text-gray-900">Domain Arch</h1>
          <!-- <nav class="flex gap-4">
            <a
              routerLink="/clientes"
              routerLinkActive="border-b-2 border-blue-600 text-blue-600"
              class="px-3 py-1 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
            >
              Clientes
            </a>
            <a
              routerLink="/products"
              routerLinkActive="border-b-2 border-blue-600 text-blue-600"
              class="px-3 py-1 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
            >
              Products
            </a>
          </nav> -->
        </div>
      </header>
      <main class="max-w-4xl mx-auto px-4 py-8">
        <router-outlet />
      </main>
    </div>
  `,
})
export class App {}
