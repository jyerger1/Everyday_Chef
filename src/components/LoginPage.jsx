import React from "react";
import Login from "./Login";
import Signup from "./Signup";

function LoginPage({ showModal, userLogin, handleChangeLogin, handleSubmitLogin, modal, userSignUp, handleChangeSignup, handleSignupSubmission, hideModal }) {
	return (
		<div>
            <Login 
                showModal={showModal} 
                userLogin={userLogin} 
                userName={userLogin.userName}
                password={userLogin.password}
                handleChangeLogin={handleChangeLogin} 
                handleSubmitLogin={handleSubmitLogin} 
                />
            <Signup 
                modal={modal} 
                newUser={userSignUp} 
                handleChangeSignup={handleChangeSignup} 
                handleSignupSubmission={handleSignupSubmission} 
                hideModal={hideModal} 
                />
		</div>
	);
}

export default LoginPage;
