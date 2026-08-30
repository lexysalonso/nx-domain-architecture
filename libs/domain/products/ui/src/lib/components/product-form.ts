import {
  Component,
  ChangeDetectionStrategy,
  output,
  input,
  effect,
} from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ProductFormValue } from '@proj/domain/products/model';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="max-w-md">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-lg font-semibold text-gray-900">Agregar Producto</h2>
        <a
          routerLink="/products"
          class="text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          ← Volver
        </a>
      </div>
      @if (error()) {
        <div
          class="mb-4 p-4 text-sm text-red-700 bg-red-100 rounded-lg border border-red-200"
        >
          {{ error() }}
        </div>
      }
      <form [formGroup]="form" (ngSubmit)="onSubmit()" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Nombre</label
          >
          <input
            formControlName="name"
            placeholder="Nombre del producto"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          @if (form.controls.name.invalid && form.controls.name.touched) {
            <p class="mt-1 text-xs text-red-600">Requerido</p>
          }
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Precio</label
          >
          <input
            formControlName="price"
            type="number"
            step="0.01"
            placeholder="0.00"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          @if (form.controls.price.invalid && form.controls.price.touched) {
            <p class="mt-1 text-xs text-red-600">Mínimo 0.01</p>
          }
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Stock</label
          >
          <input
            formControlName="stock"
            type="number"
            placeholder="0"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          @if (form.controls.stock.invalid && form.controls.stock.touched) {
            <p class="mt-1 text-xs text-red-600">Mínimo 0</p>
          }
        </div>

        <button
          type="submit"
          [disabled]="form.invalid"
          class="w-full px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Guardar
        </button>
      </form>
    </div>
  `,
})
export class ProductFormComponent {
  private readonly fb = new FormBuilder();
  submit = output<ProductFormValue>();
  error = input<string | null>(null);

  product = input<ProductFormValue | null>(null);

  form = this.fb.group({
    name: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(0.01)]],
    stock: [0, [Validators.required, Validators.min(0)]],
  });

  constructor() {
    effect(() => {
      const p = this.product();
      if (p) {
        this.form.patchValue({ name: p.name, price: p.price, stock: p.stock });
      }
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.submit.emit(this.form.getRawValue() as ProductFormValue);
  }
}
