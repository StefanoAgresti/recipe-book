import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  constructor(private db: AngularFireDatabase) {}

  recipesDbRef: AngularFireList<any> = this.db.list('recipes');

  sendRecipe(recipeValue: any) {
    this.recipesDbRef
      .push({
        name: recipeValue.name,
        description: recipeValue.description,
        imageURL: recipeValue.imageURL,
        ingredients: recipeValue.ingredients,
      })
      .then(() => console.log('ok!'))
      .catch((error) => console.log(error));
  }

  editRecipe(id: string, recipeValue: any) {
    this.recipesDbRef.update(id, recipeValue);
  }

  deleteRecipe(id: string) {
    this.recipesDbRef.remove(id);
  }

  getRecipeById(id: string) {
    return this.db.object(`recipes/${id}`).valueChanges();
  }
}
