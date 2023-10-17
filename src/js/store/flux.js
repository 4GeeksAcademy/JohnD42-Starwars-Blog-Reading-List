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
				const plnts = await Promise.all(planetResults.results.map(async (item) => {
					try {
						const plnt = await getActions().asyncFetch(item.url);
						return plnt;
					} catch (error) {
						return { ...item, error };
					}
				}))
				console.log(plnts)
				setStore({ planets: plnts })
				console.log(getStore().planets)
			},
			getVehicles: async () => {
				const vehicleResults = await getActions().asyncFetch('https://www.swapi.tech/api/vehicles')
				const vhcls = await Promise.all(vehicleResults.results.map(async (item) => {
					try {
						const vhcl = await getActions().asyncFetch(item.url);
						return vhcl;
					} catch (error) {
						return { ...item, error };
					}
				}))
				setStore({ vehicles: vhcls })
			},
			addFavorite: (category, idx) => {
				const newFavorite = getStore()[category][idx];
				const newFavorites = getStore().favorites.toSpliced((getStore().favorites.length - 1), 0, newFavorite)
				setStore({ favorites: newFavorites })
			},
			deleteFavorite: (idx) => {
				const currentFavorites = getStore().favorites;
				const newFavorites = currentFavorites.toSpliced(idx, 1);
				setStore({ favorites: newFavorites })
			}
		}
	};
};

export default getState;
