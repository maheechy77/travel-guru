import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useStateValue } from "../../StateProvider";

const ProtectedRoute = ({ children, ...rest }) => {
	const [{ isLoggedIn }] = useStateValue();
	return (
		<Route
			{...rest}
			render={({ location }) =>
				isLoggedIn ? (
					children
				) : (
					<Redirect
						to={{
							pathname: "/login",
							state: { from: location },
						}}
					/>
				)
			}
		/>
	);
};

export default ProtectedRoute;
