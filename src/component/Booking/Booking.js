import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useStateValue } from "../../StateProvider";
import "./Booking.css";

const Booking = () => {
	const [{ places }, dispatch] = useStateValue();
	const { placeId } = useParams();
	const [place, setPlace] = useState({});
	const [origin, setOrgin] = useState("");
	const [from, setFrom] = useState("");
	const [to, setTo] = useState("");
	const [error, setError] = useState("");
	const [showError, setShowError] = useState(false);
	let history = useHistory();

	useEffect(() => {
		const bookPlace = places.find((place) => place.id === placeId);
		setPlace(bookPlace);
	}, [places, placeId]);

	const setYourOrigin = (e) => {
		e.preventDefault();
		setOrgin(e.target.value);
	};

	const setStartDate = (e) => {
		e.preventDefault();
		setFrom(e.target.value);
	};

	const setEndDate = (e) => {
		e.preventDefault();
		setTo(e.target.value);
	};

	const checkValidation = () => {
		if (origin.length <= 0) {
			setError("Please Provide An Origin");
			setShowError(true);
			setTimeout(function () {
				setShowError(false);
			}, 3000);
		} else if (from.length <= 0) {
			setError("Please Provide A Starting Date");
			setShowError(true);
			setTimeout(function () {
				setShowError(false);
			}, 3000);
		} else if (to.length <= 0) {
			setError("Please Provide An Ending Date");
			setShowError(true);
			setTimeout(function () {
				setShowError(false);
			}, 3000);
		} else if (Date.parse(to) <= Date.parse(from)) {
			setError("Ending Date should be After Starting Date");
			setShowError(true);
			setTimeout(function () {
				setShowError(false);
			}, 3000);
		}
	};

	const submitBooking = (e) => {
		e.preventDefault();
		checkValidation();
		if (
			origin.length > 0 &&
			from.length > 0 &&
			to.length > 0 &&
			Date.parse(to) >= Date.parse(from)
		) {
			dispatch({
				type: "ADD_TO_BASKET",
				item: {
					origin,
					destination: place.name,
					from,
					to,
				},
			});

			history.push("/search");
		}
	};
	return (
		<div className="booking">
			<div className="bookPlace">
				<div className="placeInfo">
					<h2>{place && place.name}</h2>
					<p>{place && place.description}</p>
				</div>
				<div className="bookingCard">
					<div className="card bg-light mb-3">
						<div className="card-body">
							<h5 className="card-title">Booking</h5>
							<form onSubmit={submitBooking}>
								<div className="form-group">
									<label htmlFor="origin">Origin</label>
									<input
										type="text"
										className="form-control"
										id="origin"
										name="origin"
										value={origin}
										onChange={setYourOrigin}
									/>
								</div>
								<div className="form-group">
									<label htmlFor="destination">Destination</label>
									<input
										type="text"
										className="form-control"
										id="destination"
										value={place.name}
									/>
								</div>
								<div className="form-group">
									<label htmlFor="from">From</label>
									<input
										type="date"
										className="form-control"
										name="from"
										id="from"
										value={from}
										onChange={setStartDate}
									/>
									<label htmlFor="to">To</label>
									<input
										type="date"
										className="form-control"
										name="to"
										id="to"
										value={to}
										onChange={setEndDate}
									/>
								</div>
								<div className="form-group">
									<input
										type="submit"
										className="form-control btn btn-warning"
										id="submit"
										value="Start Booking"
									/>
								</div>
							</form>
							{showError && (
								<div className="p-3 mb-2 bg-danger text-white ">{error}</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Booking;
