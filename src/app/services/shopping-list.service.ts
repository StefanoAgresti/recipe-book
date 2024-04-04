import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../interfaces/ingredient';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  constructor() {}

  ingredients: Ingredient[] = [];
  ingredientsChanged = new Subject<Ingredient[]>();
  editMode = new Subject<number>();

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }
}
