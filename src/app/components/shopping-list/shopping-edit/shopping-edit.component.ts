import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingredient } from 'src/app/interfaces/ingredient';
import { ShoppingListService } from 'src/app/services/shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('ingredientForm') ingredientForm!: NgForm;
  editMode: boolean = false;
  editedItemIndex!: number;
  editedItem!: Ingredient;

  constructor(private slService: ShoppingListService) {}

  ngOnInit(): void {
    this.slService.editMode.subscribe((index: number) => {
      this.editMode = true;
      this.editedItemIndex = index;
      this.editedItem = this.slService.getIngredient(index);
      this.ingredientForm.form.patchValue({
        name: this.editedItem.name,
      });
    });
  }

  onSubmit(ingredientForm: NgForm) {
    if (this.editMode) {
      this.slService.updateIngredient(
        this.editedItemIndex,
        ingredientForm.value
      );
    } else {
      this.slService.addIngredient(ingredientForm.value);
    }
    this.editMode = false;
    ingredientForm.reset();
  }

  onDelete() {
    this.slService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

  onClear() {
    this.editMode = false;
    this.ingredientForm.reset();
  }
}
