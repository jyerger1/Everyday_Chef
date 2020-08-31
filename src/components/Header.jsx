import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from 'react-router';
import auth from "./Auth";

import "../style/Header.css";
import { Icon } from "@iconify/react";
import chefHat from "@iconify/icons-mdi/chef-hat";
import heartSolid from "@iconify/icons-clarity/heart-solid";
import outlineLogin from "@iconify/icons-ic/outline-login";
import baselineFoodBank from "@iconify/icons-ic/baseline-food-bank";
import personFill from "@iconify/icons-bi/person-fill";

function Header(props) {
  return (
    <div className="container header-container">
      <div className="row justify-content-md-center">
        <h1 className="heading__main-title logo">
          <span className="hat-icon-red shadow-drop-lr">
            <Icon icon={chefHat} /> <br></br>
          </span>
          Everyday
          <span className="chef-red">Chef</span>
        </h1>
      </div>

      <div className="row text-center my-4">
        <div className="col-md-3">
          <Link to="/user" className="pop">
            <h1 className="heading__link-title">
              <Icon icon={personFill} />
              Profile
            </h1>
          </Link>
        </div>

        <div className="col-md-3">
          <Link to="/recipes" className="pop">
            <h1 className="heading__link-title">
              <Icon icon={baselineFoodBank} />
              Recipes
            </h1>
          </Link>
        </div>

        <div className="col-md-3">
          <Link to="/favorites" className="pop">
            <h1 className="heading__link-title">
              <Icon icon={heartSolid} />
              Favorites
            </h1>
          </Link>
        </div>

        <div className="col-md-3">
          <button onClick={() => {
            auth.logout(() => {
              props.history.push("/")
            })
          }} 
          className="signout pop">
            <h1 className="heading__link-title">
              <Icon icon={outlineLogin} />
              Sign Out
            </h1>
          </button>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Header);

// test
