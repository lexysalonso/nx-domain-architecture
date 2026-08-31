import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsFacade } from '@proj/domain/products/data-access';
import { ProductFormValue } from '@proj/domain/products/model';
import { ProductFormComponent } from '@proj/domain/products/ui';

@Component({
  selector: 'app-add-product-container',
  standalone: true,
  imports: [ProductFormComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<app-product-form
    [error]="facade.error()"
    (formSubmit)="onSubmit($event)"
  />`,
})
export class AddProductContainer {
  readonly facade = inject(ProductsFacade);
  private readonly router = inject(Router);

  onSubmit(value: ProductFormValue): void {
    this.facade.addProduct(value)?.subscribe({
      next: () => {
        this.router.navigate(['/products']);
      },
    });
  }
}
