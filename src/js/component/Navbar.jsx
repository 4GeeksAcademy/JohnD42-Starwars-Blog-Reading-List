import React, { useContext } from "react";
import { Context } from '../store/appContext'
import { Link } from "react-router-dom";

export const Navbar = () => {

    const { store, actions } = useContext(Context);

	return (
		<nav className="navbar navbar-light bg-light mb-3">
			<img className="starWarsLogo m-2 ms-5" src='https://www.freepnglogos.com/uploads/star-wars-logo-31.png' />
            <div className="dropdown">
                <button className="btn btn-primary dropdown-toggle m-3 me-5" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    Favorites <span>{store.favorites.length}</span>
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    {store.favorites.length > 0 ? store.favorites.map((favorite) => {
                        <li><Link className="dropdown-item" to={`/details/${favorite.description.slice(1, 0, 8) === 'person' ? 'people' :
                        favorite.description.toSpliced(1, 0, 7) === 'planet' ? 'planets' : 'vehicles'}/${favorite.uid}`}></Link></li>
                    }) : <li><p className="dropdown-item">Empty!</p></li>}
                </ul>
            </div>
		</nav>
	);
};