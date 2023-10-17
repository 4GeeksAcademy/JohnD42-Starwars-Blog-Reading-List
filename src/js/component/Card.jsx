import React, { useContext, useState } from "react";
import { Context } from '../store/appContext'
import { useNavigate } from "react-router";

const Card = (props) => {

    const navigate = useNavigate();
    const { store, actions } = useContext(Context);
    const category = props.category;
    const idx = props.idx;
    const item = store[category][idx];
    const uid = item.result.uid;
    let [clicked, setClicked] = useState(false)

    const clickHandler = () => {
        setClicked(!clicked)
        actions.addFavorite(category, idx)
    }

    return (
        <div className="col-3 m-3">
            <div className="card" style={{width: '18rem'}}>
                <img className="card-img-top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfYSTMfRq8swN37jSCSqwEzjlzhv5IMINzl_JG3rDz&s" alt="Card image cap"/>
                <div className="card-body">
                    <h5 className="card-title">{item.result.properties.name}</h5>
                    {category === 'characters' ? <p className="card-text">Gender: {item.result.properties.gender} <br/> Hair Color: {item.result.properties.hair_color} <br/> Eye-color: {item.result.properties.eye_color} </p> : 
                    category === 'planets' ? <p className="card-text">Population: {item.result.properties.population} <br/> Terrain: {item.result.properties.terrain} </p> :
                    <p className="card-text">Vehicle Model: {item.result.properties.model} <br/> Cost: {item.result.properties.cost_in_credits} credits</p>
                    }
                    <div className="d-flex justify-content-between">
                    <button className="btn btn-outline-primary" onClick={() => navigate(`/details/${category}/${item.result.uid}`)}>Learn more!</button>
                    <button className='btn btn-outline-warning favorite' onClick={clickHandler}>{store.favorites.includes(item) ? <i className="fa-solid fa-heart"></i> : <i className="fa-regular fa-heart"></i>}</button>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Card