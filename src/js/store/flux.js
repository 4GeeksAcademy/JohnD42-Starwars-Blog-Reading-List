const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			characters: [

			],
			planets: [

			],
			vehicles: [

			],
			starships: [

			],
			favorites: [

			],
			dictionary: [

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
						console.log(data)
						return data
					}
				} catch (error) {
					console.log(error)
				}
			},
			getData: async () => {
				Object.keys(getStore()).forEach(async (key, index) => {
					if (key !== 'favorites' && key !=='dictionary') {
						const url = key === 'characters' ? 'https://www.swapi.tech/api/people' : `https://www.swapi.tech/api/${key}`
						const apiResults = await getActions().asyncFetch(url)
						apiResults.results.map(async (item, idx) => {
							try {
								const newItem = await getActions().asyncFetch(item.url);
								const currentItems = getStore()[key]
								const tempItems = currentItems.toSpliced(idx, 0, newItem)
								setStore({ [key]: tempItems })
								const currentDict = getStore().dictionary;
								const tempDict = currentDict.toSpliced(currentDict.length, 0, newItem)
								setStore({dictionary: tempDict})
								console.log(getStore().dictionary)
							} catch (error) {
								return { ...item, error };
							}
						})
					}
				})
				
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
