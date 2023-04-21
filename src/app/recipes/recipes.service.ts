import { Injectable } from '@angular/core';
import { FormArray } from '@angular/forms';
import { Subject } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  recipesChanged = new Subject<Recipe[]>;

  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'Hambúrguer do Guará',
  //     'Receita de Hambúrguer',
  //     'https://cursodohamburguerperfeito.com.br/wp-content/uploads/2021/08/Burger-280931852.png',
  //     [
  //       new Ingredient('Carne', 1),
  //       new Ingredient('Alface', 2),
  //       new Ingredient('Queijo Cheedar', 3)
  //     ]),
  //   new Recipe(
  //     'Torta de Frango',
  //     'Receita de Torta de Frango',
  //     'https://cdn.sodiedoces.com.br/wp-content/uploads/2021/11/25112504/torta_frango_requeijao_615x500px-min-2-e1637679483871.png',
  //     [
  //       new Ingredient('Massa', 1),
  //       new Ingredient('Frango', 3),
  //       new Ingredient('Manteiga', 1)
  //     ])
  // ];

  private recipes: Recipe[] = [];


  constructor(private slService: ShoppingListService){

  }

  setRecipes(recipes: Recipe[]){
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes(){
    return this.recipes.slice();
  }

  getRecipe(id: number){
    return this.recipes[id];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]){
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe){
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
