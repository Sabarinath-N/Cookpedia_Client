export class RecipeModel {

    name?: String;
    ingredients?: Array<string>;
    instructions?: Array<string>;
    prepTimeMinutes?: Number;
    cookTimeMinutes?: Number;
    servings?: Number;
    difficulty?: String;
    cuisine?: String;
    caloriesPerServing?: Number;
    image?: String;
    mealType?: Array<string>;

}