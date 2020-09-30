import React from "react";
import "./Place.css";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { Link } from "react-router-dom";

const Place = ({ place, image }) => {
	return (
		<div className="place d-flex justify-content-around">
			<div className="info">
				<h2>{place.name}</h2>
				<p>{place.description}</p>
				<Link to={`/booking/${place.id}`}>
					<button type="button" className="btn btn-warning btn-lg">
						Booking
						<ArrowForwardIcon />
					</button>
				</Link>
			</div>
			<div className="card bg-dark text-white placeCard">
				<Link to={`/booking/${place.id}`}>
					<img className="card-img" src={image} alt={place.image} />
					<div className="card-img-overlay">
						<h5 className="card-title">{place.name}</h5>
					</div>
				</Link>
			</div>
		</div>
	);
};

export default Place;

// src={place && require(place.image)} {place.name}
