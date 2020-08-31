import React from "react";
import "../style/List.css";

function List({ ingredients, formatCount }) {
	return (
		<div className="recipe__ingredients">
			<ul className="recipe__ingredient-list">
				<li className="recipe__item">
					<svg className="recipe__icon">
						<use href="img/icons.svg#icon-check"></use>
					</svg>
					<div className="recipe__count">{formatCount(ingredients.count)}</div>
					<div className="recipe__ingredient">
						<span className="recipe__unit">{ingredients.unit}</span>
						{ingredients.ingredient}
					</div>
				</li>
			</ul>
		</div>
	);
}

export default List;
