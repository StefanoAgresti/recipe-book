import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipesService } from 'src/app/services/recipes.service';
import { ShoppingListService } from 'src/app/services/shopping-list.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  constructor(
    private recipesService: RecipesService,
    private route: ActivatedRoute,
    private router: Router,
    private slService: ShoppingListService
  ) {}

  recipeId!: string;
  recipe: any;

  @ViewChild('notification', { static: false })
  notificationRef!: ElementRef<HTMLDivElement>;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.recipeId = params.get('id')!;
      this.recipesService
        .getRecipeById(this.recipeId)
        .subscribe((recipeData) => {
          this.recipe = recipeData;
        });
    });
  }

  onAddToShoppingList() {
    this.slService.addIngredient(this.recipe.ingredients);

    this.notificationRef.nativeElement.classList.remove('hidden');

    setTimeout(() => {
      this.notificationRef.nativeElement.classList.add('hidden');
    }, 5000);
  }

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDeleteRecipe() {
    if (confirm('Are you sure to delete the recipe?')) {
      this.recipesService.deleteRecipe(this.recipeId);
      this.router.navigate(['/recipes']);
    }
  }
}
