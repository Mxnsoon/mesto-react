import React from 'react';
import Card from './Card';
import { api } from '../utils/api';



function Main(props) {
    const [userName, setUserName] = React.useState('')
    const [userDescription, setUserDescription] = React.useState('')
    const [userAvatar, setUserAvatar] = React.useState('')
    const [cards, setCards] = React.useState([])

    React.useEffect(() => {
        api.getInitialCards()
        .then((data) => {
            setCards(data)
        })
        .catch((err) => {
            console.log(err);
        });
        api.getUserData()
        .then((data) => {
            setUserName(data.name);
            setUserDescription(data.about);
            setUserAvatar(data.avatar);
        })
        .catch((err) => {
            console.log(err);
        });
    }, []);

    return (
        <main className="content">
        <section className="profile">
            <div className="profile__block">
              <div className="profile__avatar-container">
                <img style={{ backgroundImage: `url(${userAvatar})`}} className="profile__avatar"/>
                <div className="profile__avatar-edit" onClick={props.onEditAvatar}></div>
              </div>
                <div className="profile__info">
                    <div className="profile__all">
                        <h1 className="profile__name">{userName}</h1>
                        <button className="profile__edit" type='button' onClick={props.onEditProfile}></button>
                    </div>
                    <p className="profile__text">{userDescription}</p>
                </div>
            </div>
            <button className="profile__button-add" type="button" onClick={props.onAddPlace}></button>
        </section>
        <section className="element">
            <ul className="element__list">
                {cards.map(card => {
                    return (
                        <Card
                        card={card}
                        key={card._id}
                        onCardClick={props.onCardClick}
                        />
                    )
                })}
                
            </ul>
        </section>
    </main>
    );
    
}


export default Main;