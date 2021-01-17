import React from 'react';

function Card(props) {
    function handleCardClick(){
        props.onCardClick(props.card)
    }

    return (
        <li className="element__group">
            <button className="element__delete"></button>
            <img src={props.card.link} alt={props.card.name} className="element__image" onClick={handleCardClick}/>
            <div className="element__all">
                <h2 className="element__text">{props.card.name}</h2>
                <div className="element__container">
                <button className="element__like"></button>
                <span className="element__like-counter">{props.card.likes.length}</span>
                </div>
            </div>
        </li>
    )
}

export default Card;