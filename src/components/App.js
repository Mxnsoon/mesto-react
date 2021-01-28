import '../index';
import Header from '../components/Header';
import Main from '../components/Main';
import Footer from '../components/Footer';
import PopupWithForm from './PopupWithForm';
import React from 'react';
import ImagePopup from '../components/ImagePopup';
import CurrentUserContext from '../contexts/CurrentUserContext';
import { api } from '../utils/api';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState({ name: '', link: '' })

  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => { 
    api.getInitialCards() 
    .then((data) => { 
        setCards(data)
    })
    .catch((err) => {
        console.log(err);
    });
}, []); 

  React.useEffect(() => {
    api.getUserData().then((data) => {
      setCurrentUser(data);
    })
    .catch((err) => {
      console.log(err);
    })
  }, []);

  function handleUpdateUser(user) {
    api.setUserData(user).then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    })    
  }

  function handleUpdateAvatar(avatar) {
    api.setUserAvatar(avatar).then((data) => {
      setCurrentUser(data)
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    })
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      const newCards = cards.map((c) => c._id === card._id ? newCard : c);
      setCards(newCards);
    })
    .catch((err) => {
      console.log(err)
    })
  }

  function handleCardDelete(card) {
    api.removeCard(card).then(() => {
      const newCards = cards.filter((item) => item._id !== card._id);
      setCards(newCards);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  function handleAddPlace(data) {
    api.addCard(data).then((newCard) => {
      setCards([newCard,...cards]);
    })
    .then(() => {
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err)
    })
  }


  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true)
  }

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true)
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true)
  }

  const handleCardClick = (card) => {
    setSelectedCard(card);
  }

  const closeAllPopups = () => {
    setIsAddPlacePopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setSelectedCard({ name: '', link: '' })
  }
  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
    <Header />
    <Main
    onEditProfile={handleEditProfileClick}
    onAddPlace={handleAddPlaceClick}
    onEditAvatar={handleEditAvatarClick}
    onCardClick={handleCardClick}
    onCardLike={handleCardLike}
    onCardDelete={handleCardDelete}
    closeAllPopups={closeAllPopups}
    cards = {cards}
     />
    <Footer />

    <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
    <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlace} />
    <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
    <PopupWithForm
    title="Вы уверены?"
    name="confirmation"
    />
    <ImagePopup card={selectedCard} onClose={closeAllPopups} />
</div>
</CurrentUserContext.Provider>

  );
}

export default App;
