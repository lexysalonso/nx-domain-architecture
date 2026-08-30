import {
  Component,
  ChangeDetectionStrategy,
  inject,
  input,
  computed,
} from '@angular/core';
import { Router } from '@angular/router';
import { ProductsFacade } from '@proj/domain/products/data-access';
import {
  ProductFormValue,
} from '@proj/domain/products/model';
import { ProductFormComponent } from '@proj/domain/products/ui';

@Component({
  selector: 'app-edit-product-container',
  standalone: true,
  imports: [ProductFormComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (product(); as p) {
      <app-product-form [product]="p" (submit)="onSubmit($event)" />
    }
  `,
})
export class EditProductContainer {
  id = input<string>(''); // viene de la ruta :id
  private readonly facade = inject(ProductsFacade);
  private readonly router = inject(Router);

  protected readonly product = computed(() => {
    return this.facade.products().find((p) => p.id === this.id());
  });

  onSubmit(value: ProductFormValue): void {
    this.facade.updateProduct(this.id(), value).subscribe(() => {
      this.router.navigate(['/products']);
    });
  }
}
