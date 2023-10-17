import React, { useContext } from "react";
import { Context } from '../store/appContext'
import { Link } from "react-router-dom";

export const Navbar = () => {

    const { store, actions } = useContext(Context);

    const deleteHandler = (idx) => {
        actions.deleteFavorite(idx)
    }

	return (
		<nav className="navbar navbar-light bg-light mb-3">
			<img className="starWarsLogo m-2 ms-5" src='https://www.freepnglogos.com/uploads/star-wars-logo-31.png' />
            <div className="dropdown">
                <button className="btn btn-primary dropdown-toggle m-3 me-5" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    Favorites <span>{store.favorites.length}</span>
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    {store.favorites.length > 0 ? store.favorites.map((favorite, idx) => {
                        return (
                        <li className="d-flex">
                            <Link className="dropdown-item link" to={`/details/${favorite.result.description.slice(2, 8) == 'person' ? 'characters' : favorite.result.description.slice(2, 8) == 'planet' ? 'planets' : favorite.result.description.slice(2, 9) === 'vehicle' ? 'vehicles' : 'starships'}/${favorite.result.uid}`}>{favorite.result.properties.name}</Link>
                            <button className="delete rounded" onClick={() => deleteHandler(idx)}>
                                <i className="fa-solid fa-trash-can"></i>
                            </button>
                        </li>
                        )
                    }) : <li><p className="dropdown-item">Empty!</p></li>}
                </ul>
            </div>
		</nav>
	);
};