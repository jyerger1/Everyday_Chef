// Basic Imports
import React from "react";

//Style Imports
import "bootstrap/dist/css/bootstrap.min.css";
import "../style/Favorites.css";

import { Icon } from "@iconify/react";
import heartSolid from "@iconify/icons-clarity/heart-solid";

function Favorites({ renderFavorites, user }) {
	return (
		<div className="app-container">
			<div id="header-div" className="row d-flex justify-content-center text-center"></div>

			<div id="fave-text-div" className="row d-flex justify-content-center text-center">
				<div id="fave-col1" className="col-md-4">
					<h1 id="username">{user.firstName}</h1>
				</div>
				<div id="fave-col2" className="col-md-4">
					<h1 id="fav-logo">Favorites</h1>
				</div>
				<div id="fave-col3" className="col-md-4">
					<Icon id="heart" icon={heartSolid} />
				</div>
			</div>

			<div id="fave-main-div" className="row d-flex justify-content-center text-center">
				<div id="main-col" className="row">
					{renderFavorites()}
				</div>
			</div>
		</div>
	);
}

export default Favorites;
