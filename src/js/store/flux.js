const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			characters: [

			],
			planets: [

			],
			vehicles: [

			],
			favorites: [

			]
		},
		actions: {
			asyncFetch: async (url) => {
				try {
					const resp = await fetch(url)
					if (!resp.ok) {
						throw new Error('Error occurred:', resp.status)
					} else {
						const data = resp.json()
						return data
					}
				} catch (error) {
					console.log(error)
				}
			},
			getCharacters: async () => {
				const characterResults = await getActions().asyncFetch('https://www.swapi.tech/api/people')
				const chars = await Promise.all(characterResults.results.map(async (item) => {
					try {
						const char = await getActions().asyncFetch(item.url);
						return char;
					} catch (error) {
						return { ...item, error };
					}
				}))
				setStore({ characters: chars })
			},
			getPlanets: async () => {
				const planetResults = await getActions().asyncFetch('https://www.swapi.tech/api/planets')
				const plnts = await planetResults.map((planetResult) => {
					return getActions().asyncFetch(planetResult.url)
				})
				setStore({ planets: plnts })
			},
			getVehicles: async () => {
				const vehicleResults = await getActions().asyncFetch('https://www.swapi.tech/api/vehicles')
				const vhcls = await vehicleResults.map((vehicleResult) => {
					return asyncFetch(vehicleResult.url)
				})
				setStore({ vehicles: vhcls })
			},
		}
	};
};

export default getState;
