import React, { useEffect, useState } from "react";
import moment from "moment";
import { useStateValue } from "../../StateProvider";
import hotel1 from "../../Image/Rectangle 26.png";
import hotel2 from "../../Image/Rectangle 27.png";
import hotel3 from "../../Image/Rectangle 28.png";
import "./Search.css";
import { auth, db } from "../../firebaseConfig";

const Search = () => {
	const [{ basket, user }] = useStateValue();
	const [username, setUsername] = useState("");
	const startingDay = basket[0].from.split("-")[2];
	const endingDay = basket[0].to.split("-")[2];
	const startingMonth = basket[0].from.split("-")[1];
	const endingMonth = basket[0].to.split("-")[1];

	useEffect(() => {
		if (user) {
			let dbUser = auth.currentUser;

			if (!user.displayName) {
				db.collection("users")
					.doc(dbUser?.uid)
					.get()
					.then((doc) => {
						setUsername(doc.data().data.username);
					});
				console.log(username);
			} else {
				setUsername("");
			}
		}
	}, [user]);
	return (
		<div className="search_areas">
			<div className="search_area">
				<div className="search_areaInfo">
					<p className="time">
						{`${startingDay} ${moment(startingMonth).format(
							"MMM"
						)} - ${endingDay} ${moment(endingMonth).format("MMM")}`}{" "}
						3 Guests
					</p>
					<h2>
						{username !== "" ? username : user.displayName} Let's Stay in{" "}
						{basket[basket.length - 1].destination}
					</h2>
				</div>
				<div className="hotels">
					<div className="hotel">
						<img src={hotel1} alt={hotel1} />
						<div className="hotel_info">
							<h3>Stylish Hotel in {basket[basket.length - 1].destination}</h3>
							<div className="accomodations">
								<p> 4 guests </p>
								<p> 2 bedrooms </p>
								<p> 2 beds </p>
								<p> 2 bathrooms </p>
							</div>
							<p>With Wifi,AirCondition And Kitchen</p>
							<p>Cancellation Possible</p>
							<div className="rating_price">
								<h4>rating:4.9</h4>
								<h4>$34/Night</h4>
							</div>
						</div>
					</div>
					<div className="hotel">
						<img src={hotel2} alt={hotel2} />
						<div className="hotel_info">
							<h3>Stylish Hotel in {basket[basket.length - 1].destination}</h3>
							<div className="accomodations">
								<p> 4 guests </p>
								<p> 2 bedrooms </p>
								<p> 2 beds </p>
								<p> 2 bathrooms </p>
							</div>
							<p>With Wifi,AirCondition And Kitchen</p>
							<p>Cancellation Possible</p>
							<div className="rating_price">
								<h4>rating:4.9</h4>
								<h4>$34/Night</h4>
							</div>
						</div>
					</div>
					<div className="hotel">
						<img src={hotel3} alt={hotel3} />
						<div className="hotel_info">
							<h3>Stylish Hotel in {basket[basket.length - 1].destination}</h3>
							<div className="accomodations">
								<p> 4 guests </p>
								<p> 2 bedrooms </p>
								<p> 2 beds </p>
								<p> 2 bathrooms </p>
							</div>
							<p>With Wifi,AirCondition And Kitchen</p>
							<p>Cancellation Possible</p>
							<div className="rating_price">
								<h4>rating:4.9</h4>
								<h4>$34/Night</h4>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Search;
