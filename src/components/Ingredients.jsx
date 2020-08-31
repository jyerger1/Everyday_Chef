import React from "react";
import "../style/Ingredients.css";

function Ingredients({ item }) {
	return (
		<div className="shopping">
			<li className="shopping__item">
				<div className="shopping__count">
					<input className="shopping__count-value" type="number" defaultValue={item.count} step={item.count} />
					<p>{item.unit}</p>
				</div>
				<p className="shopping__description">{item.ingredient}</p>
				<button className="shopping__delete btn btn-danger">x</button>
			</li>
		</div>
	);
}

export default Ingredients;
