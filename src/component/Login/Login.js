import React, { useState } from "react";
import { useStateValue } from "../../StateProvider";
import "./Login.css";
import { useHistory, useLocation } from "react-router-dom";
import { auth, db, createFbAuth, createGoogleAuth } from "../../firebaseConfig";

const Login = () => {
	const [, dispatch] = useStateValue();
	let history = useHistory();
	let location = useLocation();
	const [error, setError] = useState("");
	const [email, setEmail] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [showError, setShowError] = useState(false);
	const [showLoginForm, setShowLoginForm] = useState(true);

	const reg = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,3})$/;
	let { from } = location.state || { from: { pathname: "/" } };
	const setYourEmail = (e) => {
		e.preventDefault();
		setEmail(e.target.value);
	};

	const setYourPassword = (e) => {
		e.preventDefault();
		setPassword(e.target.value);
	};

	const setYourFirstName = (e) => {
		e.preventDefault();
		setFirstName(e.target.value);
	};

	const setYourLastName = (e) => {
		e.preventDefault();
		setLastName(e.target.value);
	};

	const setYourConfirmPassword = (e) => {
		e.preventDefault();
		setConfirmPassword(e.target.value);
	};

	const showLogin = () => {
		setShowLoginForm(!showLoginForm);
	};

	const checkValidation = () => {
		if (!showLoginForm && firstName.length <= 5) {
			setError("Please Provide A First Name of more than 5 characters");
			setShowError(true);
			setTimeout(function () {
				setShowError(false);
			}, 3000);
		} else if (!showLoginForm && lastName.length <= 2) {
			setError("Please Provide A Last Name of more than 2 characters");
			setShowError(true);
			setTimeout(function () {
				setShowError(false);
			}, 3000);
		} else if (reg.test(email) === false) {
			setError("Email not Valid");
			setShowError(true);
			setTimeout(function () {
				setShowError(false);
			}, 3000);
		} else if (password.length < 6) {
			setError("Please Provide A password of more than 5 characters");
			setShowError(true);
			setTimeout(function () {
				setShowError(false);
			}, 3000);
		} else if (!showLoginForm && password !== confirmPassword) {
			setError("Password and Confirm Password doen't Match");
			setShowError(true);
			setTimeout(function () {
				setShowError(false);
			}, 3000);
		}
	};

	const submitLogin = (e) => {
		e.preventDefault();
		checkValidation();
		if (email.match(reg) && password.length > 5) {
			auth
				.signInWithEmailAndPassword(email, password)
				.then(() => {
					dispatch({
						type: "LoggedIn",
						isLoggedIn: true,
					});
					dispatch({
						type: "SET_USER",
						user: {
							email: email,
							username: firstName + lastName,
							password,
						},
					});
					history.replace(from);
				})
				.catch((error) => alert(error.message));
		}
	};

	const submitSignup = (e) => {
		e.preventDefault();
		checkValidation();
		if (
			firstName.length > 5 &&
			lastName.length > 2 &&
			email.match(reg) &&
			password.length > 5 &&
			password === confirmPassword
		) {
			auth
				.createUserWithEmailAndPassword(email, password)
				.then((cred) => {
					if (cred) {
						const data = {
							email,
							firstName,
							lastName,
							username: firstName + lastName,
							id: cred.user.uid,
						};
						db.collection("users").doc(cred.user?.uid).set({
							data,
						});
					}
				})
				.then(() => {
					console.log("User is signed in.");
					dispatch({
						type: "LoggedIn",
						isLoggedIn: true,
					});
					dispatch({
						type: "SET_USER",
						user: {
							email: email,
							username: firstName + lastName,
							password,
						},
					});
					history.replace(from);
				})
				.catch((error) => alert(error.message));
		}
	};

	const fbSingup = () => {
		auth
			.signInWithPopup(createFbAuth)
			.then(function (result) {
				dispatch({
					type: "LoggedIn",
					isLoggedIn: true,
				});
				dispatch({
					type: "SET_USER",
					user: result.user,
				});
				history.replace(from);
			})
			.catch((error) => alert(error.message));
	};

	const googleSingup = () => {
		auth
			.signInWithPopup(createGoogleAuth)
			.then(function (result) {
				dispatch({
					type: "LoggedIn",
					isLoggedIn: true,
				});
				dispatch({
					type: "SET_USER",
					user: result.user,
				});
				history.replace(from);
			})
			.catch((error) => alert(error.message));
	};
	return (
		<div className="login">
			<div className="loginSignup">
				<div className="form">
					<div className="Login_signup">
						<div className="card bg-light mb-3">
							{showLoginForm ? (
								<div className="card-body">
									<h5 className="card-title">Login</h5>
									<form>
										<div className="form-group">
											<label htmlFor="email">Email</label>
											<input
												type="text"
												className="form-control"
												id="email"
												name="email"
												value={email}
												onChange={setYourEmail}
											/>
										</div>
										<div className="form-group">
											<label htmlFor="password">Password</label>
											<input
												type="password"
												className="form-control"
												id="password"
												value={password}
												onChange={setYourPassword}
											/>
										</div>
										<div className="form-group">
											<input
												type="button"
												className="form-control btn btn-warning"
												id="signinbutton"
												value="Login"
												onClick={submitLogin}
											/>
										</div>
									</form>
									<div className="form-group">
										<input
											type="button"
											className="form-control btn btn-light btn-outline-dark"
											id="fbsignin"
											onClick={fbSingup}
											value="Continue with Facebook"
										/>
									</div>
									<div className="form-group">
										<input
											type="button"
											className="form-control btn btn-light btn-outline-dark"
											id="googlesignin"
											onClick={googleSingup}
											value="Continue with Google"
										/>
									</div>
									<p>
										Don't have an Account?{" "}
										<span onClick={showLogin} className="showLoginSignupForm">
											Create An Account
										</span>
									</p>
									{showError && (
										<div className="p-3 mb-2 bg-danger text-white ">
											{error}
										</div>
									)}
								</div>
							) : (
								<div className="card-body">
									<h5 className="card-title">Sign Up</h5>
									<form>
										<div className="form-group">
											<label htmlFor="first_name">First Name</label>
											<input
												type="text"
												className="form-control"
												id="first_name"
												name="first_name"
												value={firstName}
												onChange={setYourFirstName}
											/>
										</div>
										<div className="form-group">
											<label htmlFor="last_name">Last Name</label>
											<input
												type="text"
												className="form-control"
												id="last_name"
												name="last_name"
												value={lastName}
												onChange={setYourLastName}
											/>
										</div>
										<div className="form-group">
											<label htmlFor="email">Email</label>
											<input
												type="text"
												className="form-control"
												id="email"
												name="email"
												value={email}
												onChange={setYourEmail}
											/>
										</div>
										<div className="form-group">
											<label htmlFor="password">Password</label>
											<input
												type="password"
												className="form-control"
												id="password"
												value={password}
												onChange={setYourPassword}
											/>
										</div>
										<div className="form-group">
											<label htmlFor="confirm_password">Confirm Password</label>
											<input
												type="password"
												className="form-control"
												id="confirm_password"
												value={confirmPassword}
												onChange={setYourConfirmPassword}
											/>
										</div>

										<div className="form-group">
											<input
												type="button"
												className="form-control btn btn-warning"
												id="signupsubmit"
												onClick={submitSignup}
												value="Create An Account"
											/>
										</div>
									</form>
									<div className="form-group">
										<input
											type="button"
											className="form-control btn btn-light btn-outline-dark"
											id="fbsignin"
											value="Continue with Facebook"
											onClick={fbSingup}
										/>
									</div>
									<div className="form-group">
										<input
											type="button"
											className="form-control btn btn-light btn-outline-dark"
											id="googlesignin"
											value="Continue with Google"
											onClick={googleSingup}
										/>
									</div>
									<p>
										Already have an Account?{" "}
										<span onClick={showLogin} className="showLoginSignupForm">
											Login
										</span>
									</p>
									{showError && (
										<div className="p-3 mb-2 bg-danger text-white ">
											{error}
										</div>
									)}
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
