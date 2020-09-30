import React from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import logo from "../../Image/Logo.png";

import "./Nav.css";
import { useStateValue } from "../../StateProvider";
import { auth } from "../../firebaseConfig";

const Nav = () => {
	const [{ user, isLoggedIn }, dispatch] = useStateValue();
	const history = useHistory();
	let location = useLocation();
	let { from } = location.state || { from: { pathname: "/" } };
	const handleAuth = () => {
		if (user) {
			dispatch({
				type: "LoggedIn",
				isLoggedIn: false,
			});
			auth.signOut();
			history.replace(from);
		}
	};
	return (
		<div className="nav">
			<div className="logo">
				<img src={logo} alt={logo} />
			</div>
			<div className="search">
				<SearchIcon style={{ fill: "white" }} />
				<input type="text" placeholder="Search your Desitination" />
			</div>
			<div className="menu">
				<Link to="/">Home</Link>
				<Link to="/">Destination</Link>
				<Link to="/">Blog</Link>
				<Link to="/">Contact</Link>
				{isLoggedIn ? (
					<button
						onClick={handleAuth}
						type="button"
						className="btn btn-warning "
					>
						Sign-Out
					</button>
				) : (
					<Link to="/login">
						<button type="button" className="btn btn-warning ">
							Login
						</button>
					</Link>
				)}
			</div>
		</div>
	);
};

export default Nav;
