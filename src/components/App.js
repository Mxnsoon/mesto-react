import '../index';
import Header from '../components/Header';
import Main from '../components/Main';
import Footer from '../components/Footer';
import PopupWithForm from './PopupWithForm';
import React from 'react';
import ImagePopup from '../components/ImagePopup';

function App(props) {

  const [isEditProfilePopupOpen, setIsEditprofilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState(false)

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true)
  }

  const handleEditProfileClick = () => {
    setIsEditprofilePopupOpen(true)
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true)
  }

  const handleCardClick = (card) => {
    setSelectedCard(card);
  }

  const closeAllPopups = () => {
    setIsAddPlacePopupOpen(false)
    setIsEditprofilePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setSelectedCard(false)
  }
  return (
    <div className="page">
    <Header />
    <Main
    onEditProfile={handleEditProfileClick}
    onAddPlace={handleAddPlaceClick}
    onEditAvatar={handleEditAvatarClick}
    onCardClick={handleCardClick}
     />
    <Footer />

    <PopupWithForm 
    title="Редактировать профиль"
    name="profile"
    button="Сохранить"
    isOpen={isEditProfilePopupOpen}
    onClose={closeAllPopups}>
      <div>
      <input type="text" id="popup__field_name" className="popup__field popup__field_name" minlength="2" maxlength="40" required/>
      <span span class='popup__field_error popup__field_name_error'></span>
      <input type="text" id="popup__field_text" className="popup__field popup__field_text" minlength="2" maxlength="200" required/>
      <span span class='popup__field_error popup__field_text_error'></span>
      </div>
    </PopupWithForm>
    <PopupWithForm
    title="Новое место"
    name="mesto"
    button="Создать"
    isOpen={isAddPlacePopupOpen}
    onClose={closeAllPopups}>
      <div>
      <input type="text" id="popup__field_mesto-name" className="popup__field popup__field_mesto-name" placeholder="Название" minlength="1" maxlength="30" required/>
      <span span class='popup__field_error popup__field_mesto-name_error'></span>
      <input type="url" id="popup__field_mesto-text" className="popup__field popup__field_mesto-text" placeholder="Ссылка на картинку" required/>
      <span span class='popup__field_error popup__field_mesto-text_error'></span>
      </div>
    </PopupWithForm>
    <PopupWithForm
    title="Обновить аватар"
    name="avatar"
    button="Сохранить"
    isOpen={isEditAvatarPopupOpen}
    onClose={closeAllPopups}>
      <div>
      <input type="url" id="popup__field_avatar" className="popup__field popup__field_avatar" placeholder="Ссылка на картинку" required/>
     <span span className="popup__field_error popup__field_avatar_error"></span>
      </div>
    </PopupWithForm>
    <PopupWithForm
    title="Вы уверены?"
    name="confirmation"
    />
    <ImagePopup
    card={selectedCard}
    onClose={closeAllPopups}
    />
</div>

  );
}

export default App;
