import React, { useContext, useEffect, useState } from "react";
import { Context } from '../store/appContext'
import "../../styles/home.css";
import Card from '../component/Card.jsx'
import { useNavigate, Link } from 'react-router-dom';

export const Home = () => {

	const navigate = useNavigate()
	const { store, actions } = useContext(Context);
	console.log(store.planets)

	return (
		<div className="container horizontal-scrollable">
			
			<div className="row category">
				<h1>Characters</h1>
			</div>
			<div className="row flex-row flex-nowrap overflow-auto">
				{store.characters.map((data, idx) => {
					return <Card idx={idx} category='characters'/>
				})}
			</div>
			<div className="row category">
				<h1>Planets</h1>
			</div>
			<div className="row flex-row flex-nowrap overflow-auto">
				{store.planets.map((data, idx) => {
					return <Card idx={idx} category='planets'/>
				})}
			</div>
			<div className="row category">
				<h1>Vehicles</h1>
			</div>
			<div className="row flex-row flex-nowrap overflow-auto">
				{store.vehicles.map((data, idx) => {
					return <Card idx={idx} category='vehicles'/>
				})}
			</div>
		</div>
	)
};
