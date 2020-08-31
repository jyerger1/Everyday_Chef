// Basic Imports
import React, { useState, useEffect, useReducer } from "react";
import { withRouter } from 'react-router';
import { Switch, Route, Redirect } from "react-router-dom";
import axios from "axios";

//Component Imports
import Footer from "./Footer";
import Recipes from "./Recipes";
import Recipe from "./Recipe";
import Ingredients from "./Ingredients";
import List from "./List";
import ListTag from "./ListTag";
import FavoritesTile from "./FavoritesTile";
import LoginPage from "./LoginPage";
import UserPage from "./UserPage";
import RecipesPage from "./RecipesPage";
import FavoritesPage from "./FavoritesPage";
import { ProtectedRoute } from './ProtectedRoute';
import auth from './Auth';

//Import Functions
import { formatCount, parseIngredients } from "../script/logic";

//Style Imports
import "bootstrap/dist/css/bootstrap.min.css";
import "../style/App.css";

//Dependency Imports
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";

//  =========== Beginning of Code ===========

library.add(fab, fas);

const recipesApiCall = "https://everydaychef-api.herokuapp.com/recipes?q=";
const usersApiCall = "https://everydaychef-api.herokuapp.com/signup";
const loginApiCall = "https://everydaychef-api.herokuapp.com/login";
const favoriteCall = "https://everydaychef-api.herokuapp.com/favorites";
const proxy = "https://cors-anywhere.herokuapp.com/";

function useRecipe(query) {
	const [loading, setLoading] = useState(false);
	const [results, setResults] = useState([]);

	useEffect(() => {
		async function getRecipes() {
			try {
				setLoading(true);
				let response = await fetch(`${proxy}${recipesApiCall}${query}`);
				let data = await response.json();

				setResults(
					data.map((recipe) => {
						return recipe.recipe;
					})
				);
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		}

		if (query !== "") {
			getRecipes();
		}
	}, [query]);

	return [results, loading];
}

function App(props) {
	// APP STATE

	// State from the Query
	const [search, setSearch] = useState("");
	const [query, setQuery] = useState("");
	const [recipes, loading] = useRecipe(query);

	// State for selecting Recipe
	const [recipe, setRecipe] = useState("");
	const [selected, setSelected] = useState(false);
	const [active, setActive] = useState(false);

	// State for adding to Cart
	const [addedToCart, setAddedToCart] = useState(false);
	const [cart, setCart] = useState([]);

	// User Sign up
	const [userSignUp, setUserSignUp] = useReducer((state, newState) => ({ ...state, ...newState }), {
		firstName: "",
		lastName: "",
		userName: "",
		email: "",
		password: "",
	});

	const [userEntity, setUserEntity] = useState({})

	const [isSignedUp, setIsSignedUp] = useState(false);

	// User Login
	const [userLogin, setUserLogin] = useReducer((state, newState) => ({ ...state, ...newState }), {
		userName: "",
		password: "",
	});

	const [favorites, setFavorites] = useState([]);
	const [loadedFavorites, setLoadedFavorites] = useState(false)

	// Other
	const [modal, setModal] = useState(false);

	// APP Event Handlers
	useEffect(() =>{

		let user = parseInt(sessionStorage.getItem("UserID"));

		console.log(user);
		axios({
			method: "get",
			url: `${proxy}${favoriteCall}?userId=${user}`,
			responseType: 'stream'
		})
		.then(response => {
			console.log(response.data.user);
			setUserEntity(response.data.user);
			return response.data.user.favorites;
		})
		.then(favorites => {
			
			setFavorites(favorites.map((recipe, index) => {
				return (
					<FavoritesTile 
						key={index} 
						recipe={recipe} 
						image={recipe.image} 
						label={recipe.label} 
						/>);
				}))
			setLoadedFavorites(true);
			}
		)

	}, [])


	const handleChange = (e) => {
		setSearch(e.target.value);
	};

	const handleChangeSignup = (e) => {
		const input = e.target.name;
		const newValue = e.target.value;

		setUserSignUp({ [input]: newValue });
	};

	const handleChangeLogin = (e) => {
		const input = e.target.name;
		const newValue = e.target.value;

		setUserLogin({ [input]: newValue });
	};

	const showModal = () => {
		setModal(true);
	};

	const hideModal = () => {
		setModal(false);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setQuery(search);
	};

	const handleClick = (e, selectedRecipe) => {
		setRecipe(selectedRecipe);
		setSelected(true);


	};

	// API End point calls

	const handleSignupSubmission = (e) => {
		e.preventDefault();

		axios({
			method: "post",
			url: `${proxy}${usersApiCall}`,
			data: {
				firstName: userSignUp.firstName,
				lastName: userSignUp.lastName,
				userName: userSignUp.userName,
				email: userSignUp.email,
				password: userSignUp.password,
			},
		})
			.then((response) => {
				console.log(response);
				hideModal();
				alert("Signup successful!")
			})
			.catch((error) => {
				alert("Invalid recipe search, please try again.");
				console.log(error);
			});
	};

	const handleSubmitLogin = (e) => {
		e.preventDefault();

		axios({
			method: "post",
			url: `${proxy}${loginApiCall}`,
			data: {
				userName: userLogin.userName,
				password: userLogin.password,
			},
		})
		.then((response) => {
			console.log(response);
			let user = response.data.user;
			let status = response.data.status;
			console.log(status);
			console.log(user);

			if (status === "success") {
				sessionStorage.setItem("UserID", user.id);
				auth.login(() => {
					props.history.push("/recipes");
				});
			} else {
				alert("Username or password is incorrect!")
			}
		})
		.catch((error) => {
				console.log(error);
		});
	};

	const handleRecipeFavorite = () => {
		
		let userId = parseInt(sessionStorage.getItem("UserID"));

		axios({
			method: "post",
			url: `${proxy}${favoriteCall}`,
			data: {
				userId: userId,
				recipe: recipe,
			},
		})
			.then((response) => {
				console.log(response);
				alert("This recipe has been added to your favorites!")
			})
			.catch((error) => {
				console.log(error);
			});
	};

	// GET Methods

	const getAddedToCart = () => {
		addToShoppingCart(recipe);
		setAddedToCart(true);
	};

	// Render methods
	const renderRecipes = () => {
		return recipes.map((recipe, index) => {
			return <Recipes key={index} recipe={recipe} active={active} recipeId={recipe.recipeId} label={recipe.label} image={recipe.image} source={recipe.source} handleClick={handleClick} />;
		});
	};

	const renderRecipe = (recipe) => {
		return <Recipe recipe={recipe} label={recipe.label} image={recipe.image} yield={recipe.yield} totalTime={recipe.totalTime} handleRecipeFavorite={handleRecipeFavorite} />;
	};

	const renderIngredientsList = (ingredientsList) => {
		const newIngredients = parseIngredients(ingredientsList);

		return newIngredients.map((ingredient, index) => {
			return <List key={index} ingredients={ingredient} count={ingredient.count} unit={ingredient.unit} ingredient={ingredient.ingredient} url={ingredient.url} formatCount={formatCount} />;
		});
	};

	const renderListTag = (recipe) => {
		return <ListTag recipe={recipe} url={recipe.url} source={recipe.source} addedToCart={getAddedToCart} />;
	};

	const addToShoppingCart = (recipe) => {
		const ingredientsList = parseIngredients(recipe.ingredientLines);

		return ingredientsList.forEach((ingredient) => {
			setCart((item) => [...item, ingredient]);
		});
	};

	const renderShoppingCart = () => {
		return cart.map((item, index) => {
			return <Ingredients key={index} item={item} count={item.count} unit={item.unit} ingredient={item.ingredient} />;
		});
	};

	const renderLoader = () => {
		return (
			<div className="loader my-5">
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		);
	};

	const renderFavorites = () => {

		if(loadedFavorites) {
			return favorites
		}
		
	};

	return (
		<div className="container-fluid">
			<Switch>
				<Route path="/login" component={LoginPage}>
					<LoginPage 
						showModal={showModal} 
						userLogin={userLogin} 
						handleChangeLogin={handleChangeLogin} 
						handleSubmitLogin={handleSubmitLogin} 
						modal={modal} 
						hideModal={hideModal} 
						userSignUp={userSignUp} 
						handleChangeSignup={handleChangeSignup} 
						handleSignupSubmission={handleSignupSubmission} 
						/>
				</Route>

				<Route path="/user" component={UserPage}>
					<UserPage
						user={userEntity}
					 />
				</Route>

				<ProtectedRoute path="/recipes" component={RecipesPage}>
					<RecipesPage 
						search={search} 
						handleChange={handleChange} 
						handleSubmit={handleSubmit} 
						loading={loading} 
						renderLoader={renderLoader} 
						renderRecipes={renderRecipes} 
						selected={selected} 
						renderRecipe={renderRecipe} 
						recipe={recipe} 
						renderIngredientsList={renderIngredientsList} 
						renderListTag={renderListTag} 
						addedToCart={addedToCart} 
						renderShoppingCart={renderShoppingCart} 
						/>
				</ProtectedRoute>

				<Route path="/favorites" component={FavoritesPage}>
					<FavoritesPage 
						user={userEntity}
						renderFavorites={renderFavorites} 
						/>
				</Route>

				<Route path="/">
					<Redirect to="/login" />
				</Route>

				<Route path="*" component={() => "404 NOT FOUND"} />
			</Switch>

			<div className="row d-flex justify-content-center text-center footer-div">
				<Footer />
			</div>
		</div>
	);
}

export default withRouter(App);
