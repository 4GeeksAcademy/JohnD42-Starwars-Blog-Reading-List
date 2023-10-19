import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from 'react-router-dom';
import { Context } from '../store/appContext'

export const Details = () => {
	const { store, actions } = useContext(Context);
	const { category, uid } = useParams();
	const itemArr = store[category].filter((item) => item.result.uid === uid)
	let item = itemArr[0]
	const objPropertiesPresentableKeysArr = [];
	const objPropertiesKeysArr = [];
	const [homeWorldName, setHomeWorldName] = useState('')
	
	useEffect(() => {
		const asyncFunc = async () => {
			if(item === undefined) {
				const url = category === 'characters' ? `https://www.swapi.tech/api/people/${uid}` : `https://www.swapi.tech/api/${category}/${uid}`;
				item = await actions.asyncFetch(url);
			}
			if(category == 'characters') {
				const homeWorldUrl = item.result.properties.homeworld
				store.planets.map((planet) => {
					if (planet.result.properties.url == homeWorldUrl) {
						setHomeWorldName(planet.result.properties.name)
					}
				})
			}
			if(item !== undefined) {
				Object.keys(item.result.properties).forEach((key, index) => {
					if(key !== 'created' && key !== 'edited' && key !== 'url') {
						objPropertiesKeysArr.push(key)
						let upper = true
						let presentableKey = key.split('');
						key.split('').map((char, index) => {
							if(index == 0) {
								upper = true;
							}
							if(upper) {
								presentableKey[index] = key[index].toUpperCase()
								upper = false;
							}
							if(char === '_') {
								presentableKey[index] = ' ';
								upper = true;
							}
						})
						const realPresentableKey = presentableKey.join('')
						objPropertiesPresentableKeysArr.push(realPresentableKey)
						console.log(objPropertiesPresentableKeysArr)
					}
				})
			}
		}
		asyncFunc()
	},[])
	

	return (
		<div className="container">
			<div className="row border-bottom border-danger">
				<div className="col-5 mx-auto mb-5">
					<img className='detailsImg' src={`https://raw.githubusercontent.com/tbone849/star-wars-guide/master/build/assets/img/${category}/${uid}.jpg`}/>
				</div>
				<div className="col-5 mx-auto mb-2">
					<div className="row">
						<h1>
							{item !== undefined ? item.result.properties.name : ''}
						</h1>
					</div>
					<div className="row text-center">
						{item !== undefined ? item.result.description : ''}
					</div>
				</div>
			</div>
			<div className="row">
				{objPropertiesPresentableKeysArr.map((key, index) => {
					if(key !== 'Homeworld') {
						return (
							<div className="col-2">
								<p className="moreDetails">
									{`${key}:`}
								</p>
								<p className="moreDetails">
									{item.result.properties[objPropertiesKeysArr[index]]}
								</p>
							</div>
						)
					} else {
						return (
						<div className="col-2">
								<p className="moreDetails">
									{`${key}:`} {homeWorldName}
								</p>
							</div>
							)
					}
					}
				)}
			</div>
		</div>
	)
};


