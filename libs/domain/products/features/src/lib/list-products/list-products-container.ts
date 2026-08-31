import {
  Component,
  ChangeDetectionStrategy,
  inject,
  computed,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { ProductsFacade } from '@proj/domain/products/data-access';
import { toProductViewModel } from '@proj/domain/products/model';
import {
  ContainerProductHeaderComponent,
  ProductTableComponent,
} from '@proj/domain/products/ui';

@Component({
  selector: 'app-list-products-container',
  standalone: true,
  imports: [ProductTableComponent, ContainerProductHeaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (facade.error(); as error) {
      <div
        class="flex items-center justify-between p-4 mb-4 text-red-700 bg-red-100 rounded-lg"
      >
        <span>{{ error }}</span>
        <button (click)="facade.loadProducts()" class="text-sm underline">
          Reintentar
        </button>
      </div>
    }
    <container-product-header
      [search]="facade.search()"
      [statusFilter]="facade.statusFilter()"
      (searchChange)="facade.setSearch($event)"
      (statusChange)="facade.setStatusFilter($event)"
    />

    <app-product-table
      [products]="viewModels()"
      [loading]="facade.loading()"
      (edit)="onEdit($event)"
      (delete)="onDelete($event)"
    />
  `,
})
export class ListProductsContainer implements OnInit {
  protected readonly facade = inject(ProductsFacade);
  private readonly router = inject(Router);
  protected readonly viewModels = computed(() =>
    this.facade.products().map(toProductViewModel),
  );

  onEdit(id: string): void {
    this.router.navigate(['/products/edit', id]);
  }

  onDelete(id: string): void {
    const resultConfirm = confirm(
      'Desea eliminar este elemento permanentemente.',
    );
    if (!resultConfirm) return;
    this.facade.delete(id);
  }

  ngOnInit(): void {
    this.facade.init();
  }
}
