import React from "react";
import "../style/List.css";
import "../style/ListTag.css";

function ListTag({ recipe, addedToCart }) {
  return (
    <div className="main-ListTag-div">
      <button
        className="btn btn-danger recipe__btn"
        onClick={() => addedToCart()}
      >
        Add to shopping list
      </button>

      <div className="recipe__directions">
        <h2 className="heading-2">How to cook it</h2>
        <p className="recipe__directions-text">
          This recipe was carefully designed and tested by
          <span className="recipe__by">{recipe.source}</span>. Please check out
          directions at their website.
        </p>
        <a
          className="btn btn-info btn-small recipe__btn"
          href={recipe.url}
          target="_blank"
        >
          Directions
        </a>
      </div>
    </div>
  );
}

export default ListTag;
