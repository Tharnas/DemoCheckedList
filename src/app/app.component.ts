import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSelectionListChange } from '@angular/material/list';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  products: { name: string; id: number }[] = [
    { name: 'Apple', id: 1 },
    { name: 'Orange', id: 2 },
    { name: 'Banana', id: 3 },
    { name: 'Pear', id: 4 },
  ];
  public productsForm: FormGroup;

  constructor(fb: FormBuilder) {
    this.productsForm = fb.group({
      products: [''],
    });
  }

  public selectionChanged(event: MatSelectionListChange): void {
    const unselected = event.options
      .filter((x) => x.selected === false)
      .map((x) => x.value);

    const newSelection = (<{ name: string; id: number }[]>(
      this.productsForm.value.products
    )).filter((x) => !unselected.some((y) => y.id === x.id));

    this.productsForm.patchValue({ products: newSelection });
  }
}
