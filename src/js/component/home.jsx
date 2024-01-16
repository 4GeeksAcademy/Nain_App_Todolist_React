import React from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";
import App from "./lista";
import TitleList from "./titleList";
//create your first component
const Home = () => {
	return (
		<div className="text-center">

			<div >

				<TitleList />

				<App/>
			</div>
		</div>
	);
};

export default Home;
