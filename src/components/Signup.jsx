import React from "react";
import "../style/Signup.css"


function Signup({ modal, hideModal, newUser, handleChangeSignup ,handleSignupSubmission }) {


	if (!modal) {
		return null;
	} else {
		return (
			<div className="modal-container">
					<div className="modal-content">
						<div className="modal-header">
							<h4>SignUp</h4>
							<button type="button" className="close" onClick={e => hideModal()}>
								&times;
							</button>
						</div>
						<div className="modal-body">
							<form onSubmit={handleSignupSubmission}>
								<div className="form-row">​</div>
								<div className="form-group">
									<label htmlFor="firstName">
										<span className="fa fa-user" id="em1"></span>
										First Name
									</label>
									<input type="text" value={newUser.firstName} onChange={handleChangeSignup} className="form-control" name="firstName" placeholder="Enter First Name" />
								</div>
								<div className="form-group">
									<label htmlFor="lastName">
										<span className="fa fa-user" id="em1"></span>
										Last Name
									</label>
									<input type="text" value={newUser.lastName} onChange={handleChangeSignup} className="form-control" name="lastName" placeholder="Enter Last Name" />
								</div>
								<div className="form-group">
									<label htmlFor="InputEmail">
										<span className="fa fa-envelope" id="em1"></span>Email
									</label>

									<input type="email" value={newUser.email} onChange={handleChangeSignup} className="form-control" name="email" aria-describedby="emailHelp" placeholder="Enter email" />
									<small id="emailHelp" className="form-text text-muted">
										We'll never share your email with anyone else.
									</small>
								</div>
								<div className="form-group">
									<label htmlFor="usrname">
										<span className="fa fa-user" id="em1"></span>
										Username
									</label>
									<input type="text" value={newUser.userName} onChange={handleChangeSignup} className="form-control" name="userName" placeholder="Enter username" />
								</div>
								<div className="form-group">
									<label htmlFor="psw">
										<span className="fa fa-key" id="em1"></span>
										Password
									</label>
									<input type="password" value={newUser.password} onChange={handleChangeSignup} className="form-control" name="password" placeholder="Enter password" />
								</div>
								
								<button type="submit" className="btn btn-success btn-block">
									<span className=""></span>Sign Up
								</button>
								
							</form>
						</div>
						<div className="modal-footer">
							<button 
								type="submit" 
								className="btn btn-danger btn-default pull-right"
								onClick={e => hideModal()}
								>
								<span className="glyphicon glyphicon-remove"></span>
								Cancel
							</button>
							
						</div>
					</div>
			</div>
		);
	}
}

export default Signup;
