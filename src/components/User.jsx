import React from "react";
import { Icon } from "@iconify/react";
import bxEdit from "@iconify/icons-bx/bx-edit";

import "../style/User.css"

function User({ user }) {
	return (

		<div className="app-container container">
			<div className="row">

				{/* <!--Details info--> */}
				<div className="col-sm-6 mb-5 mt-4 offset-3" id="myinfo">
					<h1 className="text-center mb-4" id="profile-head">Profile</h1>
					<div>
						<img
							src="https://image.flaticon.com/icons/png/128/100/100435.png"
							alt="Avatar"
							className="rounded mx-auto d-block"
						></img>
					</div>
					<div className="row mt-5">
						<div className="col-sm-3">
							<h6>Name</h6>
						</div>
						<div className="col-sm-7">
							<h4>{user.firstName} {user.lastName}</h4>
						</div>
					</div>

					<hr />
					{/* <!--section2--> */}
					<div className="row">
						<div className="col-sm-3">
							<h6>Username</h6>
						</div>
						<div className="col-sm-7">
							<h4>{user.userName}</h4>
						</div>
					</div>
					<hr></hr>
					{/* <!--section4--> */}
					<div className="row">
						<div className="col-sm-3">
							<h6>Email</h6>
						</div>
						<div className="col-sm-7">
							<p>{user.email}</p>
						</div>
						<hr></hr>
					</div>
				</div>
			</div>
		</div>
	);
}

export default User;
