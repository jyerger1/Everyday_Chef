import React from 'react';

export default function FavoritesTile({ recipe }) {
    return (
        <div className="col-md-4 favorites__tile my-3">
            <img className="favorites__tile-image" src={recipe.image} alt={recipe.label} />
            <h3 className='favorites__tile-title'>{recipe.label}</h3>
        </div>
    )
}
