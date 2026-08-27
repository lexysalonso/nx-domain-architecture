import {
  Component,
  ChangeDetectionStrategy,
  inject,
  computed,
  OnInit,
} from '@angular/core';
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
    <container-product-header
      [search]="facade.search()"
      [statusFilter]="facade.statusFilter()"
      (searchChange)="facade.setSearch($event)"
      (statusChange)="facade.setStatusFilter($event)"
    />
    <app-product-table [products]="viewModels()" [loading]="facade.loading()" />
  `,
})
export class ListProductsContainer implements OnInit {
  protected readonly facade = inject(ProductsFacade);

  protected readonly viewModels = computed(() =>
    this.facade.products().map(toProductViewModel),
  );

  ngOnInit(): void {
    this.facade.init();
  }
}
