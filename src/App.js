import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./component/Home/Home";
import Nav from "./component/Nav/Nav";
import Booking from "./component/Booking/Booking";
import ProtectedRoute from "./component/ProtectedRoute/ProtectedRoute";
import Search from "./component/Search/Search";
import Login from "./component/Login/Login";
import { auth } from "./firebaseConfig";
import { useStateValue } from "./StateProvider";
import NoMatch from "./component/404/404";

function App() {
	const [{}, dispatch] = useStateValue();

	useEffect(() => {
		auth.onAuthStateChanged((authUser) => {
			if (authUser) {
				dispatch({
					type: "SET_USER",
					user: authUser,
				});
			} else {
				dispatch({
					type: "SET_USER",
					user: null,
				});
			}
		});
	}, []);

	return (
		<div className="App">
			<Router>
				<Nav />
				<Switch>
					<Route exact path="/">
						<Home />
					</Route>
					<Route exact path="/booking/:placeId">
						<Booking />
					</Route>
					<Route exact path="/login">
						<Login />
					</Route>
					<ProtectedRoute exact path="/search">
						<Search />
					</ProtectedRoute>
					<Route path="*">
						<NoMatch />
					</Route>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
