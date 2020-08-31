import React from 'react';
import Header from './Header';
import Favorites from './Favorites'

function FavoritesPage( { renderFavorites, user }) {

    return (
        <div>
            <Header />
			<Favorites
                user={user}
				renderFavorites={renderFavorites}
			    />
        </div>
    )

}

export default FavoritesPage