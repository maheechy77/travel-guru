import React from "react";
import { useStateValue } from "../../StateProvider";
import Place from "../Place/Place";
import Sajek from "../../Image/Sajek.png";
import Sreemongol from "../../Image/Sreemongol.png";
import Sundorbon from "../../Image/sundorbon.png";
import "./Home.css";

const Home = () => {
	const [{ places }] = useStateValue();

	return (
		<div className="home">
			<div className="overlay">
				<div
					id="carouselExampleIndicators"
					className="carousel slide"
					data-ride="carousel"
					data-width="100%"
					data-items="5"
				>
					<div className="carousel-inner ">
						<div className="carousel-item active">
							<Place key={places[0].name} place={places[0]} image={Sajek} />
						</div>
						<div className="carousel-item  ">
							<Place
								key={places[1].name}
								place={places[1]}
								image={Sreemongol}
							/>
						</div>
						<div className="carousel-item ">
							<Place key={places[2].name} place={places[2]} image={Sundorbon} />
						</div>
					</div>
					<a
						className="carousel-control-prev"
						href="#carouselExampleIndicators"
						role="button"
						data-slide="prev"
					>
						<span
							className="carousel-control-prev-icon"
							aria-hidden="true"
						></span>
						<span className="sr-only">Previous</span>
					</a>
					<a
						className="carousel-control-next"
						href="#carouselExampleIndicators"
						role="button"
						data-slide="next"
					>
						<span
							className="carousel-control-next-icon"
							aria-hidden="true"
						></span>
						<span className="sr-only">Next</span>
					</a>
				</div>
			</div>
		</div>
	);
};

export default Home;
