import React, { useContext, useEffect, useState } from "react";
import "../../styles/home.css";
import { useParams, Link } from 'react-router-dom';
import { Context } from '../store/appContext'

export const Details = () => {
	const { store, actions } = useContext(Context);
	const { category, uid } = useParams();
	console.log(store[category])
	// const item = store.category.filter((item) => item.uid === uid)
	// console.log(item)

	return (
		<div className="container">
			{/* <div className="row d-inline-block">
				<img src='https://www.bakiautomobile.com/wp-content/uploads/2020/06/800x600.png'/>
				<div className="d-block">
					<h1>
						
					</h1>

				</div>
			</div> */}
		</div>
	)
};


