import React from "react";
import { Icon } from "@iconify/react";
import heartSolid from "@iconify/icons-clarity/heart-solid";

import "../style/Recipe.css";

function Recipe({ recipe, handleRecipeFavorite }) {
	return (
		<div className="recipe">
			<figure className="recipe__fig">
				<img src={recipe.image} alt={recipe.label} className="recipe__img" />
				<h1 className="recipe__title">
					<span className="recipe__title-span">{recipe.label}</span>
				</h1>
			</figure>
			<div className="recipe__details">
				<div className="recipe__info">
					<span className="recipe__info-data recipe__info-data--minutes">{recipe.yield}</span>
					<span className="recipe__info-text"> minutes</span>
				</div>
				<div className="recipe__info">
					<span className="recipe__info-data recipe__info-data--people">{recipe.totalTime}</span>
					<span className="recipe__info-text"> servings</span>
				</div>

				<button className="recipe__love btn btn-danger" onClick={handleRecipeFavorite}><Icon icon={heartSolid} /></button>
			</div>
		</div>
	);
}

export default Recipe;
