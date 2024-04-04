import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { RecipesService } from 'src/app/services/recipes.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private recipesService: RecipesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  editMode!: boolean;
  id!: string;

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      if (this.id) {
        this.editMode = true;
      } else this.editMode = false;

      this.initForm();
    });
  }

  recipeForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    imageURL: ['', [Validators.required]],
    ingredients: this.formBuilder.group({
      name: ['', [Validators.required]],
    }),
  });

  initForm() {
    if (this.editMode) {
      this.recipesService.getRecipeById(this.id).subscribe((recipe: any) => {
        this.recipeForm.patchValue({
          name: recipe.name,
          description: recipe.description,
          imageURL: recipe.imageURL,
          ingredients: recipe.ingredients,
        });
      });
    }
  }

  onSubmit() {
    if (!this.recipeForm.valid) return;

    if (this.editMode) {
      this.recipesService.editRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipesService.sendRecipe(this.recipeForm.value);
    }

    this.recipeForm.reset();
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
