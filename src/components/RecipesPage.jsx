import React from "react";
import Search from './Search';
import Header from './Header';

function RecipesPage({ search, handleChange, handleSubmit, loading, renderLoader, renderRecipes, selected, renderRecipe, recipe, renderIngredientsList, renderListTag, addedToCart, renderShoppingCart }) {
	return (
		<div>
            <Header />
			<div className="app-container">
				<div className="row mt-4 justify-content-md-center">
					<Search search={search} handleChange={handleChange} handleSubmit={handleSubmit} />
				</div>

				<div className="row text-center justify-content-md-center">
					<div className="col-md-3 m-2 p-2">
						<h1 className="recipes__heading">Recipes</h1>
					</div>
					<div className="col-md-5 m-2 p-2">
						<h1 className="middle__heading">Your Recipe</h1>
					</div>
					<div className="col-md-3 m-2 p-2">
						<h1 className="ingredient__heading">Ingredients</h1>
					</div>
				</div>

				<div className="row text-center justify-content-md-center">
					<div className="col-md-3 m-2 p-2 recipes-div">{loading ? renderLoader() : renderRecipes()}</div>

					<div className="col-md-5 m-2 p-2 middle-div justify-content-md-center">
						{selected ? renderRecipe(recipe) : ""}
						{selected ? renderIngredientsList(recipe.ingredientLines) : ""}
						{selected ? renderListTag(recipe) : ""}
					</div>

					<div className="col-md-3 m-2 p-2 ingredients-div">
						<div>{addedToCart ? renderShoppingCart() : ""}</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default RecipesPage;
